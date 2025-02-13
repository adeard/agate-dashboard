import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import instance from '@/utils/axios';
import { getObjectSearch, showNotification } from '@/utils/common';

export const useGet = (url, query, shouldFetch = true, pagination = true) => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  const [search, setSearch] = useSearchParams();

  const objectSearch = getObjectSearch(search);

  useEffect(() => {
    if (shouldFetch) {
      const payload = { ...objectSearch, ...query };

      if (!pagination) {
        _fetchData(payload);
        return;
      }

      setSearch({ ...payload });
      _fetchData({ ...payload });
    }
  }, [shouldFetch, pagination]);

  const _fetchData = async (params) => {
    try {
      setLoading(true);
      const response = await instance.get(url, { params });

      setData(response.data);
      setTotal(response.meta.total_data || 0);
      setMeta(response?.meta || null);
      return Promise.resolve(response.data);
    } catch (err) {
      setMeta(null);
      setData(null);
      setError(err.message);
      showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    total,
    objectSearch,
    meta,
    refetch: (params = {}) => _fetchData({ ...params, ...objectSearch }),
    setQueryParams: (object) => setSearch(object),
  };
};

export const usePost = (url, actionAfterServices) => {
  const [responseData, setResponseData] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);

  const _handlePost = async (payload, customUrl, query) => {
    setLoadingPost(true);

    try {
      const res = await instance.post(
        customUrl ?? url,
        payload,
        query && { params: query }
      );
      setResponseData(res?.data);
      showNotification('success', res.message);
      actionAfterServices && actionAfterServices(res?.data);
    } catch (err) {
      setLoadingPost(false);
      console.error(err.message);
      showNotification('error', err.message);
    } finally {
      setLoadingPost(false);
    }
  };

  return {
    handlePost: (payload, customUrl, query) =>
      _handlePost(payload, customUrl, query),
    loadingPost,
    responseData,
  };
};

export const usePut = (url, actionAfterServices) => {
  const [responseData, setResponseData] = useState(null);
  const [loadingPut, setLoadingPut] = useState(false);

  const _handlePut = async (payload, customUrl, query) => {
    setLoadingPut(true);

    try {
      const res = await instance.put(
        customUrl ?? url,
        payload,
        query && { params: query }
      );
      setResponseData(res?.data);
      showNotification('success', res.message);
      actionAfterServices && actionAfterServices(res?.data);
    } catch (err) {
      setLoadingPut(false);
      console.error(err.message);
      showNotification('error', err.message);
    } finally {
      setLoadingPut(false);
    }
  };

  return {
    handlePut: (payload, customUrl, query) =>
      _handlePut(payload, customUrl, query),
    loadingPut,
    responseData,
  };
};

export const useDelete = (url, actionAfterServices) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const _handleDelete = async (customUrl, query) => {
    setLoadingDelete(true);

    try {
      const res = await instance.delete(
        customUrl ?? url,
        query && { params: query }
      );
      showNotification('success', res.message);
      actionAfterServices && actionAfterServices(res?.data);
    } catch (err) {
      setLoadingDelete(false);
      console.error(err.message);
      showNotification('error', err.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  return {
    handleDelete: (customUrl, query) => _handleDelete(customUrl, query),
    loadingDelete,
  };
};

export const useGetWithPost = (
  url,
  query,
  shouldFetch = true,
  pagination = true,
  saveQuery = true,
  refetch = false
) => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useSearchParams();

  const objectSearch = getObjectSearch(search);

  useEffect(() => {
    if (shouldFetch) {
      const payload = { ...objectSearch, ...query };

      if (!pagination) {
        _fetchData({}, payload);
        saveQuery && setSearch(payload, { replace: true });
        return;
      }

      saveQuery && setSearch({ ...payload }, { replace: true });
      if (refetch) {
        _fetchData({}, { ...payload });
      } else {
        _fetchData({}, { ...payload });
      }
    }
  }, [shouldFetch, pagination, saveQuery, refetch]);

  const _fetchData = async (payload, query, customUrl) => {
    try {
      setLoading(true);
      const response = await instance.post(
        customUrl ?? url,
        payload,
        query && { params: query }
      );

      setData(response.data);
      setTotal(response.meta.total_data || 0);
    } catch (err) {
      setData(null);
      console.error(err.message);
      setError(err.message);
      showNotification('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    total,
    objectSearch,
    refetch: (payload, query, customUrl) =>
      _fetchData(payload, query || objectSearch, customUrl),
    setQueryParams: (object) =>
      saveQuery && setSearch(object, { replace: true }),
  };
};
