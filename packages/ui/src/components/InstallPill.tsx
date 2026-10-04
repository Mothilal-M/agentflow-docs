import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

export interface InstallPillProps {
  command?: string;
  prefix?: string;
  className?: string;
}

export const InstallPill: React.FC<InstallPillProps> = ({
  command = 'npm i @10xgraph/core',
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
    <button
      onClick={handleCopy}
      type="button"
      className={`group relative inline-flex items-center gap-3 px-4 py-2 rounded-[6px] bg-[var(--surface-1)] border border-[var(--border)] hover:border-[#c8ff3d]/40 transition-all duration-200 font-mono text-xs text-[var(--text)] select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[#c8ff3d] outline-none shadow-sm ${className}`}
      title="Click to copy command"
    >
      <span className="text-[var(--text-muted)] select-none">{prefix}</span>
      <span className="tracking-tight font-medium">{command}</span>
      
      <span className="inline-flex items-center justify-center ml-1 text-[var(--text-muted)] group-hover:text-[#c8ff3d] transition-colors">
        {copied ? (
          <CheckIcon size={14} className="text-[#c8ff3d] animate-in zoom-in" />
        ) : (
          <CopyIcon size={14} />
        )}
      </span>

      {copied && (
        <span className="absolute -top-7 right-2 px-2 py-0.5 rounded bg-[#c8ff3d] text-[#07080b] font-bold text-[10px] tracking-wider uppercase shadow-md animate-fade-in">
          Copied!
        </span>
      )}
    </button>
  );
};
