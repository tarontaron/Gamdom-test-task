import type { ReactNode } from 'react';
import { toast } from 'react-toastify';
import { QueryClientProvider, QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import handleApiError from '~/helpers/handleApiError';

type TProps = {
  children: ReactNode;
};

const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(handleApiError(error));
    }
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  })
});

export const QueryProvider = ({ children }: TProps) => {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
