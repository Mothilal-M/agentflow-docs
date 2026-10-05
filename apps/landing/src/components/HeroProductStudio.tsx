import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Scenario {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  nodes: {
    id: string;
    label: string;
    sub: string;
    status: string;
    type: 'input' | 'llm' | 'tool' | 'checkpoint' | 'output';
  }[];
  telemetry: {
    activeNode: string;
    latency: string;
    tokens: string;
    cacheSpeed: string;
    checkpointState: string;
    events: string[];
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'swarm',
    name: 'Multi-Agent Swarm',
    badge: 'COORDINATOR PATTERN',
    badgeColor: '#005BE6',
    description: 'Typed state handoffs between router, specialist tool runner, and verification auditor.',
    nodes: [
      { id: 'n1', label: 'User Ingest', sub: 'Bearer JWT Auth', status: 'OK', type: 'input' },
      { id: 'n2', label: 'Coordinator Agent', sub: 'Gemini 2.5 Pro', status: 'Active', type: 'llm' },
      { id: 'n3', label: 'Specialist Dispatch', sub: 'financial_analyst()', status: 'Running', type: 'tool' },
      { id: 'n4', label: 'Redis Checkpoint', sub: 'Snapshot #8e2b', status: 'Committed', type: 'checkpoint' },
      { id: 'n5', label: 'Verified Output', sub: 'Status: 200 OK', status: 'Done', type: 'output' },
    ],
    telemetry: {
      activeNode: 'Coordinator_Agent',
      latency: '118ms',
      tokens: '1,420 tok',
      cacheSpeed: '0.8ms',
      checkpointState: 'SYNCED',
      events: [
        'router.handoff -> financial_analyst',
        'executing tool: lookup_portfolio_risk()',
        'checkpoint snapshot written to Redis hot cache',
      ],
    },
  },
  {
    id: 'ledger',
    name: 'Replay-Safe Checkout',
    badge: 'ZERO DOUBLE CHARGE',
    badgeColor: '#10B981',
    description: 'Resumes from exact checkpoint state on worker crash. Committed tool calls are never re-executed.',
    nodes: [
      { id: 'n1', label: 'Payment Trigger', sub: 'order_id: #9201', status: 'OK', type: 'input' },
      { id: 'n2', label: 'Gateway Tool', sub: 'charge_card($149.00)', status: 'Committed', type: 'tool' },
      { id: 'n3', label: '⚡ Crash Guard', sub: 'Worker Killed & Resumed', status: 'Recovered', type: 'checkpoint' },
      { id: 'n4', label: 'Durable Ledger', sub: 'Skipped Duplicate Charge', status: 'Safe', type: 'checkpoint' },
      { id: 'n5', label: 'Receipt Stream', sub: 'Client SSE 200 OK', status: 'Done', type: 'output' },
    ],
    telemetry: {
      activeNode: 'Crash_Recovery_Guard',
      latency: '42ms',
      tokens: '320 tok',
      cacheSpeed: '0.6ms',
      checkpointState: 'REPLAY-SAFE',
      events: [
        'charge_card committed at t+14ms',
        'simulated crash detected at t+18ms',
        'checkpoint 0x4e2 reloaded: charge_card skipped',
      ],
    },
  },
  {
    id: 'rag',
    name: 'RAG Knowledge Graph',
    badge: 'HYBRID EMBEDDINGS',
    badgeColor: '#8B5CF6',
    description: 'Sub-millisecond semantic retrieval across hybrid vector & graph memory stores.',
    nodes: [
      { id: 'n1', label: 'Query Embed', sub: 'text-embedding-004', status: 'OK', type: 'input' },
      { id: 'n2', label: 'Hybrid Search', sub: 'pgvector + BM25 Rank', status: 'Active', type: 'tool' },
      { id: 'n3', label: 'Context Rerank', sub: 'Top 5 Chunks (Score: 0.94)', status: 'Ready', type: 'tool' },
      { id: 'n4', label: 'Synthesis Node', sub: 'Claude 3.5 Sonnet', status: 'Streaming', type: 'llm' },
      { id: 'n5', label: 'Grounded Answer', sub: 'With Inline Citations', status: 'Done', type: 'output' },
    ],
    telemetry: {
      activeNode: 'Synthesis_Node',
      latency: '240ms',
      tokens: '2,940 tok',
      cacheSpeed: '1.1ms',
      checkpointState: 'GROUNDED',
      events: [
        'embedded 48 tokens in 12ms',
        'retrieved 5 chunks from pgvector in 18ms',
        'streaming grounded synthesis via SSE',
      ],
    },
  },
];

