import { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export const Dropdown = ({ options = [], label, onSelect }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      // if click is outside the dropdown
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setOpen(false); // ✅ close after select
  };

  return (
    <div ref={containerRef} className="dropdown">
      {/* ✅ Trigger */}
      <button onClick={() => setOpen((prev) => !prev)}>
        {label}
      </button>

      {/* ✅ Menu */}
      {open && (
        <div role="menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              role="menuitem"
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};