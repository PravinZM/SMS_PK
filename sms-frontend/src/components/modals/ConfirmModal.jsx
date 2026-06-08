import React from 'react';
import Modal from './Modal';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'info', isLoading = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} type={type} size="sm">
      <div className="confirm-modal-content">
        <p className="confirm-message">{message}</p>
        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </button>
          <button 
            className={`btn-primary ${type === 'danger' ? 'danger' : ''}`} 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
