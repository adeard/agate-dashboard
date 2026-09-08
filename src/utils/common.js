import { toast } from 'react-toastify';
import { categorizedKeysAvgGrading } from './optionsKey';

export const joinClassnames = (classes) => {
  return classes.filter(Boolean).join(' ');
};

export const showNotification = (type, message) => {
  return toast[type](message.title);
};

export const getObjectSearch = (search) => {
  const params = [];

  for (let entry of search.entries()) {
    params.push(entry);
  }

  return params.reduce((curr, [key, value]) => {
    if (curr.hasOwnProperty(key)) {
      if (Array.isArray(curr[key])) {
        curr[key].push(value);
      } else {
        curr[key] = [curr[key], value];
      }
    } else {
      curr[key] = value;
    }

    return curr;
  }, {});
};

export const removeEmptyObjectValue = (object) => {
  Object.keys(object).forEach((k) => {
    if (k !== 'page' && (!object[k] || object[k] === undefined)) {
      delete object[k];
    }
  });

  return;
};

export const renderTableRowNumber = (obj, idx) =>
  ((obj?.page || 0) * (obj?.limit || 0) + idx + 1).toLocaleString();

export const paginationConfig = (
  objSearch,
  total,
  refetch,
  setQueryParams,
) => ({
  total: total,
  onChange: (curr, limit) => {
    const payload = { ...objSearch, page: curr - 1, limit };
    setQueryParams(payload);
    refetch(payload);
  },
});

export const getValueKey = (obj, key) => {
  return key.split('.').reduce((o, k) => (o || {})[k], obj);
};

export const changeToBase64Format = (data) => {
  return `data:image/jpg;base64,${data}`;
};

export const fixingCapitalizeWord = (string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const convertLabel = (data) => {
  const label = data
    ?.toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  switch (label?.toLowerCase()) {
    case 'buah kecil dibawah 3kg':
      return 'Buah <3kg';
    case 'buah kecil dibawah 5kg':
      return 'Buah 3-5kg';
    default:
      return label;
  }
};

export const convertLabelUnderscore = (data, removeSuffix = false) => {
  let processedData = data?.replace(/_/g, ' ').toLowerCase();

  if (removeSuffix && processedData) {
    processedData = processedData
      .replace(/diterima/g, '')
      .replace(/ditolak/g, '')
      .replace(/didenda/g, '')
      .trim();
  }

  const label = processedData
    ?.split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  switch (label?.toLowerCase()) {
    case 'buah kecil 5 diterima':
      return 'Buah Kecil 5 kg diterima';
    case 'buah kecil 2':
    case 'buah kecil dibawah 2kg':
      return 'Buah <2kg';
    case 'buah kecil 3':
    case 'buah kecil dibawah 3kg':
      return 'Buah <3kg';
    case 'buah kecil 5':
    case 'buah kecil dibawah 5kg':
      return 'Buah 3-5kg';
    default:
      return label;
  }
};

export function formatNumberWithK(number) {
  if (number >= 1000) {
    return `${(number / 1000).toLocaleString()}k`;
  }
  return number;
}

export const countPercentage = (number = 0, divider = 1) => {
  return divider > 0 && number ? (Number(number) / Number(divider)) * 100 : 0;
};

export const getFilteredValues = (values) => {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([key, val]) =>
        !key.toLowerCase().includes('checkbox') && val !== null && val !== '',
    ),
  );
};

export const formattedDataDashboard = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    label: key,
    percent: parseFloat(value),
  }));
};

export const reorderDataAvgGrading = (data = {}) => {
  if (!data || typeof data !== 'object') return {};

  let targetData = data;

  if (data.diterima || data.ditolak) {
    const flatData = {};
    const process = (obj, suffix) => {
      if (!obj) return;
      Object.entries(obj).forEach(([key, val]) => {
        let formattedKey = key.toLowerCase().replace(/ /g, '_');
        if (formattedKey === 'buah_kecil_dibawah_2kg') formattedKey = 'buah_kecil_2';
        if (formattedKey === 'buah_kecil_dibawah_3kg') formattedKey = 'buah_kecil_3';
        if (formattedKey === 'buah_kecil_dibawah_5kg') formattedKey = 'buah_kecil_5';
        
        flatData[`${formattedKey}_${suffix}`] = val;
      });
    };
    
    if (data.diterima) {
      process(data.diterima.main, 'diterima');
      process(data.diterima.sub, 'diterima');
    }
    if (data.ditolak) {
      process(data.ditolak.main, 'ditolak');
      process(data.ditolak.sub, 'ditolak');
    }
    targetData = flatData;
  }

  const keysToUse = [
    ...categorizedKeysAvgGrading.diterima.main,
    ...categorizedKeysAvgGrading.diterima.sub,
    ...categorizedKeysAvgGrading.ditolak.main,
    ...categorizedKeysAvgGrading.ditolak.sub,
  ];

  return keysToUse.reduce((acc, key) => {
    if (key in targetData) {
      acc[key] = targetData[key];
    }
    return acc;
  }, {});
};

