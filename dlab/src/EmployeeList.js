// src/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './EmployeeList.css';
import EmployeeListHeader from './EmployeeListHeader'; // Importa el nuevo componente

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [sortOption, setSortOption] = useState('phoneNumber');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const employeesPerPage = 10;

  const fetchEmployees = async (query = '') => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://api.schneck.dlab.software/api/users/${query}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    const data = await response.json();
    setEmployees(data.results);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilterChange = (type) => {
    setFilterType(type);
    setFilterValue('');
  };

  const handleFilterValueChange = (value) => {
    setFilterValue(value);
    let queryParam = '';
    if (filterType && value) {
      queryParam = filterType === 'isActive'
        ? `?${filterType}=${value === 'Activo' ? 'true' : 'false'}`
        : `?${filterType}=${value}`;
      fetchEmployees(queryParam);
    } else {
      fetchEmployees();
    }
  };

  const getUniqueFilterOptions = (type) => {
    if (type === 'isActive') {
      return ['Activo', 'Inactivo'];
    }
    const uniqueOptions = [...new Set(employees.map((emp) => emp[type]))];
    return uniqueOptions.filter(Boolean);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedEmployees = [...employees].sort((a, b) => {
      switch (option) {
        case 'phoneNumber':
          return a.phoneNumber.localeCompare(b.phoneNumber);
        case 'dateJoined':
          return new Date(a.dateJoined) - new Date(b.dateJoined);
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'firstName':
          return a.firstName.localeCompare(b.firstName);
        case 'lastName':
          return a.lastName.localeCompare(b.lastName);
        case 'email':
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });
    setEmployees(sortedEmployees);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phoneNumber.includes(searchTerm)
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredEmployees.length / employeesPerPage)) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="employee-list">
      <EmployeeListHeader /> {/* Usa el nuevo componente aquí */}

      <div className="search-sort-section">
        <div className="sort-filter-section">
          <label>Ordenar por:</label>
          <select onChange={(e) => handleSort(e.target.value)} value={sortOption}>
            <option value="phoneNumber">Número</option>
            <option value="dateJoined">Más reciente</option>
            <option value="createdAt">Más antiguo</option>
            <option value="firstName">Nombre</option>
            <option value="lastName">Apellido</option>
            <option value="email">Correo Electrónico</option>
          </select>

          {/* Selector de tipo de filtro */}
          <label>Filtrar por:</label>
          <select onChange={(e) => handleFilterChange(e.target.value)} value={filterType}>
            <option value="">Selecciona un filtro</option>
            <option value="remunerationType">Tipo de Remuneración</option>
            <option value="position">Cargo</option>
            <option value="section">Sector</option>
            <option value="workShift">Turno</option>
            <option value="isActive">Activo</option>
            <option value="nationality">Nacionalidad</option>
            <option value="role">Rol</option>
          </select>

          {/* Opciones de valores de filtro dinámicas */}
          {filterType && (
            <select onChange={(e) => handleFilterValueChange(e.target.value)} value={filterValue}>
              <option value="">Todos</option>
              {getUniqueFilterOptions(filterType).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
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
            <th></th>
            <th>Número</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Teléfono/Celular</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="initials-icon">{employee.initials}</div>
              </td>
              <td>{employee.id}</td>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>
                <span className={employee.isActive ? 'active-status' : 'inactive-status'}>
                  {employee.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="pagination-arrow">{"<"}</button>
        {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active-page' : ''}>
            {i + 1}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)} className="pagination-arrow">{">"}</button>
      </div>
    </div>
  );
};

export default EmployeeList;
