import { useQuery } from '@tanstack/react-query';
import api from '~/services/api';

export const useEventsQuery = () => {
  const queryKey = ['events'];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api.event.findAll();

      return data;
    },
  });
};
