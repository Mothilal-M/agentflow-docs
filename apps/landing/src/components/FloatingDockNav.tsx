import React from 'react';

export const FloatingDockNav: React.FC = () => {
  return (
    <header
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 2.5rem)',
        maxWidth: '1100px',
        height: '3.75rem',
        borderRadius: '9999px',
        background: 'rgba(255, 255, 255, 0.88)',
        border: '1px solid rgba(226, 232, 240, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 10px 30px -10px rgba(0, 91, 230, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Brand Logo with 3D Emblem */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
        <img
          src="/logo/10xgraph-logo-3d.png"
          alt="10xGraph"
          style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
        />
      </a>

      {/* Nav Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <a href="#interactive-studio" style={{ color: '#475569', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}>
          Interactive Studio
        </a>
        <a href="#failure-mode" style={{ color: '#475569', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}>
          Replay Guard
        </a>
        <a href="#code-compare" style={{ color: '#475569', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}>
          Benchmarks
        </a>
        <a href="https://docs.10xgraph.com" style={{ color: '#475569', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}>
          Documentation
        </a>
      </nav>

      {/* Nav Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <a
          href="https://github.com/10xGraph"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.85rem',
            borderRadius: '9999px',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            color: '#334155',
            fontSize: '0.8rem',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
          }}
        >
          <span>GitHub</span>
          <span style={{ padding: '0.1rem 0.35rem', borderRadius: '4px', background: '#f1f5f9', fontSize: '0.7rem', fontFamily: 'monospace' }}>★</span>
        </a>

        <a
          href="https://docs.10xgraph.com/get-started/first-agent"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1.15rem',
            borderRadius: '9999px',
            background: '#005be6',
            color: '#ffffff',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(0, 91, 230, 0.28)',
            transition: 'all 0.2s ease',
          }}
        >
          Get Started Free &rarr;
        </a>
      </div>
    </header>
  );
};
