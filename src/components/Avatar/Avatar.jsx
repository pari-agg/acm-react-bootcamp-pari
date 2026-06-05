import { useState } from 'react';
import './Avatar.css';

export const Avatar = ({
  src,
  alt = 'avatar',
  initials,
  size,
  className = '',
  ...props
}) => {
  const [error, setError] = useState(false);

  const showImage = src && !error;

  let classes = 'avatar';

  if (size === 'sm') classes += ' avatar-sm';
  if (size === 'lg') classes += ' avatar-lg';

  if (!showImage) classes += ' avatar-initials';

  if (className) classes += ` ${className}`;

  return (
    <div className={classes} {...props}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
        />
      ) : (
        initials && <span>{initials}</span>
      )}
    </div>
  );
};

// Optional group component
Avatar.Group = ({ children, className = '', ...props }) => {
  return (
    <div className={`avatar-group ${className}`} {...props}>
      {children}
    </div>
  );
};
