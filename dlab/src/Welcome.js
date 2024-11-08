// src/Welcome.js
import React from 'react';
import './Welcome.css';
import logo from './dTalentLogo.png'; // Importa el logo

const Welcome = () => {
  return (
    <div className="welcome-container">
      <aside className="sidebar">
        <img src={logo} alt="Logo" className="logo" /> {/* Muestra el logo */}
        <ul>
          <li>Empleado</li>
          <li>Recibos</li>
          <li>Comunicado</li>
          <li>Configuración</li>
        </ul>
      </aside>
      <main className="main-content">
        <h2>Bienvenido</h2>
        <p>Selecciona una opción del menú para continuar.</p>
      </main>
    </div>
  );
};

export default Welcome;
