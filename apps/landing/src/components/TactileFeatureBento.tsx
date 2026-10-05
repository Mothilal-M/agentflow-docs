// apps/landing/src/components/TactileFeatureBento.tsx
import React, { useState } from 'react';

export const TactileFeatureBento: React.FC = () => {
  const [replayState, setReplayState] = useState<'idle' | 'simulating' | 'intercepted'>('idle');
  const [activeMemoryTab, setActiveMemoryTab] = useState<'redis' | 'postgres'>('redis');
  const [copiedCurl, setCopiedCurl] = useState(false);

  const runReplaySimulation = () => {
    setReplayState('simulating');
    setTimeout(() => {
      setReplayState('intercepted');
      setTimeout(() => setReplayState('idle'), 4000);
    }, 900);
  };

  const copyCurl = () => {
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="tactile-bento-section">
      <div className="tactile-bento-grid">
        {/* Bento Cell 1: Replay-Safe Tool Ledger (Hero Tile - Large Span 2 Cols) */}
        <div className="bento-tile bento-tile-large">
          <div className="tile-content-flex">
            <div className="tile-info">
              <div className="tile-eyebrow">
                <span className="eyebrow-dot safe-dot"></span>
                <span>STATE GUARANTEE // ZERO DOUBLE EXECUTION</span>
              </div>
              <h3 className="tile-title">Tamper-Proof Replay Safe Tool Ledger</h3>
              <p className="tile-desc">
                When a worker drops offline during tool execution, ordinary frameworks retry blindly and bill customers twice.
                10xGraph locks commits into an immutable cryptographic ledger. Replays safely resume from the checkpoint without re-invoking external mutations.
              </p>

              {/* Interactive Simulation Action */}
              <div className="tile-interactive-box">
                <button
                  className={`btn-ledger-action ${replayState === 'intercepted' ? 'is-intercepted' : ''}`}
                  onClick={runReplaySimulation}
                  disabled={replayState !== 'idle'}
                >
                  {replayState === 'simulating' ? (
                    <span>⏳ Simulating Crash...</span>
                  ) : replayState === 'intercepted' ? (
                    <span>🛡️ DUPLICATE CHARGE INTERCEPTED ($0.00 INVOICED)</span>
                  ) : (
                    <span>▶ Test Worker Timeout & Replay</span>
                  )}
                </button>
                <span className="box-footnote">Deterministic idempotency token validated against Redis state ledger.</span>
              </div>
            </div>

            {/* 3D Rendered Physical Asset */}
            <div className="tile-asset-wrap">
              <div className="asset-glow-ambient"></div>
              <img
                src="/elements/node-replay-ledger.jpg"
                alt="Replay-Safe Tool Ledger Hardware"
                className="bento-3d-asset"
              />
              <div className="asset-floating-tag">
                <span className="tag-key">LEDGER:</span>
                <span className="tag-val">IMMUTABLE ONCE-ONLY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Cell 2: Two-Tier Storage (Redis + Postgres) */}
        <div className="bento-tile bento-tile-medium">
          <div className="tile-top-row">
            <div className="tile-eyebrow">
              <span className="eyebrow-dot"></span>
              <span>MEMORY ARCHITECTURE</span>
            </div>
            <div className="memory-tabs">
              <button
                className={`tab-btn ${activeMemoryTab === 'redis' ? 'active-tab' : ''}`}
                onClick={() => setActiveMemoryTab('redis')}
              >
                Redis Hot (0.6ms)
              </button>
              <button
                className={`tab-btn ${activeMemoryTab === 'postgres' ? 'active-tab' : ''}`}
                onClick={() => setActiveMemoryTab('postgres')}
              >
                Postgres Archive
              </button>
            </div>
          </div>

          <div className="tile-media-card">
            <img
              src="/elements/node-redis-memory.jpg"
              alt="Two-Tier Storage Module"
              className="bento-media-img"
            />
            <div className="storage-metric-overlay">
              {activeMemoryTab === 'redis' ? (
                <div className="metric-badge">
                  <span className="metric-val">&lt; 0.8ms</span>
                  <span className="metric-label">Thread Context Hit Latency</span>
                </div>
              ) : (
                <div className="metric-badge">
                  <span className="metric-val">100%</span>
                  <span className="metric-label">Auditable Cold Telemetry</span>
                </div>
              )}
            </div>
          </div>

          <h4 className="tile-subheading">Two-Tier Dynamic State Memory</h4>
          <p className="tile-subdesc">
            SRAM-fast Redis memory keeps conversational context hot during high-speed agent loops, while asynchronous PostgreSQL writes capture immutable state transitions for SOC2 compliance.
          </p>
        </div>

        {/* Bento Cell 3: FastAPI Self-Hosted Production Server */}
        <div className="bento-tile bento-tile-medium">
          <div className="tile-top-row">
            <div className="tile-eyebrow">
              <span className="eyebrow-dot server-dot"></span>
              <span>DEPLOYMENT ENGINE</span>
            </div>
            <span className="pill-fastapi">FASTAPI + SSE</span>
          </div>

          <div className="tile-media-card">
            <img
              src="/elements/node-fastapi-server.jpg"
              alt="FastAPI Production Server"
              className="bento-media-img"
            />
            <div className="server-status-pill">
              <span className="pulse-led"></span>
              <span>uvicorn agent_service:app --port 8000</span>
            </div>
          </div>

          <h4 className="tile-subheading">One-Line Production Microservice</h4>
          <p className="tile-subdesc">
            Call <code>agent.to_production_server()</code> to immediately emit an OpenAPI-documented, self-hosted FastAPI service with token-by-token SSE streaming and JWT claims.
          </p>
        </div>

        {/* Bento Cell 4: Security Crest & Enterprise Guarantee */}
        <div className="bento-tile bento-tile-wide">
          <div className="seal-banner-flex">
            <div className="seal-img-wrap">
              <img
                src="/elements/badge-zero-double-execution.jpg"
                alt="Replay Safe Zero Double Execution Seal"
                className="seal-badge-img"
              />
            </div>
            <div className="seal-content">
              <div className="tile-eyebrow">
                <span className="eyebrow-dot safe-dot"></span>
                <span>ENTERPRISE MISSION-CRITICAL SLA</span>
              </div>
              <h3 className="seal-title">Zero Duplicate State Mutations. Zero Cloud Lock-In.</h3>
              <p className="seal-desc">
                Unlike closed-source platforms that demand you route company secrets and agent state through third-party cloud infrastructure, 10xGraph runs 100% in your own VPC, behind your private firewall.
              </p>
            </div>
            <div className="seal-cta-wrap">
              <a href="https://docs.10xgraph.com" className="btn-seal-docs">
                Read Security Docs →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tactile-bento-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          font-family: var(--font-display, -apple-system, BlinkMacSystemFont, sans-serif);
        }

        .tactile-bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.5rem;
        }

        .bento-tile {
          background: #090e1a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4);
        }
        .bento-tile:hover {
          border-color: rgba(0, 91, 230, 0.4);
          box-shadow: 0 20px 45px -12px rgba(0, 91, 230, 0.2);
          transform: translateY(-2px);
        }

        .bento-tile-large {
          grid-column: span 12;
        }
        @media (min-width: 900px) {
          .bento-tile-large {
            grid-column: span 12;
          }
          .bento-tile-medium {
            grid-column: span 6;
          }
          .bento-tile-wide {
            grid-column: span 12;
          }
        }
        @media (max-width: 899px) {
          .bento-tile-large, .bento-tile-medium, .bento-tile-wide {
            grid-column: span 12;
          }
        }

        /* Large Tile Flex Layout */
        .tile-content-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
          flex-wrap: wrap;
        }
        @media (min-width: 850px) {
          .tile-content-flex {
            flex-wrap: nowrap;
          }
          .tile-info {
            max-width: 55%;
          }
        }

        .tile-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-family: var(--font-mono, monospace);
          font-weight: 800;
          color: #93c5fd;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }
        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 8px #3b82f6;
        }
        .safe-dot {
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
        .server-dot {
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
        }

        .tile-title {
          font-size: clamp(1.6rem, 3vw, 2.25rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .tile-desc {
          font-size: 0.98rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 1.75rem;
        }

        .tile-interactive-box {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .btn-ledger-action {
          padding: 0.85rem 1.6rem;
          background: #005be6;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 0.86rem;
          font-weight: 800;
          font-family: var(--font-mono, monospace);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 18px rgba(0, 91, 230, 0.4);
          text-align: left;
        }
        .btn-ledger-action:hover:not(:disabled) {
          background: #1e40af;
          transform: translateY(-1px);
        }
        .btn-ledger-action.is-intercepted {
          background: #059669;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.5);
        }
        .box-footnote {
          font-size: 0.72rem;
          font-family: var(--font-mono, monospace);
          color: #64748b;
        }

        /* 3D Asset Wrapper */
        .tile-asset-wrap {
          position: relative;
          width: 320px;
          height: 320px;
          flex-shrink: 0;
          margin: 0 auto;
        }
        .asset-glow-ambient {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, rgba(0, 91, 230, 0.25) 0%, transparent 70%);
          filter: blur(25px);
          pointer-events: none;
        }
        .bento-3d-asset {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
        }
        .asset-floating-tag {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          background: rgba(10, 16, 28, 0.88);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 0.5rem 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.7rem;
          font-family: var(--font-mono, monospace);
        }
        .tag-key { color: #64748b; font-weight: 700; }
        .tag-val { color: #34d399; font-weight: 800; }

        /* Medium Tiles */
        .tile-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .memory-tabs {
          display: flex;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem;
          border-radius: 8px;
        }
        .tab-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.7rem;
          font-family: var(--font-mono, monospace);
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tab-btn.active-tab {
          background: #005be6;
          color: #ffffff;
        }

        .tile-media-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 220px;
          background: #050811;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.25rem;
        }
        .bento-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .bento-tile:hover .bento-media-img {
          transform: scale(1.05);
        }
        .storage-metric-overlay {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
        .metric-badge {
          background: rgba(10, 16, 28, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .metric-val {
          font-size: 1.15rem;
          font-weight: 900;
          font-family: var(--font-mono, monospace);
          color: #38bdf8;
        }
        .metric-label {
          font-size: 0.62rem;
          color: #94a3b8;
        }

        .pill-fastapi {
          font-size: 0.68rem;
          font-family: var(--font-mono, monospace);
          font-weight: 800;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          border: 1px solid rgba(56, 189, 248, 0.25);
        }

        .server-status-pill {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          background: rgba(6, 10, 18, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 0.45rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.7rem;
          color: #93c5fd;
        }
        .pulse-led {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          animation: pulseLed 1.5s infinite;
        }
        @keyframes pulseLed {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .tile-subheading {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .tile-subdesc {
          font-size: 0.88rem;
          line-height: 1.55;
          color: #94a3b8;
        }

        /* Wide Seal Banner */
        .seal-banner-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .seal-img-wrap {
          width: 110px;
          height: 110px;
          flex-shrink: 0;
        }
        .seal-badge-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid rgba(0, 91, 230, 0.4);
          box-shadow: 0 0 25px rgba(0, 91, 230, 0.3);
        }
        .seal-content {
          flex: 1;
          min-width: 260px;
        }
        .seal-title {
          font-size: 1.45rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }
        .seal-desc {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #94a3b8;
        }
        .btn-seal-docs {
          padding: 0.85rem 1.6rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-block;
          white-space: nowrap;
        }
        .btn-seal-docs:hover {
          background: #005be6;
          border-color: #005be6;
        }
      `}</style>
    </div>
  );
};
