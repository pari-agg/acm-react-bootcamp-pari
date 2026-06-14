import { useState } from 'react';
import './Accordion.css';

export const Accordion = ({
  items = [],
  allowMultiple = false,
  className = '',
  ...props
}) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    if (allowMultiple) {
      // ✅ Multiple open allowed
      setOpenItems((prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id]
      );
    } else {
      // ✅ Only one open at a time
      setOpenItems((prev) => (prev[0] === id ? [] : [id]));
    }
  };

  return (
    <div className={`accordion ${className}`} {...props}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id}>
            {/* ✅ Header as button */}
            <button
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
            >
              {item.title}
            </button>

            {/* ✅ Content (only render when open) */}
            {isOpen && <div>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
