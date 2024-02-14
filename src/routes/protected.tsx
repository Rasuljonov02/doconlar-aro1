import React from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

interface ProtectedProps {
  Layout?: React.FC<{ children: React.ReactNode }>;
  allow: boolean;
  to: To;
}

const Protected: React.FC<ProtectedProps> = ({ allow, to, Layout = React.Fragment }) => {
  if (!allow) return <Navigate to={to} />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Protected;
