import instance from '@/utils/axios';
import { removeToken } from '@/utils/storages';

export const postLogin = async (payload) =>
  await instance.post('/v1/auth/signin', payload);

export const getDecodeToken = async () =>
  await instance.get('/v1/auth/decode-token');

export const logoutUser = () => {
  removeToken();
  window.location.replace('/login');
};
