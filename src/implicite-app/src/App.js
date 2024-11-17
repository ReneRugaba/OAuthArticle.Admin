import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './auth/CurrentUserProvider';
import RoutesContext from './routes';

const App = () => {
  return (
    <CurrentUserProvider>
      <Router>
        <RoutesContext />
      </Router>
    </CurrentUserProvider>
  );
};

export default App;
