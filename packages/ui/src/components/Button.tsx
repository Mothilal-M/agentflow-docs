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
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2 font-semibold',
    lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5 font-bold',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#005BE6] text-white font-semibold shadow-sm hover:bg-[#1E40AF] hover:shadow transition-all border border-[#005BE6]',
    secondary:
      'bg-[#DFECFF] text-[#005BE6] font-semibold hover:bg-[#cbe0ff] transition-all border border-[#005BE6]/20',
    ghost:
      'bg-transparent text-gray-700 hover:text-[#005BE6] hover:bg-slate-100 transition-all border border-transparent',
    outline:
      'bg-white text-gray-700 hover:bg-slate-50 border border-slate-200 transition-all shadow-xs',
  }[variant];

  return (
    <button
      disabled={disabled}
      className={`relative inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#005BE6] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${sizeStyles} ${variantStyles} ${className}`}
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
