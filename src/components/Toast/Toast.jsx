import { useEffect } from 'react';
import './Toast.css';

export const Toast = ({
  message,
  variant = 'success',
  onClose,
  duration = 3000,
}) => {
  // ✅ Auto close with cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer); // ✅ cleanup
    };
  }, [onClose, duration]);

  return (
    <div
      role="alert"
      className={`toast toast-${variant}`}
    >
      <span>{message}</span>

      {/* ✅ Close button */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};