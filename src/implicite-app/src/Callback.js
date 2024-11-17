import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import userManager from './authConfig';
import { useCurrentUser } from './auth/CurrentUserProvider';

const Callback = () => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const { currentUser,setCurrentUser } = useCurrentUser();

  useEffect(() => {
    userManager.signinRedirectCallback()
      .then((user) => {
       if (user) {
        console.log('Utilisateur connecté:', user);
        setCurrentUser({ currentUser: {
            id: user.profile.sub,
            name: user.profile.name,
            email: user.profile.email,
            isAuthenticated: true,
            token: user.access_token
        } });
    }
        navigate('/home'); // Use navigate to redirect
      })
      .catch((err) => {
        console.error('Erreur d\'authentification:', err);
      });
  }, [navigate,currentUser]);

  return <div>Authentification en cours...</div>;
};

export default Callback;
