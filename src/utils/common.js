import dayjs from 'dayjs';
import { toast } from 'react-toastify';

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
  setQueryParams
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

export const convertLabelUnderscore = (data) => {
  const label = data
    ?.replace(/_/g, ' ') // ganti underscore dengan spasi
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  switch (label.toLowerCase()) {
    case 'Buah Kecil 3'.toLowerCase():
      return 'Buah <3kg';
    case 'Buah Kecil 5'.toLowerCase():
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
        !key.toLowerCase().includes('checkbox') && val !== null && val !== ''
    )
  );
};

export const formattedDataDashboard = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    label: key,
    percent: parseFloat(value),
  }));
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