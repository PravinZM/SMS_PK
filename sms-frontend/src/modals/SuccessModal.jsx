import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/quiz/Modals.css';

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  isError = false 
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        // onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container success-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-body">
          <div className="modal-icon-wrapper">
            {isError ? (
              <AlertCircle size={64} className="modal-icon danger animate-scale" />
            ) : (
              <CheckCircle size={64} className="modal-icon success animate-scale" />
            )}
          </div>
          <h2 className="modal-title">{title}</h2>
          <p className="modal-message">{message}</p>
        </div>

        <div className="modal-footer justify-center">
          <button 
            className={`modal-btn ${isError ? 'danger' : 'primary'} wide`} 
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;