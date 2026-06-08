import React from 'react';
import Modal from './Modal';
import { CheckCircle } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title, message, actionText = 'Continue' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} type="success" size="sm" showClose={false}>
      <div className="success-modal-content">
        <div className="success-icon-large">
          <CheckCircle size={64} />
        </div>
        <p>{message}</p>
        <button className="btn-primary full-width" onClick={onClose}>
          {actionText}
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
