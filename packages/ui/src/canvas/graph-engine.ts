/**
 * 10xGraph "The Living Graph" Canvas2D Engine
 * packages/ui/src/canvas/graph-engine.ts
 *
 * Lightweight, high-performance execution graph animator.
 * Features:
 * - DPR capping (<= 2)
 * - Auto-pauses off-screen via IntersectionObserver
 * - prefers-reduced-motion fallback
 * - Cursor physics & node attraction
 * - Flowing execution packets along edges
 * - Node state metadata & hover/click inspection
 */

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  pulse: number;
  type: 'core' | 'checkpoint' | 'agent' | 'verifier';
  label: string;
  metadata?: Record<string, string | number>;
}

export interface GraphEdge {
  from: number;
  to: number;
  strength?: number;
}

export interface GraphPacket {
  edge: GraphEdge;
  t: number;
  speed: number;
  color: string;
}

export interface GraphOptions {
  nodeCount?: number;
  maxDistance?: number;
  packetStormCount?: number;
  interactive?: boolean;
  theme?: 'dark' | 'light';
  onNodeHover?: (node: GraphNode | null, mouseX: number, mouseY: number) => void;
  onNodeClick?: (node: GraphNode) => void;
}

export class GraphEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private nodes: GraphNode[] = [];
  private edges: GraphEdge[] = [];
  private packets: GraphPacket[] = [];
  private animId: number | null = null;
  private isRunning = false;
  private observer: IntersectionObserver | null = null;
  private mouse = { x: -1000, y: -1000 };
  private width = 0;
  private height = 0;
  private options: Required<GraphOptions>;

  constructor(canvas: HTMLCanvasElement, options: GraphOptions = {}) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get Canvas2D context');
    this.ctx = context;

    this.options = {
      nodeCount: options.nodeCount ?? 20,
      maxDistance: options.maxDistance ?? 160,
      packetStormCount: options.packetStormCount ?? 6,
      interactive: options.interactive ?? true,
      theme: options.theme ?? 'dark',
      onNodeHover: options.onNodeHover ?? (() => {}),
      onNodeClick: options.onNodeClick ?? (() => {}),
    };

    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loop = this.loop.bind(this);
  }

  public init() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    if (this.options.interactive) {
      this.canvas.addEventListener('mousemove', this.handleMouseMove);
      this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
      this.canvas.addEventListener('click', this.handleClick);
    }

    // Auto-pause when off-screen
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.start();
        } else {
          this.stop();
        }
      });
    }, { threshold: 0.05 });
    this.observer.observe(this.canvas);

    this.setupNodes();
    this.setupEdges();
    this.spawnPackets(this.options.packetStormCount);

    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.renderStatic();
    } else {
      this.start();
    }
  }

  private handleResize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private setupNodes() {
    this.nodes = [];
    const count = this.options.nodeCount;
    const isDark = this.options.theme === 'dark';

    const colors = {
      core: isDark ? '#c8ff3d' : '#2f6b12',
      checkpoint: isDark ? '#ffb454' : '#9a5b00',
      edgeData: isDark ? '#5ee6f0' : '#0e7c86',
      agent: isDark ? '#eceae3' : '#0c0e12',
    };

    for (let i = 0; i < count; i++) {
      const isCore = i === 0;
      const isCheckpoint = i === 3 || i === 7;
      const isVerifier = i === 5;

      const type = isCore ? 'core' : (isCheckpoint ? 'checkpoint' : (isVerifier ? 'verifier' : 'agent'));
      const color = isCore ? colors.core : (isCheckpoint ? colors.checkpoint : colors.edgeData);

      this.nodes.push({
        id: `node-${i}`,
        x: isCore ? this.width / 2 : Math.random() * (this.width - 80) + 40,
        y: isCore ? this.height / 2 : Math.random() * (this.height - 60) + 30,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: isCore ? 7.5 : (isCheckpoint ? 5.5 : 4),
        color: color,
        pulse: Math.random() * Math.PI,
        type: type,
        label: isCore ? 'orchestrator_core' : (isCheckpoint ? `checkpoint_stage_${i}` : `worker_agent_${i}`),
        metadata: {
          latency: `${Math.floor(Math.random() * 60 + 20)}ms`,
          state: isCheckpoint ? 'checkpoint_saved' : 'running',
          tokens: Math.floor(Math.random() * 450 + 100)
        }
      });
    }
  }

  private setupEdges() {
    this.edges = [];
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.options.maxDistance) {
          this.edges.push({ from: i, to: j });
        }
      }
    }
  }

  public spawnPackets(count: number = 1) {
    if (this.edges.length === 0) return;
    const isDark = this.options.theme === 'dark';
    const primaryColor = isDark ? '#c8ff3d' : '#2f6b12';
    const secondaryColor = isDark ? '#5ee6f0' : '#0e7c86';

    for (let k = 0; k < count; k++) {
      const edge = this.edges[Math.floor(Math.random() * this.edges.length)];
      this.packets.push({
        edge,
        t: Math.random(),
        speed: 0.007 + Math.random() * 0.012,
        color: Math.random() > 0.4 ? primaryColor : secondaryColor
      });
    }
  }

  private handleMouseMove(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;

    let hoveredNode: GraphNode | null = null;
    for (const node of this.nodes) {
      const dx = this.mouse.x - node.x;
      const dy = this.mouse.y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < node.r + 10) {
        hoveredNode = node;
        break;
      }
    }
    this.options.onNodeHover(hoveredNode, this.mouse.x, this.mouse.y);
  }

  private handleMouseLeave() {
    this.mouse.x = -1000;
    this.mouse.y = -1000;
    this.options.onNodeHover(null, 0, 0);
  }

  private handleClick() {
    for (const node of this.nodes) {
      const dx = this.mouse.x - node.x;
      const dy = this.mouse.y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < node.r + 12) {
        this.options.onNodeClick(node);
        break;
      }
    }
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  public stop() {
    this.isRunning = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  private renderStatic() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawScene();
  }

  private loop() {
    if (!this.isRunning) return;
    this.update();
    this.drawScene();
    this.animId = requestAnimationFrame(this.loop);
  }

  private update() {
    // Update node positions
    for (const node of this.nodes) {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 30 || node.x > this.width - 30) node.vx *= -1;
      if (node.y < 30 || node.y > this.height - 30) node.vy *= -1;

      // Mouse attraction
      const dx = this.mouse.x - node.x;
      const dy = this.mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120 && dist > 0) {
        const force = ((120 - dist) / 120) * 0.45;
        node.x += (dx / dist) * force;
        node.y += (dy / dist) * force;
      }

      node.pulse += 0.035;
    }

    // Update packets
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.t += p.speed;
      if (p.t >= 1) {
        this.packets.splice(i, 1);
        this.spawnPackets(1);
      }
    }
  }

  private drawScene() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const isDark = this.options.theme === 'dark';

    // Draw Edges
    for (const edge of this.edges) {
      const n1 = this.nodes[edge.from];
      const n2 = this.nodes[edge.to];
      const dx = n1.x - n2.x;
      const dy = n1.y - n2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.options.maxDistance) {
        const alpha = (1 - dist / this.options.maxDistance) * (isDark ? 0.35 : 0.25);
        this.ctx.beginPath();
        this.ctx.moveTo(n1.x, n1.y);
        this.ctx.lineTo(n2.x, n2.y);
        this.ctx.strokeStyle = isDark ? `rgba(94, 230, 240, ${alpha})` : `rgba(14, 124, 134, ${alpha})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    }

    // Draw Packets
    for (const p of this.packets) {
      const n1 = this.nodes[p.edge.from];
      const n2 = this.nodes[p.edge.to];
      const px = n1.x + (n2.x - n1.x) * p.t;
      const py = n1.y + (n2.y - n1.y) * p.t;

      this.ctx.beginPath();
      this.ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = isDark ? 8 : 4;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    // Draw Nodes
    for (const node of this.nodes) {
      const pulseR = node.r + Math.sin(node.pulse) * 2.5 + 2;

      // Outer Halo
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
      this.ctx.strokeStyle = node.color;
      this.ctx.globalAlpha = isDark ? 0.2 : 0.15;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
      this.ctx.globalAlpha = 1.0;

      // Node Body
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      this.ctx.fillStyle = isDark ? '#07080b' : '#ffffff';
      this.ctx.fill();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = node.color;
      this.ctx.stroke();

      // Node Core Center
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.r * 0.45, 0, Math.PI * 2);
      this.ctx.fillStyle = node.color;
      this.ctx.fill();
    }
  }

  public destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    if (this.observer) this.observer.disconnect();
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.removeEventListener('click', this.handleClick);
  }
}
