import './Card.css';

// Base Card component
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

// Header
Card.Header = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

// Body
Card.Body = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

// Footer
Card.Footer = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-footer ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};