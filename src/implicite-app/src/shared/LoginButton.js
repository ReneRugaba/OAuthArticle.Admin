import React from 'react';
import userManager from '../authConfig';

const LoginButton = () => {
  const login = () => {
    userManager.signinRedirect(); 
  };

  return <button onClick={login}>Se connecter</button>;
};

export default LoginButton;
