import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Info
} from 'lucide-react';

import '../../styles/quiz/Modals.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  type = 'default',
  size = 'md',
  showClose = true
}) => {

  const [isAnimating, setIsAnimating] = useState(false);

  // Open / Close Animation
  useEffect(() => {

    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      document.body.style.overflow = 'auto';

      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };

  }, [isOpen]);

  // ESC Key Close
  useEffect(() => {

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };

  }, [onClose]);

  // Prevent Render
  if (!isOpen && !isAnimating) {
    return null;
  }

  // Backdrop Close
  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={handleBackdropClick}
    >

      <div
        className={`modal-container ${size} ${isOpen ? 'open' : ''}`}
      >

        <div className="modal-header">

          <div className="modal-title-group">

            {type === 'success' && (
              <CheckCircle className="title-icon success" />
            )}

            {type === 'warning' && (
              <AlertTriangle className="title-icon warning" />
            )}

            {type === 'danger' && (
              <AlertCircle className="title-icon danger" />
            )}

            {type === 'info' && (
              <Info className="title-icon info" />
            )}

            <h3>{title}</h3>

          </div>

          {showClose && (
            <button
              className="modal-close-btn"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          )}

        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>

    </div>
  );
};

export default Modal;