import './Input.css';

export const Input = ({
  placeholder,
  defaultValue,
  value,
  onChange,
  error,
  disabled = false,
  leftIcon,
  rightIcon
}) => {
  const inputClasses = `input ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`.trim();

  const handleChange = (e) => {
    if (disabled) return;  // ← THIS IS THE KEY FIX
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="input-wrapper">
      {leftIcon && <span className="input-left-icon">{leftIcon}</span>}
      
      <input
        type="text"
        className={inputClasses}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      
      {rightIcon && <span className="input-right-icon">{rightIcon}</span>}
      
      {error && (
        <div role="alert" className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};