import React, { useState } from 'react';

export const CrashReplayShowcase: React.FC = () => {
  const [hasCrashed, setHasCrashed] = useState(false);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            background: '#fee2e2',
            color: '#dc2626',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          <span>CRITICAL PRODUCTION FAILURE MODE</span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1rem' }}>
          Why Naive Retry Loops Cost Companies Thousands in Double Charges
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.6 }}>
          When an LLM agent crashes mid-routine, standard frameworks blindly rerun the entire prompt chain. 10xGraph's replay-safe ledger prevents disastrous duplicate tool calls.
        </p>

        {/* Interactive Crash Trigger */}
        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => setHasCrashed(!hasCrashed)}
            style={{
              padding: '0.7rem 1.4rem',
              borderRadius: '12px',
              background: hasCrashed ? '#005be6' : '#ef4444',
              color: '#ffffff',
              border: 'none',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: hasCrashed ? '0 4px 14px rgba(0, 91, 230, 0.3)' : '0 4px 14px rgba(239, 68, 68, 0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            {hasCrashed ? '↺ RESET COMPARISON' : '⚡ SIMULATE INFRASTRUCTURE CRASH'}
          </button>
        </div>
      </div>

      {/* Side-by-Side Architectural Battleground */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Left: Traditional Frameworks */}
        <div
          style={{
            borderRadius: '20px',
            background: '#ffffff',
            border: hasCrashed ? '2px solid #ef4444' : '1px solid #e2e8f0',
            boxShadow: hasCrashed ? '0 20px 40px rgba(239, 68, 68, 0.12)' : '0 4px 20px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ padding: '1.5rem 1.75rem', background: '#fff1f2', borderBottom: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>
                TRADITIONAL LLM STACK
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                Blind Retry Loops
              </div>
            </div>
            <span style={{ fontSize: '1.5rem' }}>❌</span>
          </div>

          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem' }}>
            <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155' }}>
              <span style={{ color: '#005be6', fontWeight: 700 }}>1.</span> execute_payment(card="*4242", $85) &rarr; <span style={{ color: '#10b981', fontWeight: 700 }}>COMMITTED</span>
            </div>

            {hasCrashed ? (
              <>
                <div style={{ padding: '0.6rem 1rem', borderRadius: '10px', background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', fontWeight: 700, textAlign: 'center' }}>
                  ⚡ OOM / Container Crash at t+180ms
                </div>
                <div style={{ padding: '0.6rem 1rem', borderRadius: '10px', background: '#fef3c7', border: '1px solid #fcd34d', color: '#b45309' }}>
                  ↻ Naive Retry restarts entire graph
                </div>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: '#fee2e2', border: '1.5px solid #ef4444', color: '#b91c1c', fontWeight: 700 }}>
                  <span style={{ color: '#ef4444' }}>2.</span> execute_payment(card="*4242", $85) &rarr; <span style={{ color: '#ef4444' }}>DUPLICATE CHARGE!</span>
                </div>
              </>
            ) : (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                Click "Simulate Infrastructure Crash" above to observe the failure mode.
              </div>
            )}
          </div>

          <div style={{ padding: '1.25rem 1.75rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
            <span style={{ color: '#64748b' }}>Result on Crash:</span>
            <span style={{ fontWeight: 800, color: hasCrashed ? '#dc2626' : '#64748b' }}>
              {hasCrashed ? 'Charged Twice ($170.00)' : 'Pending Crash Test'}
            </span>
          </div>
        </div>

        {/* Right: 10xGraph Replay-Safe Engine */}
        <div
          style={{
            borderRadius: '20px',
            background: '#ffffff',
            border: hasCrashed ? '2px solid #005be6' : '1px solid #e2e8f0',
            boxShadow: hasCrashed ? '0 20px 40px rgba(0, 91, 230, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ padding: '1.5rem 1.75rem', background: '#dfecff', borderBottom: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#005be6', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>
                10XGRAPH DURABLE ENGINE
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>
                Replay-Safe Tool Ledger
              </div>
            </div>
            <span style={{ fontSize: '1.5rem' }}>🛡️</span>
          </div>

          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem' }}>
            <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155' }}>
              <span style={{ color: '#005be6', fontWeight: 700 }}>1.</span> execute_payment(card="*4242", $85) &rarr; <span style={{ color: '#10b981', fontWeight: 700 }}>LEDGER COMMITTED</span>
            </div>

            {hasCrashed ? (
              <>
                <div style={{ padding: '0.6rem 1rem', borderRadius: '10px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#005be6', fontWeight: 700, textAlign: 'center' }}>
                  ⚡ Crash Intercepted &bull; Redis Snapshot Restored in 0.8ms
                </div>
                <div style={{ padding: '0.6rem 1rem', borderRadius: '10px', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#059669', fontWeight: 700 }}>
                  ↻ Resume from snapshot 0x4e2
                </div>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: '#dfecff', border: '1.5px solid #005be6', color: '#005be6', fontWeight: 800 }}>
                  <span style={{ color: '#005be6' }}>2.</span> execute_payment() &rarr; <span style={{ background: '#005be6', color: '#fff', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>SKIPPED (REPLAY-SAFE)</span>
                </div>
              </>
            ) : (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                Ready to demonstrate zero duplicate tool calls.
              </div>
            )}
          </div>

          <div style={{ padding: '1.25rem 1.75rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
            <span style={{ color: '#64748b' }}>Result on Crash:</span>
            <span style={{ fontWeight: 800, color: hasCrashed ? '#10b981' : '#64748b' }}>
              {hasCrashed ? 'Exactly Once ($85.00) ✅' : 'Guaranteed Idempotent'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
