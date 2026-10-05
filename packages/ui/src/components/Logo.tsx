import React from 'react';

export interface LogoProps {
  variant?: 'mark' | 'horizontal' | '3d';
  size?: number;
  animated?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size,
  className = '',
}) => {
  if (variant === 'mark') {
    const dim = size || 36;
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src="/logo/10xgraph-icon-badge.jpg"
          alt="10xGraph Icon"
          width={dim}
          height={dim}
          className="rounded-xl shadow-xs object-cover"
          style={{ width: dim, height: dim }}
          onError={(e) => {
            // Fallback to SVG badge if image not found in path
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    );
  }

  if (variant === '3d') {
    const h = size || 36;
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo/10xgraph-logo-3d.png"
          alt="10xGraph"
          height={h}
          className="h-auto max-w-full object-contain"
          style={{ height: `${h}px` }}
        />
      </div>
    );
  }

  // Horizontal Full Lockup (Default)
  const h = size || 36;
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D Rendered Brand Mark */}
      <img
        src="/logo/10xgraph-logo-3d.png"
        alt="10xGraph"
        height={h}
        className="h-auto object-contain"
        style={{ height: `${h}px` }}
        onError={(e) => {
          // If relative path fails, fall back to vector SVG
          const target = e.currentTarget;
          target.style.display = 'none';
          const sibling = target.nextElementSibling as HTMLElement;
          if (sibling) sibling.style.display = 'inline-flex';
        }}
      />
      {/* Fallback Vector SVG */}
      <div style={{ display: 'none' }} className="items-center gap-2 font-extrabold text-xl tracking-tight text-[#0D0D0D]">
        <span className="text-[#0F1F31]">10</span>
        <span className="text-[#005BE6]">X</span>
        <span className="text-gray-900">Graph</span>
      </div>
    </div>
  );
};
