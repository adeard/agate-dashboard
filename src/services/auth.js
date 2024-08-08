import instance from '@/utils/axios';
import { removeToken } from '@/utils/storages';

export const getDecodeToken = async () =>
  await instance.get('/auth/decode-token')

export const logoutUser = () => {
  removeToken();
  window.location.replace('/app/auth/login');
};
