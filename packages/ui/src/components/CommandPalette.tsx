import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, BookIcon, GraphIcon, RocketIcon, TerminalIcon } from './Icons';

export interface PaletteItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  url: string;
  icon?: React.ReactNode;
}

export interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: PaletteItem[];
  onSelect?: (item: PaletteItem) => void;
}

const DEFAULT_ITEMS: PaletteItem[] = [
  {
    id: 'first-agent',
    title: 'Quick Start: First Agent in 5 Minutes',
    description: 'Build and run your first deterministic state graph agent.',
    category: 'Getting Started',
    url: 'https://docs.10xgraph.com/get-started/first-agent',
    icon: <RocketIcon size={16} className="text-[#005BE6]" />,
  },
  {
    id: 'state-graph',
    title: 'Concepts: State Graph Execution',
    description: 'How nodes, edges, and state transitions coordinate agents.',
    category: 'Core Concepts',
    url: 'https://docs.10xgraph.com/concepts/state-graph',
    icon: <GraphIcon size={16} className="text-[#005BE6]" />,
  },
  {
    id: 'checkpointing',
    title: 'Concepts: Durable Checkpoints & Replay',
    description: 'Time-travel debugging and human-in-the-loop recovery.',
    category: 'Core Concepts',
    url: 'https://docs.10xgraph.com/concepts/memory',
    icon: <GraphIcon size={16} className="text-[#3EAF3F]" />,
  },
  {
    id: 'python-api',
    title: 'Reference: Python SDK & Node Decorators',
    description: 'Full class and method documentation for 10xGraph Python.',
    category: 'API Reference',
    url: 'https://docs.10xgraph.com/reference/python',
    icon: <TerminalIcon size={16} className="text-gray-500" />,
  },
  {
    id: 'compare-langgraph',
    title: 'Comparison: 10xGraph vs LangGraph',
    description: 'Architecture, performance benchmarks, and migration guide.',
    category: 'Comparisons',
    url: 'https://docs.10xgraph.com/compare/agentflow-vs-langgraph',
    icon: <BookIcon size={16} className="text-[#005BE6]" />,
  },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen: controlledIsOpen,
  onClose,
  items = DEFAULT_ITEMS,
  onSelect,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  // Global keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (controlledIsOpen === undefined) {
          setInternalOpen((prev) => !prev);
        } else if (onClose) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        if (controlledIsOpen === undefined) {
          setInternalOpen(false);
        } else if (onClose) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, controlledIsOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: PaletteItem) => {
    if (onSelect) {
      onSelect(item);
    } else {
      window.location.href = item.url;
    }
    if (controlledIsOpen === undefined) setInternalOpen(false);
    else if (onClose) onClose();
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-gray-900 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <SearchIcon size={18} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInInput}
            placeholder="Search documentation, concepts, API reference... (Esc to close)"
            className="w-full bg-transparent text-sm placeholder-gray-400 text-gray-900 outline-none font-sans"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-gray-500 bg-white border border-slate-200 rounded-md shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500">
              No matching documentation found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors duration-150 ${
                    isSelected ? 'bg-blue-50/80 text-gray-900 border-l-4 border-[#005BE6]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{item.icon || <BookIcon size={16} />}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-xs truncate text-gray-900">{item.title}</span>
                      <span className="text-[10px] font-mono text-gray-400 shrink-0 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-gray-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span className="text-[#005BE6] font-semibold">10xGraph Docs Search</span>
        </div>
      </div>
    </div>
  );
};
