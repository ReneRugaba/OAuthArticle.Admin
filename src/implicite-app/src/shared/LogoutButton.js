import React from 'react';
import userManager from '../authConfig';

const LogoutButton = () => {
  const logout = () => {
    userManager.signoutRedirect();  // Redirection pour la déconnexion
  };

  return <button onClick={logout}>Se déconnecter</button>;
};

export default LogoutButton;
