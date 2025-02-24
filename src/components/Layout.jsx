import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* current page */}
    </>
  );
};

export default Layout;
