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
    url: '/docs/get-started/first-agent',
    icon: <RocketIcon size={16} className="text-[#c8ff3d]" />,
  },
  {
    id: 'state-graph',
    title: 'Concepts: State Graph Execution',
    description: 'How nodes, edges, and state transitions coordinate agents.',
    category: 'Core Concepts',
    url: '/docs/concepts/state-graph',
    icon: <GraphIcon size={16} className="text-[#5ee6f0]" />,
  },
  {
    id: 'checkpointing',
    title: 'Concepts: Durable Checkpoints & Replay',
    description: 'Time-travel debugging and human-in-the-loop recovery.',
    category: 'Core Concepts',
    url: '/docs/concepts/memory',
    icon: <GraphIcon size={16} className="text-[#ffb454]" />,
  },
  {
    id: 'python-api',
    title: 'Reference: Python SDK & Node Decorators',
    description: 'Full class and method documentation for 10xGraph Python.',
    category: 'API Reference',
    url: '/docs/reference/python',
    icon: <TerminalIcon size={16} className="text-[#8d9199]" />,
  },
  {
    id: 'compare-langgraph',
    title: 'Comparison: 10xGraph vs LangGraph',
    description: 'Architecture, performance benchmarks, and migration guide.',
    category: 'Comparisons',
    url: '/docs/compare/agentflow-vs-langgraph',
    icon: <BookIcon size={16} className="text-[#c8ff3d]" />,
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-xl rounded-xl bg-[#0e1014] border border-white/15 shadow-2xl overflow-hidden text-[#eceae3] font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <SearchIcon size={18} className="text-[#8d9199] shrink-0" />
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
            className="w-full bg-transparent text-sm placeholder-[#8d9199] text-[#eceae3] outline-none font-sans"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#8d9199] bg-[#151820] border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#8d9199]">
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
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-150 ${
                    isSelected ? 'bg-[#151820] text-white border-l-2 border-[#c8ff3d]' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{item.icon || <BookIcon size={16} />}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-xs truncate">{item.title}</span>
                      <span className="text-[10px] font-mono text-[#8d9199] shrink-0 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-[#8d9199] mt-0.5 line-clamp-1">
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
        <div className="flex items-center justify-between px-4 py-2 bg-[#07080b] border-t border-white/5 text-[11px] text-[#8d9199] font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span className="text-[#c8ff3d]">10xGraph Docs Search</span>
        </div>
      </div>
    </div>
  );
};
