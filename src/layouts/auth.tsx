import React from 'react';

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = props => <h1>Auth Page</h1>;

export default Auth;
