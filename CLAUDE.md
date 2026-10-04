# AgentFlow Docs Developer Guide

> Professional documentation site for [AgentFlow](https://github.com/10xHub/Agentflow) built with [Docusaurus 3](https://docusaurus.io).

**Live**: https://agentflow.10xscale.ai  
**Deployed to**: GitHub Pages via `.github/workflows/deploy.yml` (pushes to `main` auto-deploy)

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run start
# → http://localhost:3000

# Build static site
npm run build  

# Serve built site locally
npm run serve
```

### Node Version
Requires **Node.js >= 20.0**. If you have issues, check `package.json` engines field.

---

## Project Structure

```
agentflow-docs/
├── docs/                        # All documentation content
│   ├── get-started/             # Golden path (beginner entry point)
│   ├── concepts/                # Mental models & architecture
│   ├── beginner/                # Tutorial path
│   ├── tutorials/               # Deep dives from examples
│   ├── how-to/                  # Task-oriented guides
│   ├── reference/               # API reference (Python, REST, TS client)
│   ├── compare/                 # Framework comparisons (LangGraph, CrewAI, etc.)
│   ├── use-cases/               # Production reference architectures
│   ├── integrations/            # FastAPI / Next.js / Postgres
│   ├── providers/               # LLM provider configuration
│   ├── troubleshooting/         # Common issues & fixes
│   └── courses/                 # GenAI beginner + advanced curriculum
│
├── blog/                        # Blog posts (10 cornerstone pieces)
│
├── src/
│   ├── components/              # React components (CompareTable, FAQ, etc.)
│   ├── pages/                   # Custom pages (homepage, etc.)
│   └── theme/                   # MDXComponents, theme customizations
│
├── static/                      # Static assets
│   ├── CNAME                    # Custom domain (agentflow.10xscale.ai)
│   ├── robots.txt
│   ├── social-card.png          # OG image
│   └── favicon.svg
│
├── scripts/                     # Build & automation scripts
│   ├── audit-frontmatter.mjs    # SEO front-matter validation
│   ├── fix-frontmatter.mjs      # Auto-fill missing SEO fields
│   └── generate-og-image.mjs    # Convert SVG card to PNG
│
├── docusaurus.config.ts         # Site configuration
├── sidebars.ts                  # Sidebar/navigation structure
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── SEO_PLAN.md                  # Full SEO strategy (Parts A–F)
├── Makefile                     # Utility targets
└── CLAUDE.md                    # This file
```

---

## Documentation Sections

Each section serves a purpose per the Divio documentation system:

| Section | Purpose | Audience | Style |
|---------|---------|----------|-------|
| **get-started** | Entry point; "hello world" in 5 min | Absolute beginners | Step-by-step |
| **concepts** | Mental models, architecture, "why" | Learning developers | Narrative, diagrams |
| **beginner** | Tutorial path, 30–60 min lessons | New to AgentFlow | Guided learning |
| **how-to** | Solve specific tasks ("How do I...") | All developers | Task-oriented |
| **reference** | API docs, parameters, return types | Experienced users | Technical spec |
| **compare** | AgentFlow vs LangGraph, CrewAI, etc. | Evaluating frameworks | Feature tables |
| **use-cases** | Production architecture examples | Team leads, architects | Case studies |
| **integrations** | FastAPI server, Next.js frontend, Postgres | Advanced users | Implementation |
| **providers** | OpenAI, Gemini, Anthropic config | DevOps, architects | Configuration |
| **troubleshooting** | Common issues & fixes | All developers | FAQ style |
| **courses** | Structured learning path | Students | Curriculum |

---

## Adding & Editing Docs

### Creating a New Page

1. **Choose the right section** — is this a tutorial, how-to, or reference?
2. **Create the file** — use kebab-case (e.g., `docs/how-to/build-rag-agent.mdx`)
3. **Add front-matter** — required SEO metadata at the top:

```markdown
---
title: "Build a RAG Agent in 10 Minutes"
description: "Step-by-step guide to creating a retrieval-augmented generation agent with AgentFlow."
keywords: ["rag", "agents", "retrieval", "tutorial"]
---

Your content here...
```

**Front-matter rules** (enforced by `npm run seo:audit`):
- `title`: 25–60 characters
- `description`: 100–160 characters
- `keywords`: array of 3–5 relevant terms

4. **Register in sidebar** — edit `sidebars.ts` to add the page to navigation
5. **Run SEO check**:
```bash
npm run seo:audit     # Lint front-matter
npm run seo:fix       # Auto-fill missing fields (idempotent)
```

### Editing Existing Pages

1. Edit the `.mdx` file in `docs/`
2. Dev server hot-reloads automatically
3. Run `npm run build` to verify no broken links
4. Check SEO: `npm run seo:audit`

### Markdown/MDX Features

- **Markdown** — standard syntax
- **MDX** — embed React components:
  ```jsx
  import CompareTable from '@site/src/components/CompareTable';
  
  <CompareTable
    frameworks={['AgentFlow', 'LangGraph', 'CrewAI']}
    features={['Checkpointing', 'Tool Calling', ...]}
  />
  ```
- **Code blocks** — syntax highlighting via Prism
- **Mermaid diagrams** — flowcharts, sequence diagrams, etc.
- **Links** — relative paths work (e.g., `../concepts/agents.mdx`)
- **Images** — place in `static/img/` and reference as `/img/filename.png`

---

## Development Tasks

### Running Checks

```bash
# Type checking
npm run typecheck

# Build (catches broken links)
npm run build

# SEO validation
npm run seo:audit

# Auto-fix SEO issues
npm run seo:fix

# Full pre-PR checklist
npm run typecheck && npm run build && npm run seo:audit
```

### SEO Scripts

```bash
# Audit all pages for front-matter compliance
npm run seo:audit

# Auto-fill missing/short SEO fields (safe, idempotent)
npm run seo:fix

# Convert SVG social card to PNG (requires 'sharp' npm package)
npm run seo:og-image
```

### Starting Dev Server

```bash
npm run start
```

Opens http://localhost:3000. Hot-reloads on file changes.

### Building for Production

```bash
npm run build
```

Output: `build/` directory with static HTML.

> **Windows + Git Bash note**: if links get mangled to `C:/Program Files/Git/...`, run from PowerShell:
> ```powershell
> $env:MSYS_NO_PATHCONV='1'
> npm run build
> ```

### Serving Built Site

```bash
npm run build
npm run serve
# → http://localhost:3000 with production build
```

---

## Configuration

### `docusaurus.config.ts`
Master configuration:
- `siteUrl` — production URL (default: `https://agentflow.10xscale.ai`)
- `baseUrl` — path prefix (default: `/`)
- `title`, `tagline`, `favicon`
- Analytics IDs (Google Analytics, Microsoft Clarity)
- Search config

### `sidebars.ts`
Navigation structure. Controls:
- Section order
- Doc nesting
- Links, dropdowns, custom items

Edit this to reorganize or add pages.

### Environment Variables

Used during build:

| Var | Default | Purpose |
|-----|---------|---------|
| `SITE_URL` | `https://agentflow.10xscale.ai` | Site domain |
| `BASE_URL` | `/` | Path prefix |
| `GOOGLE_ANALYTICS_ID` | (none) | GA tracking |
| `MICROSOFT_CLARITY_ID` | (none) | Session replay |
| `GITHUB_REPOSITORY_OWNER` | `10xHub` | GitHub org |
| `GITHUB_REPOSITORY` | (none) | Repo name (org/repo) |

Set these in `.env` locally or as GitHub secrets for CI/CD.

---

## Deployment

### Automatic (GitHub Pages)

1. Push to `main` branch
2. `.github/workflows/deploy.yml` triggers
3. Site builds and deploys to `gh-pages` branch
4. Live at https://agentflow.10xscale.ai in ~2 min

### Manual Build & Deploy

```bash
# Build
npm run build

# Verify locally
npm run serve

# Push to gh-pages branch manually (if needed)
git add -A && git commit -m "docs: update content"
git push origin main
# → CI workflow takes it from here
```

### Custom Domain

Domain: **agentflow.10xscale.ai**  
CNAME file: `static/CNAME`  
GitHub Pages settings: configured for custom domain

---

## Search & Discoverability

### Local Search
- Powered by `@easyops-cn/docusaurus-search-local`
- Indexes all `.mdx` files automatically
- Searchable by title, headings, content, keywords

### SEO Checklist

Before merging:

1. **Front-matter** — title, description, keywords present
   ```bash
   npm run seo:audit
   ```

2. **Links** — no broken internal/external links
   ```bash
   npm run build  # throws on broken links
   ```

3. **Type safety** — no TypeScript errors
   ```bash
   npm run typecheck
   ```

4. **Content quality**:
   - Title: 25–60 characters
   - Description: 100–160 characters (used for meta tags)
   - At least one H1 heading
   - Clear structure (H2, H3 hierarchy)

---

## Contributing Guidelines

### PR Workflow

1. **Create a branch** from `main`
2. **Edit content** in `docs/` or `blog/`
3. **Run checks**:
   ```bash
   npm run typecheck
   npm run build
   npm run seo:audit
   npm run seo:fix  # auto-fix if needed
   ```
4. **Submit PR** with description of changes
5. **Address feedback** (if any)
6. **Merge** when approved

### Commit Messages

Follow conventional commits:
- `docs: add RAG tutorial`
- `fix: correct typo in concepts`
- `chore: update sidebar structure`
- `style: improve code block styling`

### Code Style

- **TypeScript** — strict mode enabled in `tsconfig.json`
- **Formatting** — follow existing style (no Prettier enforced, but be consistent)
- **Components** — place in `src/components/`, export in barrel file
- **MDX** — use components sparingly; prioritize markdown

---

## Working with Content

### Best Practices

1. **One idea per page** — focused, achievable scope
2. **Clear navigation** — relate pages via sidebars + breadcrumbs
3. **Show, don't tell** — code examples over abstract explanation
4. **Update references** — if AgentFlow API changes, update docs
5. **Link liberally** — related concepts, API docs, examples

### Reusing Content

- **Imports** — import components or MDX snippets:
  ```jsx
  import GetStartedExample from './examples/get-started.mdx';
  
  <GetStartedExample />
  ```
- **Shared components** — `src/components/` for FAQ, compare tables, etc.

### Version Management

Currently single version (no versioned docs). If AgentFlow releases major versions:
1. Enable Docusaurus versioning in `docusaurus.config.ts`
2. Tag docs with version numbers
3. Create version-specific sidebar routes

---

## Analytics & Monitoring

### Google Analytics
- If `GOOGLE_ANALYTICS_ID` env var is set, GA4 tracking is enabled
- Track page views, user interactions, etc.
- Dashboard: Google Analytics admin console

### Microsoft Clarity
- If `MICROSOFT_CLARITY_ID` env var is set, session replay is enabled
- Heatmaps, user sessions, scroll depth
- Dashboard: Clarity admin console

### RSS Feed
Blog RSS available at `/blog/rss.xml` (auto-generated).

---

## Troubleshooting

### Build Fails with Broken Links
```bash
npm run build  # shows which links are broken
```
Fix broken links in `.mdx` files (relative paths must be correct).

### npm start hangs or slow
```bash
npm run clear   # clear Docusaurus cache
npm install     # reinstall node_modules
npm run start
```

### SEO audit fails
```bash
npm run seo:fix  # auto-fix common issues
npm run seo:audit  # see remaining issues
```

### Sidebar not updating
- Edit `sidebars.ts`
- Dev server auto-reloads, but sometimes needs `npm run clear` + restart

### Windows path issues (Git Bash)
Set env var before build:
```bash
export MSYS_NO_PATHCONV=1
npm run build
```
Or just use PowerShell.

---

## Related Repos

- [**10xHub/Agentflow**](https://github.com/10xHub/Agentflow) — Python library
- [**@10xscale/agentflow-client**](https://www.npmjs.com/package/@10xscale/agentflow-client) — TypeScript client SDK
- [**agentflow-cli**](https://github.com/10xHub/agentflow-cli) — CLI tools (`agentflow init`, `agentflow build`, etc.)

---

## Key Files at a Glance

| File | Purpose |
|------|---------|
| `docusaurus.config.ts` | Site config (URL, title, search, analytics) |
| `sidebars.ts` | Navigation structure |
| `SEO_PLAN.md` | Full SEO strategy & optimization roadmap |
| `.github/workflows/deploy.yml` | CI/CD pipeline (auto-deploy on push to main) |
| `scripts/audit-frontmatter.mjs` | Validates SEO front-matter |
| `scripts/fix-frontmatter.mjs` | Auto-fills missing SEO fields |
| `scripts/generate-og-image.mjs` | Creates social sharing images |

---

## Questions?

- **Docusaurus docs**: https://docusaurus.io
- **SEO guidelines**: See `SEO_PLAN.md` for full strategy
- **Markdown help**: https://docusaurus.io/docs/markdown-features
- **Contributing**: Check GitHub Issues and open PRs for ongoing work

---
**Docusaurus**: 3.8.1 | **Node**: >= 20.0
