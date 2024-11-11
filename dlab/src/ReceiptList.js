
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import ReceiptListHeader from './ReceiptListHeader';
import PDFModal from './PDFModal';
import './ReceiptList.css';

const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);
  const [sortOption, setSortOption] = useState('createdAtNewest');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [pdfLink, setPdfLink] = useState(null);
  const receiptsPerPage = 10;

  const fetchReceipts = async (query = '') => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://api.schneck.dlab.software/api/receipts/${query}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    const data = await response.json();
    setReceipts(data.results);
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleFilterChange = (type) => {
    setFilterType(type);
    setFilterValue(''); // Resetear el valor del filtro al cambiar el tipo
  };

  const handleFilterValueChange = async (value) => {
    setFilterValue(value);
    let queryParam = '';
  
    if (filterType && value) {
      if (filterType === 'isSended' || filterType === 'isReaded') {
        queryParam = `?${filterType}=${value === 'Sí'}`;
      } else if (filterType === 'month') {
        queryParam = `?${filterType}=${parseInt(value, 10)}`;
      } else {
        queryParam = `?${filterType}=${value}`;
      }
      await fetchReceipts(queryParam); // Refrescar la tabla con el filtro
    } else {
      fetchReceipts(); // Mostrar todos los recibos si no hay filtro
    }
  };

  const getUniqueFilterOptions = (type) => {
    switch (type) {
      case 'isSended':
      case 'isReaded':
        return ['Sí', 'No'];
      case 'month':
        return Array.from({ length: 12 }, (_, i) => (i + 1).toString());
      default:
        const uniqueOptions = [...new Set(receipts.map((rec) => rec[type]))];
        return uniqueOptions.filter(Boolean);
    }
  };

  const handleRowClick = async (receiptId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://api.schneck.dlab.software/api/receipts/${receiptId}/file`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      const data = await response.json();
      setPdfLink(data.file);
    } catch (error) {
      console.error("Error al obtener el enlace del PDF:", error);
    }
  };

  const handleCloseModal = () => {
    setPdfLink(null);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedReceipts = [...receipts].sort((a, b) => {
      switch (option) {
        case 'createdAtNewest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'createdAtOldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });
    setReceipts(sortedReceipts);
  };

  const indexOfLastReceipt = currentPage * receiptsPerPage;
  const indexOfFirstReceipt = indexOfLastReceipt - receiptsPerPage;
  const currentReceipts = receipts.slice(indexOfFirstReceipt, indexOfLastReceipt);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(receipts.length / receiptsPerPage)) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="receipt-list">
      <ReceiptListHeader />

      <div className="search-sort-section">
        <div className="sort-filter-section">
          <label>Ordenar por:</label>
          <select onChange={(e) => handleSort(e.target.value)} value={sortOption}>
            <option value="createdAtNewest">Más reciente</option>
            <option value="createdAtOldest">Más antiguo</option>
            <option value="type">Tipo</option>
          </select>

          <label>Filtrar por:</label>
          <select onChange={(e) => handleFilterChange(e.target.value)} value={filterType}>
            <option value="">Selecciona un filtro</option>
            <option value="type">Tipo de Remuneración</option>
            <option value="section">Sector</option>
            <option value="year">Año</option>
            <option value="month">Mes</option>
            <option value="isSended">Enviado</option>
            <option value="isReaded">Leído</option>
          </select>

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
      </div>

      <table className="receipt-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Empleado</th>
            <th>Fecha</th>
            <th>Enviado</th>
            <th>Leído</th>
            <th>Firmado</th>
          </tr>
        </thead>
        <tbody>
          {currentReceipts.map((receipt) => (
            <tr key={receipt.id} onClick={() => handleRowClick(receipt.id)} style={{ cursor: 'pointer' }}>
              <td>{receipt.type}</td>
              <td>{receipt.employeeFullName} ({receipt.employeeNumber})</td>
              <td>{receipt.fullDate}</td>
              <td>{receipt.isSended ? <FontAwesomeIcon icon={faCheck} className="icon-checked" /> : <FontAwesomeIcon icon={faTimes} className="icon-unchecked" />}</td>
              <td>{receipt.isReaded ? <FontAwesomeIcon icon={faCheck} className="icon-checked" /> : <FontAwesomeIcon icon={faTimes} className="icon-unchecked" />}</td>
              <td>{receipt.isSigned ? <FontAwesomeIcon icon={faCheck} className="icon-checked" /> : <FontAwesomeIcon icon={faTimes} className="icon-unchecked" />}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="pagination-arrow">{"<"}</button>
        {Array.from({ length: Math.ceil(receipts.length / receiptsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active-page' : ''}>
            {i + 1}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === Math.ceil(receipts.length / receiptsPerPage)} className="pagination-arrow">{">"}</button>
      </div>

      {/* Modal para ver el PDF */}
      {pdfLink && <PDFModal pdfLink={pdfLink} onClose={handleCloseModal} />}
    </div>
  );
};

export default ReceiptList;