export const HeroProductStudio: React.FC = () => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const windowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS[activeScenarioIndex];

  // Auto-step sequence simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % scenario.nodes.length) + 1);
    }, 2200);
    return () => clearInterval(timer);
  }, [scenario]);

  // 3D Mouse Tilt Parallax Effect
  useEffect(() => {
    const card = windowRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / (rect.height / 2)) * 6; // Max 6 deg
      const rotateY = (x / (rect.width / 2)) * 8; // Max 8 deg

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1200,
        transformOrigin: 'center center',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-studio-container" style={{ perspective: '1200px', width: '100%' }}>
      {/* 3D Glass Window Frame */}
      <div
        ref={windowRef}
        className="studio-mockup-window"
        style={{
          borderRadius: '20px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 30px 60px -15px rgba(0, 91, 230, 0.15), 0 0 0 1px rgba(226, 232, 240, 0.8)',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Top Window Navigation & Chrome Bar */}
        <div
          style={{
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          {/* Mac window dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
              <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#64748b' }}>
              <span style={{ fontWeight: 700, color: '#0f172a' }}>10xgraph-studio</span>
              <span>/</span>
              <span>{scenario.id}-agent.py</span>
            </div>
          </div>

          {/* Interactive Scenario Switcher Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '10px' }}>
            {SCENARIOS.map((sc, idx) => {
              const isActive = idx === activeScenarioIndex;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    setActiveScenarioIndex(idx);
                    setActiveStep(1);
                  }}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#005be6' : '#64748b',
                    boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {sc.name}
                </button>
              );
            })}
          </div>

          {/* Live Runtime status indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                background: '#ecfdf5',
                color: '#10b981',
                border: '1px solid #a7f3d0',
                fontSize: '0.68rem',
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              LIVE
            </span>
            <span
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                background: '#005be6',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 600,
              }}
            >
              FastAPI 200 OK
            </span>
          </div>
        </div>

        {/* Studio Content Area (Topology Canvas + Telemetry Drawer) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(260px, 1fr)', minHeight: '390px' }}>
          
          {/* Left: Dynamic Graph Visualizer Canvas */}
          <div
            style={{
              padding: '1.75rem',
              position: 'relative',
              background: '#ffffff',
              borderRight: '1px solid #e2e8f0',
              backgroundImage: 'radial-gradient(rgba(0, 91, 230, 0.06) 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Topology Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>COMPILED STATEGRAPH</span>
                <span
                  style={{
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    background: '#dfecff',
                    color: '#005be6',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {scenario.badge}
                </span>
              </div>
              <span style={{ color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }}>
                thread: th_9x28fa • 5 nodes
              </span>
            </div>

            {/* Pipeline Flow Visualization with animated nodes & pulses */}
            <div style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.65rem', padding: '1rem 0' }}>
              
              {/* Node 1: Ingest */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '12px',
                  background: activeStep === 1 ? '#dfecff' : '#ffffff',
                  border: activeStep === 1 ? '1.5px solid #005be6' : '1px solid #e2e8f0',
                  boxShadow: activeStep === 1 ? '0 4px 14px rgba(0, 91, 230, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeStep === 1 ? '#005be6' : '#94a3b8' }} />
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>{scenario.nodes[0].label}</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{scenario.nodes[0].sub}</div>
                </div>
              </div>

              {/* Connecting Edge 1 */}
              <div style={{ width: '2px', height: '18px', background: activeStep >= 2 ? '#005be6' : '#e2e8f0', position: 'relative', transition: 'background 0.3s ease' }}>
                {activeStep === 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '-3px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#005be6',
                      boxShadow: '0 0 8px #005be6',
                      animation: 'packetFlow 1.2s infinite ease-in-out',
                    }}
                  />
                )}
              </div>

              {/* Middle Cluster (Node 2 & Node 3) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', width: '100%', maxWidth: '380px' }}>
                {/* Node 2 */}
                <div
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '12px',
                    background: activeStep === 2 ? '#dfecff' : '#ffffff',
                    border: activeStep === 2 ? '1.5px solid #005be6' : '1px solid #e2e8f0',
                    boxShadow: activeStep === 2 ? '0 4px 14px rgba(0, 91, 230, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.04)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: activeStep === 2 ? '#005be6' : '#0f172a' }}>
                    {scenario.nodes[1].label}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: "'JetBrains Mono', monospace", marginTop: '0.2rem' }}>
                    {scenario.nodes[1].sub}
                  </div>
                  {activeStep === 2 && (
                    <span style={{ display: 'inline-block', marginTop: '0.35rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: '#005be6', color: '#fff', fontSize: '0.6rem', fontWeight: 700 }}>
                      Active Node
                    </span>
                  )}
                </div>

                {/* Node 3 */}
                <div
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '12px',
                    background: activeStep === 3 ? '#ecfdf5' : '#ffffff',
                    border: activeStep === 3 ? '1.5px solid #10b981' : '1px solid #e2e8f0',
                    boxShadow: activeStep === 3 ? '0 4px 14px rgba(16, 185, 129, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.04)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: activeStep === 3 ? '#10b981' : '#0f172a' }}>
                    {scenario.nodes[2].label}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: "'JetBrains Mono', monospace", marginTop: '0.2rem' }}>
                    {scenario.nodes[2].sub}
                  </div>
                  {activeStep === 3 && (
                    <span style={{ display: 'inline-block', marginTop: '0.35rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: '#10b981', color: '#fff', fontSize: '0.6rem', fontWeight: 700 }}>
                      Executed
                    </span>
                  )}
                </div>
              </div>

              {/* Connecting Edge 2 */}
              <div style={{ width: '2px', height: '18px', background: activeStep >= 4 ? '#005be6' : '#e2e8f0', position: 'relative', transition: 'background 0.3s ease' }} />

              {/* Node 4: Checkpoint Ledger */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '12px',
                  background: activeStep === 4 ? '#fef3c7' : '#ffffff',
                  border: activeStep === 4 ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
                  boxShadow: activeStep === 4 ? '0 4px 14px rgba(245, 158, 11, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeStep === 4 ? '#f59e0b' : '#3eaf3f' }} />
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>{scenario.nodes[3].label}</div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>{scenario.nodes[3].sub}</div>
                </div>
              </div>

              {/* Connecting Edge 3 */}
              <div style={{ width: '2px', height: '18px', background: activeStep === 5 ? '#005be6' : '#e2e8f0', position: 'relative' }} />

              {/* Node 5: Output Committed */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 1.35rem',
                  borderRadius: '12px',
                  background: '#005be6',
                  color: '#ffffff',
                  boxShadow: '0 6px 20px rgba(0, 91, 230, 0.25)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                <span>{scenario.nodes[4].label}</span>
                <span
                  style={{
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                  }}
                >
                  200 OK
                </span>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9', fontSize: '0.72rem', color: '#64748b' }}>
              <span>Durable Redis Checkpointer: Active</span>
              <span style={{ color: '#005be6', fontWeight: 600 }}>Zero Double-Execution Guarantee</span>
            </div>
          </div>

          {/* Right: Live Telemetry & Event Stream Drawer */}
          <div
            style={{
              background: '#f8fafc',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <div>
              {/* Telemetry Header */}
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#475569', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Execution Telemetry
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                  Real-time metrics stream
                </div>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Active Graph Node</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{scenario.telemetry.activeNode}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Step Latency</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#005be6' }}>{scenario.telemetry.latency}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Hot Cache</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10b981' }}>{scenario.telemetry.cacheSpeed}</div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Context Tokens</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{scenario.telemetry.tokens}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase' }}>Checkpoint Status</div>
                  <div style={{ display: 'inline-block', marginTop: '0.2rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: '#ecfdf5', color: '#10b981', fontSize: '0.68rem', fontWeight: 800 }}>
                    ● {scenario.telemetry.checkpointState}
                  </div>
                </div>
              </div>

              {/* Event Stream Log */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Live Event Stream
                </div>
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.6rem 0.75rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  {scenario.telemetry.events.map((ev, i) => (
                    <div key={i} style={{ color: i === 0 ? '#005be6' : '#64748b', lineHeight: 1.4 }}>
                      <span style={{ color: '#94a3b8', marginRight: '0.35rem' }}>&gt;</span>
                      {ev}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Footer */}
            <div
              style={{
                marginTop: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: '#64748b',
              }}
            >
              <span>Sub-ms Redis Ledger</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>100% Deterministic</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