export const getCategorizedGradingData = (data = {}) => {
  if (!data || typeof data !== 'object')
    return { diterima: { main: [], sub: [] }, ditolak: { main: [], sub: [] } };

  if (data.diterima || data.ditolak) {
    const buildItems = (obj, suffix) => {
      if (!obj) return [];
      return Object.entries(obj).map(([label, percent]) => {
        let formattedKey = label.toLowerCase().replace(/ /g, '_');
        if (formattedKey === 'buah_kecil_dibawah_2kg') formattedKey = 'buah_kecil_2';
        if (formattedKey === 'buah_kecil_dibawah_3kg') formattedKey = 'buah_kecil_3';
        if (formattedKey === 'buah_kecil_dibawah_5kg') formattedKey = 'buah_kecil_5';
        
        return {
          label,
          key: `${formattedKey}_${suffix}`,
          percent: parseFloat(percent) || 0,
        };
      });
    };

    return {
      diterima: {
        main: buildItems(data.diterima?.main, 'diterima'),
        sub: buildItems(data.diterima?.sub, 'diterima'),
      },
      ditolak: {
        main: buildItems(data.ditolak?.main, 'ditolak'),
        sub: buildItems(data.ditolak?.sub, 'ditolak'),
      },
    };
  }

  const buildItems = (keys) =>
    keys
      .filter((key) => key in data)
      .map((key) => ({
        label: key,
        key: key,
        percent: parseFloat(data[key]),
      }));

  return {
    diterima: {
      main: buildItems(categorizedKeysAvgGrading.diterima.main),
      sub: buildItems(categorizedKeysAvgGrading.diterima.sub),
    },
    ditolak: {
      main: buildItems(categorizedKeysAvgGrading.ditolak.main),
      sub: buildItems(categorizedKeysAvgGrading.ditolak.sub),
    },
  };
};

export const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const formatPercentWithLeadingZeros = (value) => {
  const num = Number(value ?? 0);
  const formatted = num.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [intPart, decimalPart] = formatted.split('.');
  const paddedInt = intPart.padStart(2, '0');
  return `${paddedInt}.${decimalPart}`;
};

export const mappingOptions = (listData, customKeys = []) => {
  return (
    listData?.map((item) => {
      let obj = {
        label: item.name,
        value: item._id,
      };

      if (customKeys.length) {
        customKeys.forEach((key) => {
          obj[key] = item[key];
        });
      }

      return obj;
    }) ?? []
  );
};

export const formatDuration = (minutes) => {
  const totalMinutes = Math.round(Number(minutes) || 0);
  if (!totalMinutes || totalMinutes <= 0) return '0 mins';

  if (totalMinutes > 120) {
    const hours = Math.floor(totalMinutes / 60);
    const remainingMins = totalMinutes % 60;
    return remainingMins > 0
      ? `${hours} hour ${remainingMins} mins`
      : `${hours} hour`;
  }

  return `${totalMinutes} mins`;
};

export const getDurationInMinutes = (start, end) => {
  if (!start || !end) return 0;

  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  const diffMs = endTime - startTime;

  if (diffMs <= 0) return 0;

  return diffMs / (1000 * 60);
};

export const formatCurrency = (value = 0) => {
  if (value === undefined || value === null) return '';

  const rawValue = String(value).replace(/[^\d.-]/g, '');
  const num = parseFloat(rawValue);

  if (isNaN(num)) return '';

  const rounded = parseFloat(num.toFixed(2));

  return rounded.toLocaleString();
};
