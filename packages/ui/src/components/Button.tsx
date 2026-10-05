import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  style,
  ...props
}) => {
  const sizeMap = {
    sm: { padding: '0.4rem 0.85rem', fontSize: '0.78rem', borderRadius: '8px' },
    md: { padding: '0.65rem 1.25rem', fontSize: '0.88rem', borderRadius: '12px' },
    lg: { padding: '0.85rem 1.75rem', fontSize: '0.98rem', borderRadius: '12px', fontWeight: 600 },
  }[size];

  const variantMap = {
    primary: {
      background: '#005be6',
      color: '#ffffff',
      border: '1px solid #005be6',
      boxShadow: '0 2px 8px rgba(0, 91, 230, 0.25)',
    },
    secondary: {
      background: '#dfecff',
      color: '#005be6',
      border: '1px solid rgba(0, 91, 230, 0.2)',
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: '#334155',
      border: '1px solid transparent',
      boxShadow: 'none',
    },
    outline: {
      background: '#ffffff',
      color: '#0f172a',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    },
  }[variant];

  return (
    <button
      disabled={disabled}
      className={`tenx-btn tenx-btn-${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
        outline: 'none',
        textDecoration: 'none',
        ...sizeMap,
        ...variantMap,
        ...style,
      }}
      {...props}
    >
      {icon && iconPosition === 'left' && <span style={{ display: 'inline-flex', shrink: 0 }}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span style={{ display: 'inline-flex', shrink: 0 }}>{icon}</span>}
    </button>
  );
};
