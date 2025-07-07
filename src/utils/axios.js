import axios from 'axios';
import { getToken, removeToken } from '@/utils/storages';

export let BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

instance.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const defaultError = {
  code: 500,
  status: 'error',
  message: 'Failed to fetch data. Please contact developer.',
};

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (axios.isCancel(err)) {
      return Promise.reject('request canceled');
    }

    if (err.response && err.response.data) {
      if (err.response.status === 401 || err.response.status === 403) {
        removeToken();
        window.location.reload();
      }
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject(defaultError);
    }
  }
);

export const formDataInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
});

formDataInstance.CancelToken = axios.CancelToken;
formDataInstance.isCancel = axios.isCancel;

formDataInstance.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

formDataInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (axios.isCancel(err)) {
      return Promise.reject('request canceled');
    }

    if (err.response && err.response.data) {
      if (err.response.status === 401 || err.response.status === 403) {
        removeToken();
        window.location.reload();
      }
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject(defaultError);
    }
  }
);

export default instance;
