import { Navbar } from 'components';
import React from 'react';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-2">{children}</div>
    </>
  );
};

export default Main;
