import React from 'react';
import { Button } from 'antd';
import { AuthContext } from 'modules/auth/context';

const Dashboard: React.FC = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <>
      <div className="flex flex-col items-start gap-2 p-4 px-6">
        Hello Dashboard
        <Button onClick={logout}>Log out</Button>
      </div>
    </>
  );
};

export default Dashboard;
