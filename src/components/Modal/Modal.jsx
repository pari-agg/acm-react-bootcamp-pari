import { useEffect, useRef } from 'react';
import './Modal.css';

export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  // ✅ Escape key handling
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // ✅ Focus management (basic)
  useEffect(() => {
    if (!isOpen) return;

    const focusable = modalRef.current?.querySelectorAll(
      'button, input, a, textarea'
    );

    if (focusable?.length) {
      focusable[0].focus();
    }
  }, [isOpen]);

  // ✅ Don't render if closed
  if (!isOpen) return null;

  return (
    <div
      className="overlay"
      data-testid="modal-overlay"
      onClick={onClose} // ✅ overlay click
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        data-testid="modal-content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // ✅ prevent inside click
      >
        {children}

        {/* ✅ Close button for test */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};