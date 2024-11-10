import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [initials, setInitials] = useState('');

  const handleLoginSuccess = (name, userInitials) => {
    setIsLoggedIn(true);
    setFirstName(name);
    setInitials(userInitials); // Guarda `initials` en el estado
  };

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard firstName={firstName} initials={initials} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
