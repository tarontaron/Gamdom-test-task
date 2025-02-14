import type { TAuthResponse, TLoginPayload, TRegisterPayload } from '~/types/auth';
import client from './client';

export default {
  login: (payload: TLoginPayload) => client.post<TAuthResponse>('/auth/login', payload),
  register: (payload: TRegisterPayload) => client.post<TAuthResponse>('/auth/register', payload),
};
