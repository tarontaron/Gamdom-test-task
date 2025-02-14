import { useMutation } from '@tanstack/react-query';
import type { TLoginPayload } from '~/types/auth';
import api from '~/services/api';
import { useAuthStore } from '~/store/useAuthStore';

export const useLoginMutation = () => {
  const mutationKey = ['login'];

  return useMutation({
    mutationKey,
    mutationFn: async (payload: TLoginPayload) => {
      const { data } = await api.auth.login(payload);

      return data;
    },
    onSuccess: (response) => {
      useAuthStore.getState().login(response.accessToken);
    },
  });
};
