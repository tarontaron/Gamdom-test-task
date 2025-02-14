import { Fragment } from 'react';
import { Outlet } from 'react-router';
import { Footer, Header } from '~/components/widgets';

const RootLayout = () => {
  return (
    <Fragment>
      <Header />
      <div className="p-6 mx-auto max-w-7xl min-h-[calc(100vh-172px)]">
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
};

export default RootLayout;
