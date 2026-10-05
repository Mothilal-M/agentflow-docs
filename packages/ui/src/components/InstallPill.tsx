import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

export interface InstallPillProps {
  command?: string;
  prefix?: string;
  className?: string;
}

export const InstallPill: React.FC<InstallPillProps> = ({
  command = 'pip install 10xgraph 10xgraph-api',
  prefix = '$',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <div className={`install-pill-wrapper ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={handleCopy}
        type="button"
        className="install-pill-btn"
        title="Click to copy command"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.65rem 1.15rem',
          borderRadius: '12px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: '0.82rem',
          color: '#0f172a',
          cursor: 'pointer',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#005be6';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 91, 230, 0.12)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span style={{ color: '#94a3b8', userSelect: 'none', fontWeight: 600 }}>{prefix}</span>
        <span style={{ fontWeight: 500, letterSpacing: '-0.01em' }}>{command}</span>
        
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '0.25rem',
            padding: '0.25rem 0.45rem',
            borderRadius: '6px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            color: copied ? '#10b981' : '#64748b',
            fontSize: '0.72rem',
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            transition: 'all 0.15s ease',
          }}
        >
          {copied ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#10b981' }}>
              <CheckIcon size={12} /> Copied!
            </span>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <CopyIcon size={12} /> Copy
            </span>
          )}
        </span>
      </button>

      {copied && (
        <div
          style={{
            position: 'absolute',
            top: '-2rem',
            right: '0.5rem',
            background: '#005be6',
            color: '#ffffff',
            padding: '0.2rem 0.6rem',
            borderRadius: '6px',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            boxShadow: '0 4px 10px rgba(0, 91, 230, 0.3)',
            pointerEvents: 'none',
            animation: 'fadeInUp 0.2s ease',
          }}
        >
          COPIED TO CLIPBOARD
        </div>
      )}
    </div>
  );
};
