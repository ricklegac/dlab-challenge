// src/ReceiptListHeader.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import './ReceiptListHeader.css';

const ReceiptListHeader = () => {
  return (
    <div className="receipt-list-header">
      <h2 className="header-title">Lista de Recibos</h2>
      <div className="header-buttons">
        <button className="refresh-button">
          <FontAwesomeIcon icon={faSync} /> Refrescar recibos
        </button>
      </div>
    </div>
  );
};

export default ReceiptListHeader;
