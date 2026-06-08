import React, { useEffect } from 'react';
import { X, AlertTriangle, Info, HelpCircle } from 'lucide-react';
import '../styles/quiz/Modals.css';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'danger',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger': return <AlertTriangle size={48} className="modal-icon danger" />;
      case 'warning': return <AlertTriangle size={48} className="modal-icon warning" />;
      case 'info': return <Info size={48} className="modal-icon info" />;
      default: return <HelpCircle size={48} className="modal-icon primary" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-body">
          <div className="modal-icon-wrapper">
            {getIcon()}
          </div>
          <h2 className="modal-title">{title}</h2>
          <p className="modal-message">{message}</p>
        </div>

        <div className="modal-footer">
          <button 
            className="modal-btn outline" 
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button 
            className={`modal-btn ${type}`} 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <div className="btn-spinner"></div> : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;