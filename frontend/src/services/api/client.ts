import axios from 'axios';
import cookies from 'js-cookie';
import { API_URL } from '~/constants/environment';
import { tokenKey } from '~/constants/cookies';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  const token = cookies.get(tokenKey);

  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }

  return config;
});

export default instance;
