import type { TUser } from '~/types/user';
import client from './client';

export default {
  getMe: () => client.get<TUser>('/users/me'),
};
