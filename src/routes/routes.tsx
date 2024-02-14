import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { Auth, App } from 'pages';
import Protected from './protected';
import { AuthContext } from 'modules/auth/context';
import { Main } from 'layouts';

const Routes: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const isAuthenticated = !!user;

  return (
    <Switch>
      <Route path="app" element={<Protected Layout={Main} allow={isAuthenticated} to="/auth/login" />}>
        <Route path="dashboard" element={<App.Dashboard />} />
        <Route path="shops" element={<App.Shops />} />
        <Route path="purchases" element={<App.Purchases />} />
        <Route path="payouts" element={<App.Payouts />} />

        <Route index path="*" element={<Navigate to="/app/dashboard" />} />
      </Route>

      <Route path="auth" element={<Protected allow={!isAuthenticated} to="/app" />}>
        <Route path="login" element={<Auth.Login />} />
        <Route path="register" element={<Auth.Register />} />
        <Route index path="*" element={<Navigate to="/auth/login" />} />
      </Route>

      <Route index path="*" element={<Navigate to={isAuthenticated ? '/app/dashboard' : '/auth/login'} />} />
    </Switch>
  );
};
export default Routes;
