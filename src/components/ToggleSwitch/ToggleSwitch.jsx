import './ToggleSwitch.css';

export const ToggleSwitch = ({
  id = 'toggle-switch',
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  ...props
}) => {
  return (
    <div className="toggle-switch" {...props}>
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
      />

      <label htmlFor={id} className="switch-slider">
        <span className="switch-thumb"></span>
      </label>

      {label && (
        <label htmlFor={id} className="switch-label">
          {label}
        </label>
      )}
    </div>
  );
};
