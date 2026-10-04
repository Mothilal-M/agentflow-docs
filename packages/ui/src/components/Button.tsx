import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
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
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-[6px] gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-[6px] gap-2',
    lg: 'px-7 py-3.5 text-base rounded-[8px] gap-2.5 font-bold',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#c8ff3d] text-[#07080b] font-bold shadow-[0_0_20px_rgba(200,255,61,0.25)] hover:bg-[#d6ff66] hover:scale-[1.02] active:scale-[0.98] border border-[#c8ff3d]',
    ghost:
      'bg-transparent text-[var(--text)] hover:bg-[var(--surface-2)] border border-[var(--border)] hover:border-white/20 active:scale-[0.98]',
    outline:
      'bg-[var(--surface-1)] text-[var(--text)] hover:border-[#c8ff3d]/60 border border-[var(--border)] active:scale-[0.98]',
  }[variant];

  return (
    <button
      disabled={disabled}
      className={`relative inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff3d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080b] disabled:opacity-50 disabled:pointer-events-none ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </button>
  );
};
