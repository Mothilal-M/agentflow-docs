// apps/landing/src/components/CrashReplayShowcase.tsx
import React, { useState } from 'react';

export const CrashReplayShowcase: React.FC = () => {
  const [hasCrashed, setHasCrashed] = useState(false);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', fontFamily: 'var(--font-display, -apple-system, sans-serif)' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#f87171',
            fontFamily: "var(--font-mono, monospace)",
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          <span>CRITICAL PRODUCTION FAILURE MODE</span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem' }}>
          Why Naive Retry Loops Cost Companies Thousands in Double Charges
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6 }}>
          When an LLM worker drops offline during execution, ordinary frameworks retry blindly and bill customers twice. 10xGraph's replay-safe ledger intercepts re-invocations at runtime.
        </p>

        {/* Interactive Crash Trigger */}
        <div style={{ marginTop: '2rem' }}>
          <button
            onClick={() => setHasCrashed(!hasCrashed)}
            style={{
              padding: '0.85rem 1.8rem',
              borderRadius: '12px',
              background: hasCrashed ? '#005be6' : '#dc2626',
              color: '#ffffff',
              border: 'none',
              fontFamily: "var(--font-mono, monospace)",
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: hasCrashed ? '0 4px 20px rgba(0, 91, 230, 0.45)' : '0 4px 20px rgba(220, 38, 38, 0.45)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {hasCrashed ? '↺ RESET BATTLEGROUND' : '⚡ SIMULATE INFRASTRUCTURE CRASH (SIGKILL)'}
          </button>
        </div>
      </div>

      {/* Side-by-Side Architectural Battleground */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Left: Traditional Frameworks */}
        <div
          style={{
            borderRadius: '20px',
            background: '#090e1a',
            border: hasCrashed ? '2px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: hasCrashed ? '0 0 35px rgba(239, 68, 68, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ padding: '1.5rem 1.75rem', background: 'rgba(239, 68, 68, 0.08)', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', fontFamily: "var(--font-mono, monospace)" }}>
                TRADITIONAL LLM FRAMEWORKS
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                Blind Retries (LangGraph / CrewAI)
              </div>
            </div>
            <span style={{ fontSize: '1.5rem' }}>❌</span>
          </div>

          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: "var(--font-mono, monospace)", fontSize: '0.78rem' }}>
            <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', background: '#050811', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#cbd5e1' }}>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>1.</span> execute_payment(card="*4242", $85) &rarr; <span style={{ color: '#34d399', fontWeight: 700 }}>COMMITTED</span>
            </div>

            {hasCrashed ? (
              <>
                <div style={{ padding: '0.8rem 1rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', fontWeight: 700, textAlign: 'center' }}>
                  ⚡ OOM / Worker Killed at t+180ms
                </div>
                <div style={{ padding: '0.8rem 1rem', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fcd34d' }}>
                  ↻ Naive Retry restarts entire graph from step 0
                </div>
                <div style={{ padding: '0.8rem 1rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.25)', border: '1px solid #ef4444', color: '#ffffff', fontWeight: 800 }}>
                  🚨 DISASTER: execute_payment() re-invoked! User charged $170.00!
                </div>
              </>
            ) : (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748b' }}>
                Click "Simulate Infrastructure Crash" above to observe the double-charge failure mode.
              </div>
            )}
          </div>

          <div style={{ padding: '1.25rem 1.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: '#050811', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: "var(--font-mono, monospace)" }}>FAILURE RESILIENCE</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f87171', fontFamily: "var(--font-mono, monospace)" }}>
              {hasCrashed ? 'DOUBLE MUTATION INVOICED' : 'UNGUARDED'}
            </span>
          </div>
        </div>

        {/* Right: 10xGraph Replay Safe Ledger */}
        <div
          style={{
            borderRadius: '20px',
            background: '#090e1a',
            border: hasCrashed ? '2px solid #10b981' : '1px solid rgba(0, 91, 230, 0.35)',
            boxShadow: hasCrashed ? '0 0 35px rgba(16, 185, 129, 0.25)' : '0 10px 30px rgba(0, 91, 230, 0.15)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ padding: '1.5rem 1.75rem', background: 'rgba(0, 91, 230, 0.12)', borderBottom: '1px solid rgba(0, 91, 230, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', fontFamily: "var(--font-mono, monospace)" }}>
                10XGRAPH PRODUCTION ENGINE
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                Replay-Safe Tool Ledger
              </div>
            </div>
            <span style={{ fontSize: '1.5rem' }}>🛡️</span>
          </div>

          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: "var(--font-mono, monospace)", fontSize: '0.78rem' }}>
            <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', background: '#050811', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#cbd5e1' }}>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>1.</span> execute_payment(card="*4242", $85) &rarr; <span style={{ color: '#34d399', fontWeight: 700 }}>LEDGER #9a8210c</span>
            </div>

            {hasCrashed ? (
              <>
                <div style={{ padding: '0.8rem 1rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', fontWeight: 700, textAlign: 'center' }}>
                  ⚡ OOM / Worker Killed at t+180ms
                </div>
                <div style={{ padding: '0.8rem 1rem', borderRadius: '10px', background: 'rgba(0, 91, 230, 0.15)', border: '1px solid rgba(0, 91, 230, 0.4)', color: '#93c5fd' }}>
                  🛡️ 10xGraph resumes from Redis snapshot #4e2
                </div>
                <div style={{ padding: '0.8rem 1rem', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', fontWeight: 800 }}>
                  ⚡ LEDGER INTERCEPT: execute_payment() re-run SKIPPED! ($0.00 duplicate)
                </div>
              </>
            ) : (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#64748b' }}>
                Click "Simulate Infrastructure Crash" above to observe the ledger intercepting duplicate calls.
              </div>
            )}
          </div>

          <div style={{ padding: '1.25rem 1.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: '#050811', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: "var(--font-mono, monospace)" }}>REPLAY GUARANTEE</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#34d399', fontFamily: "var(--font-mono, monospace)" }}>
              {hasCrashed ? 'ZERO DOUBLE CHARGE' : 'CRYPTOGRAPHICALLY VERIFIED'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
