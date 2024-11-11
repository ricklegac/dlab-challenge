// src/PDFModal.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';
import './PDFModal.css';

const PDFModal = ({ pdfLink, onClose }) => {
  const handleOpenInNewTab = () => {
    window.open(pdfLink, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfLink;
    link.download = 'Recibo.pdf';
    link.click();
  };

  return (
    <div className="pdf-modal-overlay">
      <div className="pdf-modal-content">
        <div className="pdf-modal-header">
          <button onClick={onClose} className="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <button onClick={handleOpenInNewTab} className="open-new-tab-button">
            <FontAwesomeIcon icon={faWindowMaximize} />
          </button>
          <button onClick={handleDownload} className="download-button">
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
        <iframe src={pdfLink} title="PDF Viewer" className="pdf-iframe"></iframe>
      </div>
    </div>
  );
};

export default PDFModal;
