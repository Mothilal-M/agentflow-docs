// apps/landing/src/components/TactileGraphStudio.tsx
import React, { useState, useEffect, useRef } from 'react';

interface NodeDetail {
  id: string;
  name: string;
  type: string;
  image: string;
  badge: string;
  status: 'idle' | 'running' | 'fault' | 'replay_safe';
  latency: string;
  description: string;
  stateKeys: string[];
  payload: Record<string, any>;
}

const NODES_DATA: NodeDetail[] = [
  {
    id: 'router',
    name: 'Agent Decision Router',
    type: 'Router Node // v2.4',
    image: '/elements/node-router-decision.jpg',
    badge: 'MODEL: GEMINI-2.5-PRO',
    status: 'running',
    latency: '34ms',
    description: 'Inspects conversation state, analyzes tool requirements, and deterministically routes control flow.',
    stateKeys: ['thread_id', 'messages', 'intent', 'auth_claims'],
    payload: {
      step: 1,
      intent: 'execute_settlement',
      confidence: 0.994,
      target_worker: 'node_replay_ledger',
      rbac_clearance: ['billing:write']
    }
  },
  {
    id: 'ledger',
    name: 'Replay-Safe Tool Ledger',
    type: 'Checkpoint Vault // Ledger',
    image: '/elements/node-replay-ledger.jpg',
    badge: 'GUARANTEE: ONCE-ONLY',
    status: 'replay_safe',
    latency: '0.2ms',
    description: 'Intercepts tool mutations. If a worker crashes or timeouts, the tool ledger prevents duplicate execution.',
    stateKeys: ['tx_hash', 'replay_key', 'idempotency_token', 'committed'],
    payload: {
      tx_id: '0x9a8210c...',
      status: 'VERIFIED_COMMITTED',
      replayed_skip_count: 1,
      duplicate_charge_prevented: true,
      cost_incurred: '$0.00'
    }
  },
  {
    id: 'memory',
    name: 'Dual-Tier Memory Engine',
    type: 'Hot Cache + Postgres Vault',
    image: '/elements/node-redis-memory.jpg',
    badge: 'LATENCY: <0.8ms HOT',
    status: 'running',
    latency: '0.6ms',
    description: 'Sub-millisecond thread state retrieval from Redis SRAM cache backed by immutable Postgres compliance logs.',
    stateKeys: ['redis_ptr', 'hot_ttl_sec', 'pg_wal_offset'],
    payload: {
      tier_1_redis: '0.62ms (HIT)',
      tier_2_postgres: 'WAL synced at #49120',
      active_threads: 1420,
      memory_allocated: '4.2 MB'
    }
  },
  {
    id: 'server',
    name: 'FastAPI Production Server',
    type: 'Compiled Microservice',
    image: '/elements/node-fastapi-server.jpg',
    badge: 'SSE STREAMING ACTIVE',
    status: 'running',
    latency: '1.1ms',
    description: 'Automatically compiled OpenAPI gateway with JWT authentication, per-tool RBAC, and zero-lag SSE streaming.',
    stateKeys: ['sse_channel', 'client_id', 'token_buffer'],
    payload: {
      protocol: 'SSE / HTTP/2',
      connections: 84,
      token_throughput: '128 tokens/sec',
      auth_mode: 'RS256 Bearer JWT'
    }
  }
];

