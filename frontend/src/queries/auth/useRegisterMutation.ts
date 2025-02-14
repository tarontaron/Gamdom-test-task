import { useMutation } from '@tanstack/react-query';
import type { TRegisterPayload } from '~/types/auth';
import api from '~/services/api';
import { useAuthStore } from '~/store/useAuthStore';

export const useRegisterMutation = () => {
  const mutationKey = ['register'];

  return useMutation({
    mutationKey,
    mutationFn: async (payload: TRegisterPayload) => {
      const { data } = await api.auth.register(payload);

      return data;
    },
    onSuccess: (response) => {
      useAuthStore.getState().login(response.accessToken);
    }
  });
};
