import { AxiosError } from 'axios';

const handleApiError = (e: Error) => {
  if (e instanceof AxiosError) {
    if (e.response?.data.message) {
      return e.response.data.message;
    }

    return e.response?.statusText || e.message;
  }

  return e.message;
};

export default handleApiError;
