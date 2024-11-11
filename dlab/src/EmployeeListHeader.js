// src/EmployeeListHeader.js
import React from 'react';
import './EmployeeListHeader.css';

const EmployeeListHeader = () => {
  return (
    <div className="employee-list-header">
      <h2 className="header-title">Lista de Empleados</h2>
      <div className="header-buttons">
        <button className="import-button">Importar</button>
        <button className="new-employee-button">+ Nuevo Empleado</button>
      </div>
    </div>
  );
};

export default EmployeeListHeader;
