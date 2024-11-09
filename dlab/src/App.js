// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setFirstName(name);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard firstName={firstName} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
