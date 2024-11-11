
import React, { useState } from 'react';
import dTalentLogo from './dTalentLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt, faBullhorn, faCog, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ firstName, initials, onNavigate }) => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  console.log(initials);  
  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={dTalentLogo} alt="Logo" className="logo" />
      </div>
      <ul className="menu">
        <li onClick={() => onNavigate('employees')}>
          <FontAwesomeIcon icon={faUser} className="menu-icon" /> Empleado
        </li>
        <li onClick={() => onNavigate('receipts')}>
          <FontAwesomeIcon icon={faFileAlt} className="menu-icon" /> Recibos
        </li>
        <li onClick={() => onNavigate('announcement')}>
          <FontAwesomeIcon icon={faBullhorn} className="menu-icon" /> Comunicado
        </li>
        <li onClick={() => onNavigate('settings')}>
          <FontAwesomeIcon icon={faCog} className="menu-icon" /> Configuración
        </li>
      </ul>
      <div className="menu-icon-container">
        <div className="initials-icon">{initials}</div>
        <span className="welcome-text">
          Bienvenido/a, <br />
          {firstName}
        </span>
        <FontAwesomeIcon
          icon={faEllipsisV}
          onClick={toggleLogoutMenu}
          className="menu-icon"
        />
        {showLogoutMenu && (
          <div className="logout-menu">
            
            <button onClick={() => onNavigate('logout')}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
