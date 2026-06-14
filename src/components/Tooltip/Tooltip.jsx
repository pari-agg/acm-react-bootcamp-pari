import { useState } from 'react';
import './Tooltip.css';

export const Tooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="tooltip-wrapper">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {children}
      </div>

      {visible && (
        <div
          className="tooltip-content"
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};