export const TactileGraphStudio: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ledger');
  const [simulationState, setSimulationState] = useState<'nominal' | 'crashed' | 'recovered'>('nominal');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] 10xGraph Execution Engine v0.9.2 ready',
    '[ROUTER] Dispatched intent: order_refund ($240.00)',
    '[LEDGER] Tool committed: dispatch_refund -> tx_id: 0x9a8210c'
  ]);

  const selectedNode = NODES_DATA.find((n) => n.id === selectedNodeId) || NODES_DATA[1];

  // Simulation handler
  const triggerCrash = () => {
    setSimulationState('crashed');
    setLogs((prev) => [
      ...prev,
      '🚨 [WORKER FAULT] SIGKILL simulated on Node_02 (Timeout / Worker killed)',
      '🔄 [ENGINE] Initiating state recovery from Redis Checkpoint #7821...'
    ]);

    setTimeout(() => {
      setSimulationState('recovered');
      setLogs((prev) => [
        ...prev,
        '🛡️ [LEDGER REPLAY] Tool dispatch_refund() found in committed ledger!',
        '⚡ [SKIP DUPLICATE] Re-execution suppressed. Zero duplicate charge incurred.',
        '✅ [RECOVERED] Graph resumed nominal execution in 12ms.'
      ]);
    }, 1800);
  };

  const resetSimulation = () => {
    setSimulationState('nominal');
    setLogs([
      '[INIT] 10xGraph Execution Engine v0.9.2 ready',
      '[ROUTER] Dispatched intent: order_refund ($240.00)',
      '[LEDGER] Tool committed: dispatch_refund -> tx_id: 0x9a8210c'
    ]);
  };

  return (
    <div className="tactile-studio-root">
      {/* Studio Header Toolbar */}
      <div className="studio-topbar">
        <div className="studio-topbar-left">
          <div className="studio-live-pill">
            <span className={`status-orb ${simulationState === 'crashed' ? 'orb-danger' : simulationState === 'recovered' ? 'orb-safe' : 'orb-live'}`}></span>
            <span>{simulationState === 'crashed' ? 'WORKER FAULT SIMULATED' : simulationState === 'recovered' ? 'REPLAY LEDGER RECOVERED' : 'GRAPH RUNTIME: ACTIVE'}</span>
          </div>
          <span className="studio-meta-text">TOPOLOGY: DETERMINISTIC CYCLICAL GRAPH</span>
        </div>

        <div className="studio-topbar-actions">
          {simulationState === 'nominal' ? (
            <button className="studio-btn studio-btn-kill" onClick={triggerCrash}>
              <span className="icon-burn">💥</span>
              <span>Simulate Worker Crash (SIGKILL)</span>
            </button>
          ) : (
            <button className="studio-btn studio-btn-reset" onClick={resetSimulation}>
              <span>↺ Reset State Simulator</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="studio-grid-viewport">
        {/* Left: Interactive Graph Topology Canvas */}
        <div className="studio-canvas-area">
          {/* Background Grid Pattern */}
          <div className="canvas-grid-dots"></div>

          {/* SVG Connector Wires with Animated Energy Packets */}
          <svg className="canvas-wires-overlay" viewBox="0 0 800 500" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wireGradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#005be6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="wireGradientDanger" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Wire 1: Router -> Ledger */}
            <path
              d="M 180 140 C 260 140, 300 240, 390 240"
              className={`svg-wire ${simulationState === 'crashed' ? 'wire-danger' : 'wire-flowing'}`}
            />
            {/* Wire 2: Ledger -> Memory */}
            <path
              d="M 430 290 C 430 360, 260 380, 200 380"
              className="svg-wire wire-flowing"
            />
            {/* Wire 3: Ledger -> Server */}
            <path
              d="M 470 240 C 540 240, 580 200, 650 200"
              className="svg-wire wire-flowing"
            />
          </svg>

          {/* Render Tactile Nodes on Canvas */}
          <div className="nodes-container">
            {NODES_DATA.map((node, idx) => {
              const isSelected = selectedNodeId === node.id;
              const isLedger = node.id === 'ledger';
              const isFaulty = isLedger && simulationState === 'crashed';
              const isSafelyRecovered = isLedger && simulationState === 'recovered';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`tactile-node-card node-pos-${node.id} ${isSelected ? 'is-selected' : ''} ${isFaulty ? 'is-faulty' : ''} ${isSafelyRecovered ? 'is-recovered' : ''}`}
                >
                  {/* Pin Handles */}
                  <div className="node-pin pin-left"></div>
                  <div className="node-pin pin-right"></div>

                  <div className="node-card-inner">
                    {/* 3D Rendered Isometric Asset Header */}
                    <div className="node-asset-preview">
                      <img src={node.image} alt={node.name} className="node-3d-img" />
                      <div className="node-asset-badge">
                        <span>{node.badge}</span>
                      </div>
                    </div>

                    {/* Node Metadata & Title */}
                    <div className="node-content">
                      <div className="node-header-row">
                        <span className="node-type-label">{node.type}</span>
                        <span className="node-latency-pill">{node.latency}</span>
                      </div>
                      <h4 className="node-title">{node.name}</h4>
                      <p className="node-desc">{node.description}</p>
                    </div>

                    {/* Node Footer Status */}
                    <div className="node-footer">
                      <div className="node-status-indicator">
                        <span className={`status-dot ${isFaulty ? 'dot-crashed' : isSafelyRecovered ? 'dot-safe' : 'dot-active'}`}></span>
                        <span className="status-label">
                          {isFaulty ? 'PROCESS TERMINATED' : isSafelyRecovered ? 'LEDGER INTERCEPTED' : 'OPERATIONAL'}
                        </span>
                      </div>
                      <span className="node-keys-count">{node.stateKeys.length} State Keys</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Real-time Telemetry & State Inspector Drawer */}
        <div className="studio-inspector-panel">
          <div className="inspector-header">
            <div className="inspector-title-wrap">
              <span className="inspector-eyebrow">NODE INSPECTOR</span>
              <h3 className="inspector-node-name">{selectedNode.name}</h3>
            </div>
            <div className="inspector-badge-type">{selectedNode.type}</div>
          </div>

          {/* 3D Asset Focus Preview */}
          <div className="inspector-asset-card">
            <img src={selectedNode.image} alt={selectedNode.name} className="inspector-hero-img" />
            <div className="inspector-asset-overlay">
              <span className="inspector-asset-tag">HARDWARE SPEC</span>
              <span className="inspector-asset-val">{selectedNode.badge}</span>
            </div>
          </div>

          {/* State Keys Accordion */}
          <div className="inspector-section">
            <div className="section-label">TRACKED STATE KEYS</div>
            <div className="state-keys-tags">
              {selectedNode.stateKeys.map((k) => (
                <span key={k} className="state-key-pill">
                  <code>{k}</code>
                </span>
              ))}
            </div>
          </div>

          {/* Live JSON Snapshot */}
          <div className="inspector-section">
            <div className="section-label">RUNTIME STATE PAYLOAD (MUTABLE)</div>
            <pre className="inspector-code-block">
              <code>{JSON.stringify(selectedNode.payload, null, 2)}</code>
            </pre>
          </div>

          {/* Live Simulation Terminal Logs */}
          <div className="inspector-section logs-section">
            <div className="section-label">REAL-TIME EVENT LOGS</div>
            <div className="inspector-terminal">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`terminal-log-line ${log.includes('🚨') ? 'log-danger' : log.includes('🛡️') || log.includes('⚡') ? 'log-safe' : ''}`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tactile-studio-root {
          background: #080d1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 91, 230, 0.15);
          display: flex;
          flex-direction: column;
          font-family: var(--font-display, -apple-system, BlinkMacSystemFont, sans-serif);
          position: relative;
        }

        /* Topbar */
        .studio-topbar {
          background: #0d1527;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.9rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .studio-topbar-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .studio-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(0, 91, 230, 0.12);
          border: 1px solid rgba(0, 91, 230, 0.3);
          color: #93c5fd;
          font-size: 0.72rem;
          font-family: var(--font-mono, monospace);
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .status-orb {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .orb-live {
          background: #3b82f6;
          box-shadow: 0 0 10px #3b82f6;
          animation: pulseOrb 2s infinite ease-in-out;
        }
        .orb-danger {
          background: #ef4444;
          box-shadow: 0 0 12px #ef4444;
          animation: pulseOrb 0.5s infinite ease-in-out;
        }
        .orb-safe {
          background: #10b981;
          box-shadow: 0 0 12px #10b981;
        }
        @keyframes pulseOrb {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .studio-meta-text {
          font-size: 0.75rem;
          font-family: var(--font-mono, monospace);
          color: #64748b;
          letter-spacing: 0.06em;
        }

        .studio-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.15rem;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 700;
          font-family: var(--font-mono, monospace);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .studio-btn-kill {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #fca5a5;
        }
        .studio-btn-kill:hover {
          background: rgba(239, 68, 68, 0.25);
          border-color: #ef4444;
          transform: translateY(-1px);
        }
        .studio-btn-reset {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #6ee7b7;
        }
        .studio-btn-reset:hover {
          background: rgba(16, 185, 129, 0.3);
          transform: translateY(-1px);
        }

        /* Viewport Grid */
        .studio-grid-viewport {
          display: grid;
          grid-template-columns: 1fr 380px;
          min-height: 640px;
        }
        @media (max-width: 1024px) {
          .studio-grid-viewport {
            grid-template-columns: 1fr;
          }
        }

        /* Canvas Area */
        .studio-canvas-area {
          position: relative;
          background: radial-gradient(circle at 50% 50%, #0d1527 0%, #070b14 100%);
          overflow: hidden;
          padding: 2.5rem;
          min-height: 580px;
        }
        .canvas-grid-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        /* SVG Wires */
        .canvas-wires-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        .svg-wire {
          fill: none;
          stroke: #1e3a8a;
          stroke-width: 2.5;
          stroke-dasharray: 6 6;
          animation: flowLine 25s linear infinite;
        }
        .wire-flowing {
          stroke: url(#wireGradientActive);
          stroke-width: 3;
          animation: flowLine 15s linear infinite;
        }
        .wire-danger {
          stroke: url(#wireGradientDanger);
          stroke-width: 3.5;
          stroke-dasharray: 4 4;
          animation: flowLine 2s linear infinite;
        }
        @keyframes flowLine {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }

        /* Nodes Container */
        .nodes-container {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(2, minmax(260px, 1fr));
          gap: 2rem;
          max-width: 680px;
          margin: 0 auto;
        }

        /* Tactile Node Cards */
        .tactile-node-card {
          background: #0f1a30;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          position: relative;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
          overflow: visible;
        }
        .tactile-node-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(0, 91, 230, 0.5);
          box-shadow: 0 18px 35px -8px rgba(0, 91, 230, 0.25);
        }
        .tactile-node-card.is-selected {
          border-color: #005be6;
          box-shadow: 0 0 0 2px rgba(0, 91, 230, 0.4), 0 20px 40px -10px rgba(0, 91, 230, 0.3);
        }
        .tactile-node-card.is-faulty {
          border-color: #ef4444;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.4), 0 20px 40px -10px rgba(239, 68, 68, 0.3);
          animation: shakeCard 0.4s ease-in-out;
        }
        .tactile-node-card.is-recovered {
          border-color: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4), 0 20px 40px -10px rgba(16, 185, 129, 0.3);
        }
        @keyframes shakeCard {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        /* Node Pins */
        .node-pin {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          background: #0284c7;
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 8px #0284c7;
          z-index: 10;
        }
        .pin-left { left: -6px; }
        .pin-right { right: -6px; }

        .node-card-inner {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        /* 3D Asset Header */
        .node-asset-preview {
          position: relative;
          width: 100%;
          height: 130px;
          border-radius: 12px;
          overflow: hidden;
          background: #070b14;
        }
        .node-3d-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .tactile-node-card:hover .node-3d-img {
          transform: scale(1.06);
        }
        .node-asset-badge {
          position: absolute;
          bottom: 8px;
          left: 8px;
          padding: 0.25rem 0.55rem;
          border-radius: 6px;
          background: rgba(13, 21, 39, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.65rem;
          font-family: var(--font-mono, monospace);
          font-weight: 700;
          color: #93c5fd;
        }

        /* Node Content */
        .node-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .node-type-label {
          font-size: 0.68rem;
          font-family: var(--font-mono, monospace);
          color: #94a3b8;
          text-transform: uppercase;
        }
        .node-latency-pill {
          font-size: 0.68rem;
          font-family: var(--font-mono, monospace);
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .node-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #f8fafc;
          line-height: 1.2;
          margin-top: 0.2rem;
        }
        .node-desc {
          font-size: 0.76rem;
          color: #94a3b8;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Node Footer */
        .node-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.7rem;
          font-family: var(--font-mono, monospace);
        }
        .node-status-indicator {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .dot-active { background: #38bdf8; box-shadow: 0 0 6px #38bdf8; }
        .dot-crashed { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
        .dot-safe { background: #10b981; box-shadow: 0 0 8px #10b981; }
        .status-label { color: #cbd5e1; font-weight: 600; }
        .node-keys-count { color: #64748b; }

        /* Inspector Panel */
        .studio-inspector-panel {
          background: #0a1120;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          overflow-y: auto;
        }
        .inspector-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1rem;
        }
        .inspector-eyebrow {
          font-size: 0.68rem;
          font-family: var(--font-mono, monospace);
          font-weight: 800;
          color: #005be6;
          letter-spacing: 0.08em;
        }
        .inspector-node-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          margin-top: 0.2rem;
        }
        .inspector-badge-type {
          font-size: 0.68rem;
          font-family: var(--font-mono, monospace);
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .inspector-asset-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          height: 160px;
          background: #060a12;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .inspector-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .inspector-asset-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.6rem 0.9rem;
          background: linear-gradient(to top, rgba(10, 17, 32, 0.95), transparent);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono, monospace);
          font-size: 0.7rem;
        }
        .inspector-asset-tag { color: #64748b; font-weight: 700; }
        .inspector-asset-val { color: #38bdf8; font-weight: 800; }

        .section-label {
          font-size: 0.68rem;
          font-family: var(--font-mono, monospace);
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        .state-keys-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .state-key-pill {
          background: rgba(0, 91, 230, 0.12);
          border: 1px solid rgba(0, 91, 230, 0.3);
          color: #93c5fd;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          font-size: 0.72rem;
        }

        .inspector-code-block {
          background: #060a12;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 0.85rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.74rem;
          color: #a5f3fc;
          overflow-x: auto;
          line-height: 1.5;
        }

        .inspector-terminal {
          background: #050810;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 0.75rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.7rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          max-height: 120px;
          overflow-y: auto;
        }
        .terminal-log-line {
          color: #94a3b8;
          line-height: 1.35;
        }
        .log-danger {
          color: #f87171;
          font-weight: 700;
        }
        .log-safe {
          color: #34d399;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};
