# 10xGraph Design System (DESIGN.md)

> **The Living Graph**: An execution-aware, high-performance design system for 10xGraph (`10xgraph.com` and `docs.10xgraph.com`).

---

## 1. Brand Concept & Metaphor

**"The Living Graph"**  
10xGraph coordinates autonomous AI agents across state graphs with checkpointing, time-travel debugging, and multi-LLM routing. The visual identity directly mirrors this technical reality:
- **Nodes**: Compute checkpoints, agent routines, evaluators, and human gates.
- **Edges**: Directed telemetry channels carrying streaming state and tokens.
- **Packets**: Glowing execution signals traversing the graph in real time.
- **Signal Lime (`#C8FF3D`)**: The electric spark indicating active execution, verified truth, and state progression.

---

## 2. Color System & Design Tokens

### Token Palette

| Token | Dark Theme (Landing & Docs) | Light Theme (Docs Reading) | Semantic Role |
|---|---|---|---|
| `--color-bg` | `#07080B` (Deep Ink) | `#F6F5F0` (Bone Parchment) | Root canvas background |
| `--color-surface-1` | `#0E1014` (Obsidian) | `#FFFFFF` (Pure Paper) | Cards, sidebars, elevated panels |
| `--color-surface-2` | `#151820` (Basalt) | `#EFEDE6` (Soft Sand) | Code blocks, inputs, sub-cards |
| `--color-border` | `rgba(255, 255, 255, 0.08)` | `rgba(12, 14, 18, 0.08)` | Hairline 1px structure lines |
| `--color-border-glow`| `rgba(200, 255, 61, 0.30)` | `rgba(47, 107, 18, 0.25)` | Hover spotlight & active node focus |
| `--color-text` | `#ECEAE3` (Bone White) | `#0C0E12` (Carbon Black) | Primary headings & high-contrast body |
| `--color-text-muted` | `#8D9199` (Slate Grey) | `#5B5F66` (Neutral Graphite) | Metadata, secondary labels, icons |
| `--color-signal` | **`#C8FF3D`** (Acid Lime) | **`#2F6B12`** (Forest Lime) | Primary action, active nodes, CTA |
| `--color-data-edge` | `#5EE6F0` (Electric Cyan) | `#0E7C86` (Deep Teal) | Directed edges, streaming tokens |
| `--color-checkpoint`| `#FFB454` (Amber Gold) | `#9A5B00` (Warm Ochre) | Checkpoints, human-in-loop pauses |
| `--color-danger` | `#FF6B6B` (Coral Red) | `#B4232C` (Crimson) | Breakpoints, graph halts, errors |

### WCAG AA Contrast Validation

- **Dark Mode**:
  - `#ECEAE3` on `#07080B`: **14.8:1** (AAA compliant - Exceptional)
  - `#8D9199` on `#07080B`: **5.3:1** (AA compliant for body text)
  - `#07080B` on `#C8FF3D` (CTA button text): **15.2:1** (AAA compliant - Ultra readable)
- **Light Mode**:
  - `#0C0E12` on `#F6F5F0`: **16.1:1** (AAA compliant)
  - `#2F6B12` on `#FFFFFF` (Light accent text): **5.8:1** (AA compliant)

---

## 3. Typography Hierarchy

Fonts are self-hosted via `@fontsource` to prevent external CDN delays and privacy tracking.

- **Display & Headings**: `Satoshi` or `General Sans` (Fontshare / Geometric Sans with tight tracking).
- **Body & Prose**: `Geist Sans` (Vercel / OFL, crisp screen legibility).
- **Code & Telemetry**: `Geist Mono` / `JetBrains Mono` (Tabular numbers, monospaced prompts).

| Scale | Size / Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|
| `text-display` | `64px / 1.05` | 800 (Extrabold) | `-0.035em` | Landing hero title |
| `text-h1` | `40px / 1.15` | 700 (Bold) | `-0.025em` | Section headers, Docs H1 |
| `text-h2` | `28px / 1.25` | 600 (Semibold) | `-0.02em` | Bento card titles, Docs H2 |
| `text-h3` | `20px / 1.35` | 600 (Semibold) | `-0.015em` | Sub-sections, component headers |
| `text-body` | `15px / 1.6` | 400 (Regular) | `0` | Documentation body, descriptions |
| `text-mono` | `13px / 1.5` | 500 (Medium) | `0` | Terminal, code snippets, tokens |
| `text-badge` | `11px / 1.4` | 700 (Bold) | `+0.06em` | Uppercase status badges, telemetry |

---

## 4. Radii, Borders & Textures

- **Control Radius (`rounded-md`)**: `6px` for buttons, inputs, pills, and dropdowns.
- **Card Radius (`rounded-xl`)**: `12px` for bento tiles, callouts, and code frames.
- **Container Radius (`rounded-2xl`)**: `20px` for hero showcase, modal dialogs.
- **Borders**: Strictly `1px solid var(--color-border)`. No thick clunky borders.
- **Surfaces & Textures**:
  - **Dot Grid Background**: Subtle `radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)` with 24px step size.
  - **Film Grain**: Subtle SVG procedural noise overlay at `2.5%` opacity to eliminate flat artificial banding.

---

## 5. Motion & Physics Principles

All animations obey `prefers-reduced-motion: reduce`.

- **Standard Ease**: `cubic-bezier(0.22, 1, 0.36, 1)` (spring-damped ease-out).
- **Fast / Micro (150ms - 200ms)**: Button hover states, tooltip fade, dropdown reveals.
- **Medium / Macro (300ms - 450ms)**: Modal enter/leave, bento card hover glow, tab transitions.
- **Slow / Reveal (600ms - 900ms)**: Hero title stagger, scroll-story pinned scene progression.
- **Rules of Motion**:
  - **Reading Areas Are Static**: In `docs.10xgraph.com`, no looping canvas or scroll-jacking is allowed inside markdown content.
  - **Viewport Capping**: The interactive `GraphCanvas` automatically halts rendering loop via `IntersectionObserver` when scrolled out of view.
  - **DPR Capping**: Max `devicePixelRatio = 2` on Retina displays to preserve battery.

---

## 6. Logo Specifications

The 10xGraph mark is an abstract interconnected state graph forming the "10x" / "×" glyph:
1. **Nodes**: 5 primary vertices (Input, Memory, Swarm, Verifier, Checkpoint Core).
2. **Edges**: Luminous 2px - 3.5px strokes with linear gradients (`#5EE6F0` to `#C8FF3D`).
3. **Execution Core**: The center node features an outer pulsed beacon ring.
4. **Deliverables in `brand/`**:
   - `logo-concept-1-intersecting-graph.svg` (The Intersecting Neural Matrix - Recommended)
   - `logo-concept-2-directed-vector.svg` (The Directed Vector & Acceleration)
   - `logo-concept-3-autonomous-mesh.svg` (The Autonomous Swarm Mesh)
   - `logo-10xgraph-horizontal.svg` (Full Horizontal Lockup with wordmark)

---

## 7. Component Style Rules

- **Primary Button**: Background `#C8FF3D`, text `#07080B`, weight 600, radius 6px, hover scale `1.02` with animated edge sweep.
- **Secondary / Ghost Button**: Background `transparent`, border `1px solid var(--color-border)`, hover background `var(--color-surface-2)`.
- **Install Pill**: Monospaced font, copy icon morphing to green checkmark on click, micro-toast confirmation.
- **Bento Tiles**: Glass-free, solid dark surface (`#0E1014`), 1px border, radial cursor spotlight on hover.
