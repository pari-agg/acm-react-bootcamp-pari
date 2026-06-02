import './Button.css';

export const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  isDisabled = false, 
  isLoading = false 
}) => {
  // Combine all the classes
  const buttonClasses = `btn btn-${variant} ${isDisabled ? 'btn-disabled' : ''} ${isLoading ? 'btn-loading' : ''}`.trim();
  
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <span className="spinner" data-testid="spinner"></span>}
      {children}
    </button>
  );
};

export default Button;