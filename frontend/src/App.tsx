import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { rootPaths } from '~/constants/paths';
import { useAuthStore } from '~/store/useAuthStore';
import { QueryProvider } from '~/lib';
import { GuestGuard, PrivateGuard } from '~/hocs';
import { RootLayout } from '~/components/layouts';
import { Home, Login, Register } from '~/components/pages';

function App() {
  const initUser = useAuthStore((state) => state.init);

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <BrowserRouter>
      <QueryProvider>
        <Routes>
          <Route path={rootPaths.index} element={<RootLayout />}>
            <Route index element={<PrivateGuard><Home /></PrivateGuard>} />
            <Route path={rootPaths.login} element={<GuestGuard><Login /></GuestGuard>} />
            <Route path={rootPaths.register} element={<GuestGuard><Register /></GuestGuard>} />
          </Route>
        </Routes>
        <ToastContainer />
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
