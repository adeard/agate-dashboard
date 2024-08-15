import { toast } from 'react-toastify';

export const joinClassnames = (classes) => {
  return classes.filter(Boolean).join(' ');
};

export const showNotification = (type, message) => {
  return toast[type]({
    message: message,
    // description: message,
  });
};

export const getObjectSearch = (search) => {
  const params = [];
  for (let entry of search.entries()) {
    params.push(entry);
  }

  return params.reduce((curr, acc) => ({ ...curr, [acc[0]]: acc[1] }), {});
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

export function formatNumberWithK(number) {
  if (number >= 1000) {
    return `${(number / 1000).toLocaleString()}k`;
  }
  return number;
}

export const countPercentage = (number = 0, divider = 1) => {
  return divider > 0 && number ? (Number(number) / Number(divider)) * 100 : 0;
};
