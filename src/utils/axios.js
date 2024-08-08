import axios from 'axios';

import { getToken, removeToken } from '@/utils/storages';

const mode = process.env.NODE_ENV;

function generateHost(withSuffix = false) {
  if (window) {
    return (
      (window.location.host.includes('ngrok') ? 'https://' : 'http://') +
      window.location.host +
      (withSuffix ? '/api/v1' : '')
    );
  } else {
    return window.location.host;
  }
}

export let BASE_URL =
  mode === 'development'
    ? import.meta.env.VITE_REACT_APP_API_URL
    : generateHost(true);
// export let BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

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
  message: {
    title: 'Error Fetching',
    m: 'Failed to fetch data. Please contact developer.',
  },
};

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (axios.isCancel(err)) {
      return Promise.reject('request canceled');
    }

    if (err.response.status === 401) {
      console.log({ err });
      localStorage.clear();
      window.location.replace('/app/auth/login');
    }
    if (err.response && err.response.data) {
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject(defaultError);
    }
  },
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
      if (err.response.status === 401) {
        storages.removeToken();
        window.location.reload();
      }
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject(defaultError);
    }
  },
);

export default instance;
