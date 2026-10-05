// apps/landing/src/components/FrameworkCodeCompare.tsx
import React, { useState } from 'react';

export const FrameworkCodeCompare: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<'10xgraph' | 'langgraph' | 'crewai'>('10xgraph');

  const frameworks = {
    '10xgraph': {
      name: '10xGraph',
      lines: 12,
      deps: '0 extra deps',
      server: 'Built-in FastAPI + SSE',
      memory: '<0.8ms Redis Hot Cache',
      code: `from 10xgraph import StateGraph, ReactAgent, tool

@tool(permissions=["billing:write"])
async def dispatch_refund(order_id: str, amount: float) -> str:
    """Executes refund through gateway with replay-safe ledger."""
    return f"Approved refund of \${amount} for order {order_id}"

# State graph compiled with Redis durable checkpoints
agent = ReactAgent(
    model="gemini-2.5-pro",
    tools=[dispatch_refund],
    checkpointer="redis://localhost:6379"
)

# In-the-box production server: JWT auth, REST & SSE streams
app = agent.to_production_server()`,
    },
    langgraph: {
      name: 'LangGraph',
      lines: 48,
      deps: 'langchain, langchain-core, langsmith',
      server: 'Requires LangSmith Managed Cloud',
      memory: 'Manual SqliteSaver / custom store',
      code: `from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.sqlite import SqliteSaver
from langchain_core.messages import BaseMessage
from langchain_openai import ChatOpenAI
import sqlite3

# 1. Manually declare TypedDict state schema
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], "add_messages"]

# 2. Wire custom SQLite database connection
conn = sqlite3.connect("checkpoints.db", check_same_thread=False)
memory = SqliteSaver(conn)

# 3. Define graph nodes manually
builder = StateGraph(AgentState)
builder.add_node("llm", call_model)
builder.add_node("tools", call_tools)
builder.set_entry_point("llm")
builder.add_conditional_edges("llm", should_continue)
builder.add_edge("tools", "llm")
graph = builder.compile(checkpointer=memory)

# 4. Production API server NOT included
# Must build custom FastAPI wrappers or pay for LangSmith Cloud`,
    },
    crewai: {
      name: 'CrewAI',
      lines: 52,
      deps: 'crewai, langchain, chroma, instructor',
      server: 'Custom Enterprise Server license',
      memory: 'ChromaDB custom vector store',
      code: `from crewai import Agent, Crew, Process, Task
from crewai.tools import tool

# 1. Define verbose agent personas
support_agent = Agent(
    role="Billing Specialist",
    goal="Handle refund queries accurately",
    backstory="You are an expert financial investigator with Stripe access",
    verbose=True,
    memory=True
)

# 2. Define imperative sequential tasks
refund_task = Task(
    description="Verify order {order_id} and refund \${amount}",
    expected_output="Refund transaction confirmation",
    agent=support_agent
)

# 3. Assemble crew with manual memory store
crew = Crew(
    agents=[support_agent],
    tasks=[refund_task],
    process=Process.sequential
)

# 4. No replay-safe ledger or API server included
# Must implement custom idempotency keys and webhooks manually`,
    },
  };

  const current = frameworks[selectedFramework];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', fontFamily: 'var(--font-display, -apple-system, sans-serif)' }}>
      
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(0, 91, 230, 0.12)',
            border: '1px solid rgba(0, 91, 230, 0.3)',
            color: '#93c5fd',
            fontFamily: "var(--font-mono, monospace)",
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          <span>DEVELOPER ERGONOMICS &amp; BENCHMARKS</span>
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.85rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem' }}>
          Cleaner Code. Faster Runtimes. Zero Framework Bloat.
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6 }}>
          Compare real production implementations side-by-side. 10xGraph eliminates hundreds of lines of glue code and proprietary cloud dependencies.
        </p>

        {/* Framework Selector Tabs */}
        <div style={{ display: 'inline-flex', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.35rem', borderRadius: '14px', marginTop: '1.5rem' }}>
          {(['10xgraph', 'langgraph', 'crewai'] as const).map((fw) => {
            const isSel = selectedFramework === fw;
            return (
              <button
                key={fw}
                onClick={() => setSelectedFramework(fw)}
                style={{
                  padding: '0.55rem 1.3rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: isSel ? '#005be6' : 'transparent',
                  color: isSel ? '#ffffff' : '#94a3b8',
                  fontFamily: 'var(--font-display, sans-serif)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: isSel ? '0 4px 15px rgba(0, 91, 230, 0.4)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {frameworks[fw].name} {fw === '10xgraph' && '✦'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code & Metrics Showcase Frame */}
      <div
        style={{
          borderRadius: '20px',
          background: '#070b14',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 91, 230, 0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Topbar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.5rem',
            background: '#0d1527',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            <span style={{ marginLeft: '0.75rem', fontFamily: "var(--font-mono, monospace)", fontSize: '0.75rem', color: '#94a3b8' }}>
              {selectedFramework === '10xgraph' ? 'agent_service.py (Production Ready)' : 'legacy_boilerplate.py'}
            </span>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontFamily: "var(--font-mono, monospace)", fontSize: '0.72rem' }}>
            <span style={{ color: '#94a3b8' }}>Lines: <strong style={{ color: selectedFramework === '10xgraph' ? '#38bdf8' : '#f87171' }}>{current.lines}</strong></span>
            <span style={{ color: '#94a3b8' }}>Dependencies: <strong style={{ color: selectedFramework === '10xgraph' ? '#34d399' : '#f87171' }}>{current.deps}</strong></span>
            <span style={{ color: '#94a3b8' }}>Server: <strong style={{ color: selectedFramework === '10xgraph' ? '#38bdf8' : '#fbbf24' }}>{current.server}</strong></span>
          </div>
        </div>

        {/* Code Block */}
        <pre
          style={{
            padding: '1.75rem',
            margin: 0,
            fontFamily: "var(--font-mono, monospace)",
            fontSize: '0.88rem',
            lineHeight: 1.7,
            color: '#e2e8f0',
            overflowX: 'auto',
            background: '#070b14',
          }}
        >
          <code>{current.code}</code>
        </pre>
      </div>

    </div>
  );
};
