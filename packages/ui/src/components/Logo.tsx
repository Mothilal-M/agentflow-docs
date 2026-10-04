import React from 'react';

export interface LogoProps {
  variant?: 'mark' | 'horizontal';
  size?: number;
  animated?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size,
  animated = false,
  className = '',
}) => {
  if (variant === 'mark') {
    const dim = size || 36;
    return (
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none ${className}`}
      >
        <defs>
          <filter id="mark-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Orbit Ring */}
        <circle cx="100" cy="100" r="76" stroke="#c8ff3d" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />
        
        {/* Connecting Edges */}
        <line x1="45" y1="45" x2="100" y2="100" stroke="#5ee6f0" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="100" y1="100" x2="155" y2="155" stroke="#c8ff3d" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="155" y1="45" x2="100" y2="100" stroke="#5ee6f0" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="100" y1="100" x2="45" y2="155" stroke="#c8ff3d" strokeWidth="3.5" strokeLinecap="round" />

        {/* Satellite Nodes */}
        <circle cx="45" cy="45" r="9" fill="#07080b" stroke="#5ee6f0" strokeWidth="2.5" />
        <circle cx="45" cy="45" r="4" fill="#5ee6f0" />
        
        <circle cx="155" cy="45" r="9" fill="#07080b" stroke="#5ee6f0" strokeWidth="2.5" />
        <circle cx="155" cy="45" r="4" fill="#5ee6f0" />
        
        <circle cx="45" cy="155" r="9" fill="#07080b" stroke="#5ee6f0" strokeWidth="2.5" />
        <circle cx="45" cy="155" r="4" fill="#5ee6f0" />
        
        <circle cx="155" cy="155" r="9" fill="#07080b" stroke="#5ee6f0" strokeWidth="2.5" />
        <circle cx="155" cy="155" r="4" fill="#5ee6f0" />

        {/* Core Hub Node */}
        <circle cx="100" cy="100" r="14" fill="#07080b" stroke="#c8ff3d" strokeWidth="3" />
        <circle
          cx="100"
          cy="100"
          r="5"
          fill="#c8ff3d"
          filter="url(#mark-glow)"
          className={animated ? 'animate-pulse' : ''}
        />
      </svg>
    );
  }

  // Horizontal Full Lockup
  const h = size || 36;
  const w = (h * 520) / 100;
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 520 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto max-w-full"
      >
        <g transform="translate(10, 5)">
          <circle cx="45" cy="45" r="36" stroke="#c8ff3d" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.4" />
          <line x1="20" y1="20" x2="45" y2="45" stroke="#5ee6f0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="45" x2="70" y2="70" stroke="#c8ff3d" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="70" y1="20" x2="45" y2="45" stroke="#5ee6f0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="45" x2="20" y2="70" stroke="#c8ff3d" strokeWidth="2.5" strokeLinecap="round" />
          
          <circle cx="20" cy="20" r="5" fill="#07080b" stroke="#5ee6f0" strokeWidth="2" />
          <circle cx="70" cy="20" r="5" fill="#07080b" stroke="#5ee6f0" strokeWidth="2" />
          <circle cx="20" cy="70" r="5" fill="#07080b" stroke="#c8ff3d" strokeWidth="2" />
          <circle cx="70" cy="70" r="5" fill="#07080b" stroke="#c8ff3d" strokeWidth="2" />
          
          <circle cx="45" cy="45" r="8" fill="#07080b" stroke="#c8ff3d" strokeWidth="2" />
          <circle cx="45" cy="45" r="3.5" fill="#c8ff3d" />
        </g>
        
        <text x="115" y="58" fontFamily="system-ui, sans-serif" fontSize="40" fontWeight="800" fill="currentColor" letterSpacing="-1">
          10<tspan fill="#c8ff3d">x</tspan>Graph
        </text>

        <rect x="330" y="36" width="72" height="20" rx="10" fill="#c8ff3d" fillOpacity="0.12" stroke="#c8ff3d" strokeOpacity="0.3" strokeWidth="1" />
        <text x="366" y="50" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#c8ff3d" textAnchor="middle" letterSpacing="1">
          ENGINE
        </text>
      </svg>
    </div>
  );
};
