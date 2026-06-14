import { useState } from 'react';
import './Tooltip.css';

export const Tooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
  <div 
    className="tooltip-wrapper"
    onMouseEnter={() => setVisible(true)}
    onMouseLeave={() => setVisible(false)}
    onFocus={() => setVisible(true)}
    onBlur={() => setVisible(false)}
  >
    {children}
    
    {visible && (
      <div className="tooltip-content" role="tooltip">
        {content}
      </div>
    )}
  </div>
);
};