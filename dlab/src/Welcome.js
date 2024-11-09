// src/Welcome.js
import React from 'react';
import dTalentLogo from './dTalentLogo.png';
import './Welcome.css';

const Welcome = ({ firstName, onShowEmployees }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="welcome-container">
      <div className="menu-top">
        <img src={dTalentLogo} alt="Logo" className="logo" />
        <ul>
          <li onClick={onShowEmployees}>Empleado</li>
          <li>Recibos</li>
          <li>Comunicado</li>
          <li>Configuración</li>
        </ul>
      </div>
      <div className="footer">
        Bienvenido, {firstName}
        <button onClick={handleLogout} className="logout-button">...</button>
      </div>
    </div>
  );
};

export default Welcome;
