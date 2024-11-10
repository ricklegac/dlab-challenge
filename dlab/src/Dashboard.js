// src/Dashboard.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import EmployeeList from './EmployeeList';
import './Dashboard.css';

const Dashboard = ({ firstName, initials }) => {
  const [activeScreen, setActiveScreen] = useState('home');

  const handleNavigation = (screen) => {
    if (screen === 'logout') {
      localStorage.removeItem('token');
      window.location.reload();
    } else {
      setActiveScreen(screen);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar firstName={firstName} initials={initials} onNavigate={handleNavigation} />
      <div className="content">
        {activeScreen === 'employees' && <EmployeeList />}
        {activeScreen === 'receipts' && <p>Recibos - Próximamente</p>}
        {activeScreen === 'announcement' && <p>Comunicado - Próximamente</p>}
        {activeScreen === 'settings' && <p>Configuración - Próximamente</p>}
        {activeScreen === 'home' && <p>Selecciona una opción del menú para continuar.</p>}
      </div>
    </div>
  );
};

export default Dashboard;
