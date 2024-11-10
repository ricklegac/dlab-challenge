import React, { useEffect, useState } from 'react';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [sortOption, setSortOption] = useState('phoneNumber');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('');

  // Fetch de la lista de empleados
  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://api.schneck.dlab.software/api/users/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const data = await response.json();
      setEmployees(data.results);
    };
    fetchEmployees();
  }, []);

  // Función para ordenar empleados
  const handleSort = (option) => {
    setSortOption(option);
    const sortedEmployees = [...employees].sort((a, b) => {
      switch (option) {
        case 'phoneNumber':
          return a.phoneNumber.localeCompare(b.phoneNumber);
        case 'dateJoined':
          return new Date(b.dateJoined) - new Date(a.dateJoined);
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'firstName':
          return a.firstName.localeCompare(b.firstName);
        case 'lastName':
          return a.lastName.localeCompare(b.lastName);
        case 'email':
          return a.email.localeCompare(b.email); // Ordenar por correo electrónico
        default:
          return 0;
      }
    });
    setEmployees(sortedEmployees);
  };

  // Filtrar empleados según búsqueda
  const filteredEmployees = employees.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="employee-list">
      <div className="header">
        <h2>Lista de Empleados</h2>
        <div className="header-buttons">
          <button className="import-button">Importar</button>
          <button className="new-employee-button">+ Nuevo Empleado</button>
        </div>
      </div>

      <div className="search-sort-section">
        <div className="sort-filter-section">
          <label>Ordenar por:</label>
          <select onChange={(e) => handleSort(e.target.value)} value={sortOption}>
            <option value="phoneNumber">Número</option>
            <option value="dateJoined">Más reciente</option>
            <option value="createdAt">Más antiguo</option>
            <option value="firstName">Nombre</option>
            <option value="lastName">Apellido</option>
            <option value="email">Correo Electrónico</option> {/* Nueva opción */}
          </select>
          <button
            className="filter-button"
            onClick={() => setFilterOption(sortOption)}
          >
          Agregar filtro <span className="icon-plus">+</span>
        </button>
        </div>

        <input
          type="text"
          placeholder="Buscar empleados"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Teléfono/Celular</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.phoneNumber}</td>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>
                <button className={employee.isActive ? 'active' : 'inactive'}>
                  {employee.isActive ? 'Activo' : 'Inactivo'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
