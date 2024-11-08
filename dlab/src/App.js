// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import Welcome from './Welcome';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <Welcome /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default App;
