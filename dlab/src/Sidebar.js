// src/Sidebar.js
import React from 'react';
import dTalentLogo from './dTalentLogo.png';
import './Sidebar.css';

const Sidebar = ({ firstName, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={dTalentLogo} alt="Logo" className="logo" />
      </div>
      <ul className="menu">
        <li onClick={() => onNavigate('employees')}>Empleado</li>
        <li onClick={() => onNavigate('receipts')}>Recibos</li>
        <li onClick={() => onNavigate('announcement')}>Comunicado</li>
        <li onClick={() => onNavigate('settings')}>Configuración</li>
      </ul>
      <div className="footer">
        Bienvenido, {firstName}
        <button onClick={() => onNavigate('logout')} className="logout-button">...</button>
      </div>
    </aside>
  );
};

export default Sidebar;
