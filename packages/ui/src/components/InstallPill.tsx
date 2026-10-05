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
    <button
      onClick={handleCopy}
      type="button"
      className={`group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#005BE6]/40 transition-all duration-200 font-mono text-xs text-gray-800 select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[#005BE6] outline-none shadow-xs ${className}`}
      title="Click to copy command"
    >
      <span className="text-gray-400 select-none">{prefix}</span>
      <span className="tracking-tight font-medium">{command}</span>
      
      <span className="inline-flex items-center justify-center ml-1 text-gray-500 group-hover:text-[#005BE6] transition-colors">
        {copied ? (
          <CheckIcon size={14} className="text-[#3EAF3F]" />
        ) : (
          <CopyIcon size={14} />
        )}
      </span>

      {copied && (
        <span className="absolute -top-7 right-2 px-2 py-0.5 rounded-md bg-[#005BE6] text-white font-bold text-[10px] tracking-wider uppercase shadow-md">
          Copied!
        </span>
      )}
    </button>
  );
};
