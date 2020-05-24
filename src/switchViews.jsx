import React from 'react';
import Login from './login/login';
import { useAuth } from './authHandler';
import App from './app/app';

function SwitchViews() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      {isAuthenticated()
        ? <App />
        : <Login />}

    </div>
  );
}

export default SwitchViews;
