import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '~/store/useAuthStore';
import { rootPaths } from '~/constants/paths';

type TProps = {
  children: ReactNode;
};

const GuestGuard = ({ children }: TProps) => {
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isLoading);

  if (isLoading) return null;

  if (user) {
    return <Navigate to={rootPaths.index} />;
  }

  return children;
};

export default GuestGuard;
