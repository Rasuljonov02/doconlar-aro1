import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Segmented } from 'antd';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="box-border flex w-full items-center justify-center  px-6 py-2">
      <Segmented
        size="large"
        value={pathname}
        onChange={path => navigate(path as string)}
        options={[
          { label: 'Dashboard', value: '/app/dashboard' },
          { label: 'Shops', value: '/app/shops' },
          { label: 'Purchases', value: '/app/purchases' },
          { label: 'Payouts', value: '/app/payouts' }
        ]}
      />
    </nav>
  );
};

export default Navbar;
