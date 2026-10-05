import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GraphNodeData {
  id: string;
  name: string;
  role: string;
  type: 'ingest' | 'llm' | 'tool' | 'checkpoint' | 'output';
  status: 'idle' | 'running' | 'success' | 'crashed' | 'recovered' | 'skipped';
  x: number;
  y: number;
  detail: string;
}

export const InteractiveGraphStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'replay' | 'swarm' | 'rag'>('replay');
  const [isCrashed, setIsCrashed] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GraphNodeData | null>(null);
  const [pulseProgress, setPulseProgress] = useState(0);
  const [telemetry, setTelemetry] = useState({
    activeStep: 'Payment_Gateway',
    latency: '38ms',
    cacheSpeed: '0.74ms',
    tokens: '412 tok',
    status: 'OPTIMAL',
  });

  const canvasSvgRef = useRef<SVGSVGElement>(null);

  // Nodes for the Replay-Safe Checkout scenario
  const replayNodes: GraphNodeData[] = [
    {
      id: 'n_ingest',
      name: 'Order Ingest',
      role: 'POST /checkout',
      type: 'ingest',
      status: 'success',
      x: 100,
      y: 160,
      detail: 'Bearer JWT verified • cart_total: $85.00 • thread_id: th_04e2',
    },
    {
      id: 'n_llm',
      name: 'Checkout Agent',
      role: 'Gemini 2.5 Pro',
      type: 'llm',
      status: isCrashed ? 'crashed' : 'running',
      x: 320,
      y: 90,
      detail: 'State transition validated • Next tool call: execute_payment()',
    },
    {
      id: 'n_tool',
      name: 'Stripe Gateway',
      role: 'execute_payment()',
      type: 'tool',
      status: isCrashed ? 'crashed' : isRecovering ? 'skipped' : 'success',
      x: 540,
      y: 90,
      detail: isRecovering
        ? '⚡ REPLAY DETECTED: Snapshot already records payment receipt. Execution SKIPPED (Zero Double Charge).'
        : 'Payment committed ($85.00 charged). Transaction hash: 0x9f1a8c.',
    },
    {
      id: 'n_checkpoint',
      name: 'Redis Ledger',
      role: 'Durable Checkpoint',
      type: 'checkpoint',
      status: isRecovering ? 'recovered' : 'success',
      x: 540,
      y: 230,
      detail: 'Sub-millisecond state snapshot saved. Key: thread:th_04e2:commit:3',
    },
    {
      id: 'n_output',
      name: 'Committed Output',
      role: 'SSE Event Stream',
      type: 'output',
      status: isCrashed ? 'idle' : 'success',
      x: 760,
      y: 160,
      detail: 'HTTP 200 OK • Receipt streamed to client • Zero replay drift.',
    },
  ];

  // Swarm Nodes
  const swarmNodes: GraphNodeData[] = [
    { id: 's_router', name: 'Supervisor Agent', role: 'Gemini 2.5 Flash', type: 'llm', status: 'running', x: 140, y: 160, detail: 'Decomposes user query into parallel specialist sub-graphs' },
    { id: 's_spec1', name: 'Data Analyst', role: 'query_snowflake()', type: 'tool', status: 'success', x: 380, y: 80, detail: 'Executes aggregate telemetry query in 45ms' },
    { id: 's_spec2', name: 'Code Architect', role: 'refactor_ast()', type: 'tool', status: 'running', x: 380, y: 240, detail: 'Generates TypeScript type definitions from SQL schema' },
    { id: 's_auditor', name: 'Auditor Agent', role: 'Claude 3.5 Sonnet', type: 'llm', status: 'idle', x: 620, y: 160, detail: 'Validates code safety and ensures zero regression' },
    { id: 's_commit', name: 'Committed Swarm', role: 'FastAPI 200 OK', type: 'output', status: 'success', x: 800, y: 160, detail: 'All 3 specialists converged with deterministic state' },
  ];

  const currentNodes = activeTab === 'swarm' ? swarmNodes : replayNodes;

  // Pulse animation along edges
  useEffect(() => {
    let animId: number;
    let t = 0;
    const animate = () => {
      t = (t + 0.008) % 1;
      setPulseProgress(t);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Trigger Crash Simulation
  const handleTriggerCrash = () => {
    if (isCrashed || isRecovering) return;
    setIsCrashed(true);
    setTelemetry({
      activeStep: '⚡ CRASH_DETECTED',
      latency: 'ERR',
      cacheSpeed: '--',
      tokens: 'HALTED',
      status: 'PROCESS_KILLED',
    });

    // Auto recover after 1.8s
    setTimeout(() => {
      setIsCrashed(false);
      setIsRecovering(true);
      setTelemetry({
        activeStep: 'Redis_Resume_Ledger',
        latency: '0.8ms',
        cacheSpeed: '0.74ms',
        tokens: '412 tok',
        status: 'RECOVERED_SAFE',
      });

      setTimeout(() => {
        setIsRecovering(false);
      }, 4000);
    }, 1800);
  };

  return (
    <div className="unique-studio-wrapper" style={{ width: '100%', position: 'relative' }}>
      
      {/* Studio Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1rem 1.5rem',
          background: '#ffffff',
          borderRadius: '20px 20px 0 0',
          border: '1px solid #e2e8f0',
          borderBottom: 'none',
          boxShadow: '0 4px 20px rgba(0, 91, 230, 0.05)',
        }}
      >
        {/* Left: Interactive Scenario Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Interactive Demo:
          </span>
          <div style={{ display: 'flex', gap: '0.35rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '12px' }}>
            <button
              onClick={() => { setActiveTab('replay'); setSelectedNode(null); }}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'replay' ? '#ffffff' : 'transparent',
                color: activeTab === 'replay' ? '#005be6' : '#64748b',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'replay' ? '0 1px 4px rgba(0, 0, 0, 0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              🛡️ Replay-Safe Checkout
            </button>
            <button
              onClick={() => { setActiveTab('swarm'); setSelectedNode(null); }}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'swarm' ? '#ffffff' : 'transparent',
                color: activeTab === 'swarm' ? '#005be6' : '#64748b',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'swarm' ? '0 1px 4px rgba(0, 0, 0, 0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              ⚡ Multi-Agent Swarm
            </button>
          </div>
        </div>

        {/* Center: Live Action Button (Crash Simulation trigger) */}
        {activeTab === 'replay' && (
          <div>
            <button
              onClick={handleTriggerCrash}
              disabled={isCrashed || isRecovering}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1rem',
                borderRadius: '10px',
                background: isCrashed ? '#fef2f2' : isRecovering ? '#ecfdf5' : '#fff1f2',
                border: isCrashed ? '1.5px solid #ef4444' : isRecovering ? '1.5px solid #10b981' : '1px solid #fecdd3',
                color: isCrashed ? '#dc2626' : isRecovering ? '#059669' : '#e11d48',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: isCrashed || isRecovering ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(225, 29, 72, 0.12)',
              }}
            >
              {isCrashed ? (
                <><span>⚡</span> <span>WORKER KILLED... RECOVERING</span></>
              ) : isRecovering ? (
                <><span>↻</span> <span>RESUMED (SKIPPED DOUBLE CHARGE!)</span></>
              ) : (
                <><span>💥</span> <span>KILL WORKER (TEST REPLAY GUARD)</span></>
              )}
            </button>
          </div>
        )}

        {/* Right: Live Telemetry Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isCrashed ? '#ef4444' : '#10b981', display: 'inline-block' }} />
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{telemetry.status}</span>
          </div>
          <div style={{ color: '#005be6', fontWeight: 600 }}>{telemetry.latency}</div>
        </div>
      </div>

      {/* Main Interactive Canvas Surface */}
      <div
        style={{
          position: 'relative',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '0 0 20px 20px',
          boxShadow: '0 25px 60px -15px rgba(0, 91, 230, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8)',
          overflow: 'hidden',
          minHeight: '440px',
        }}
      >
        {/* Animated Background Mesh Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(0, 91, 230, 0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }}
        />

        {/* Shockwave visual effect on crash */}
        {isCrashed && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 45% 30%, rgba(239, 68, 68, 0.18), transparent 70%)',
              pointerEvents: 'none',
              animation: 'pulseCrash 0.4s infinite alternate',
            }}
          />
        )}

        {/* SVG Bezier Connection Lines & Traveling Glowing Packets */}
        <svg
          ref={canvasSvgRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 900 360"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005be6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#005be6" stopOpacity="0.4" />
            </linearGradient>

            <filter id="glowPacket" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {activeTab === 'replay' ? (
            <>
              {/* Path 1: Ingest -> Checkout Agent */}
              <path d="M 170 160 C 230 160, 250 90, 320 90" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" strokeDasharray="4 4" />
              {/* Path 2: Checkout Agent -> Stripe Tool */}
              <path d="M 430 90 L 540 90" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" />
              {/* Path 3: Checkout Agent -> Redis Checkpoint */}
              <path d="M 390 120 C 440 180, 470 230, 540 230" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" strokeDasharray="4 4" />
              {/* Path 4: Redis Checkpoint -> Output */}
              <path d="M 650 230 C 700 230, 710 160, 760 160" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" />
              {/* Path 5: Stripe Tool -> Output */}
              <path d="M 650 90 C 700 90, 710 160, 760 160" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" />

              {/* Animated Traveling Packet */}
              {!isCrashed && (
                <circle
                  cx={170 + (760 - 170) * pulseProgress}
                  cy={160 + Math.sin(pulseProgress * Math.PI) * -50}
                  r="5"
                  fill="#005be6"
                  filter="url(#glowPacket)"
                />
              )}
            </>
          ) : (
            <>
              {/* Swarm paths */}
              <path d="M 230 160 C 290 160, 310 80, 380 80" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" />
              <path d="M 230 160 C 290 160, 310 240, 380 240" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" />
              <path d="M 490 80 C 550 80, 560 160, 620 160" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" />
              <path d="M 490 240 C 550 240, 560 160, 620 160" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" />
              <path d="M 720 160 L 800 160" fill="none" stroke="url(#linkGradient)" strokeWidth="2.5" />
            </>
          )}
        </svg>

        {/* Interactive Floating Nodes */}
        <div style={{ position: 'relative', width: '100%', height: '360px' }}>
          {currentNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  position: 'absolute',
                  left: `${(node.x / 900) * 100}%`,
                  top: `${(node.y / 360) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)')}
              >
                {/* Node Box */}
                <div
                  style={{
                    padding: '0.75rem 1.15rem',
                    borderRadius: '14px',
                    background:
                      node.status === 'crashed'
                        ? '#fef2f2'
                        : node.status === 'skipped'
                        ? '#eff6ff'
                        : isSelected
                        ? '#dfecff'
                        : '#ffffff',
                    border:
                      node.status === 'crashed'
                        ? '2px solid #ef4444'
                        : node.status === 'skipped'
                        ? '2px solid #005be6'
                        : isSelected
                        ? '2px solid #005be6'
                        : '1px solid #cbd5e1',
                    boxShadow: isSelected
                      ? '0 10px 25px rgba(0, 91, 230, 0.25)'
                      : node.status === 'crashed'
                      ? '0 10px 25px rgba(239, 68, 68, 0.25)'
                      : '0 4px 15px rgba(0, 0, 0, 0.06)',
                    minWidth: '150px',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: node.status === 'crashed' ? '#dc2626' : '#0f172a' }}>
                      {node.name}
                    </span>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background:
                          node.status === 'crashed'
                            ? '#ef4444'
                            : node.status === 'skipped'
                            ? '#005be6'
                            : '#10b981',
                      }}
                    />
                  </div>

                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#64748b' }}>
                    {node.role}
                  </div>

                  {node.status === 'skipped' && (
                    <div style={{ marginTop: '0.35rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: '#005be6', color: '#ffffff', fontSize: '0.6rem', fontWeight: 800 }}>
                      SKIPPED (REPLAY-SAFE)
                    </div>
                  )}

                  {node.status === 'crashed' && (
                    <div style={{ marginTop: '0.35rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: '#ef4444', color: '#ffffff', fontSize: '0.6rem', fontWeight: 800 }}>
                      CRASH INTERCEPTED
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Drawer: Live State Inspector */}
        <div
          style={{
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 800, color: '#0f172a' }}>INSPECTOR:</span>
            {selectedNode ? (
              <span style={{ color: '#005be6', fontWeight: 600 }}>
                {selectedNode.name} &rarr; <span style={{ color: '#334155', fontWeight: 400 }}>{selectedNode.detail}</span>
              </span>
            ) : (
              <span style={{ color: '#64748b' }}>
                Click any node above to inspect its live state payload &amp; telemetry trace.
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
            <span>Redis Cache: <strong style={{ color: '#10b981' }}>&lt; 0.8ms</strong></span>
            <span>Auth: <strong style={{ color: '#0f172a' }}>JWT Scoped</strong></span>
            <span style={{ color: '#005be6', fontWeight: 700 }}>100% Deterministic</span>
          </div>
        </div>

      </div>

    </div>
  );
};
