// apps/landing/src/components/FloatingDockNav.tsx
import React, { useState, useEffect } from 'react';

export const FloatingDockNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        background: scrolled ? 'rgba(7, 11, 22, 0.92)' : 'rgba(8, 14, 28, 0.82)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: scrolled
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(0, 91, 230, 0.35)'
          : '0 15px 35px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
        <a href="#interactive-studio" style={{ color: '#94a3b8', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}>
          Graph Studio
        </a>
        <a href="#features" style={{ color: '#94a3b8', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}>
          Architecture
        </a>
        <a href="#failure-mode" style={{ color: '#94a3b8', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}>
          Replay Guard
        </a>
        <a href="#code-compare" style={{ color: '#94a3b8', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}>
          Benchmarks
        </a>
        <a href="https://docs.10xgraph.com" style={{ color: '#94a3b8', fontSize: '0.86rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.15s ease' }}>
          Docs
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
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#e2e8f0',
            fontSize: '0.8rem',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.2s ease',
          }}
        >
          <span>GitHub</span>
          <span style={{ padding: '0.1rem 0.35rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.1)', fontSize: '0.7rem', fontFamily: 'monospace', color: '#93c5fd' }}>★</span>
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
            boxShadow: '0 4px 18px rgba(0, 91, 230, 0.45)',
            transition: 'all 0.2s ease',
          }}
        >
          Get Started &rarr;
        </a>
      </div>
    </header>
  );
};
