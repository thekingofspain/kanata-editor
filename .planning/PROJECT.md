# Project: kanata-editor

**Project Code:** KANATA
**Project Title:** kanata-editor
**Milestone:** v1.0.0

---

## Core Value

A Visio-like keyboard layout editor enabling keyboard enthusiasts and custom keyboard builders to visually design, edit, and export custom keyboard layouts with an intuitive drag-and-drop interface. Core differentiators: kanata firmware native export, rotation-aware snap-to-grid, and flexible grouping without mandatory row semantics.

---

## Context

**Type:** Single Page Application (SPA) — Web Application  
**No backend dependency** — all work happens in the browser  
**Level:** 2 (Full PRD with Architecture)  

**Phase 1 (Analysis)** completed with a product brief covering:
- Market research: keyboard editor landscape
- User personas: Layout Explorer, Visual Planner, First-Time Builder
- Competitive analysis: 9 tools compared
- Value proposition refinement: 5 core differentiators
- Technical constraint analysis: data models, grid system, export formats

---

## Tech Stack (Deferred)

The following decisions are **deferred** to Phase 3 (Implementation Planning):
- UI framework (React / Vue / Svelte / Solid / vanilla TypeScript)
- State management approach
- Build tool (Vite / Webpack / Rollup)
- Testing framework
- SVG rendering approach

**Known constraints:**
- TypeScript SPA
- SVG-native canvas
- No backend dependency
- Modern browser support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Must handle 100+ keys without performance degradation

---

## Out of Scope (v1)

- Real-time collaboration
- Cloud save/persistence
- 3D visualization
- Key switch specification
- Firmware compilation
- Multi-layer support
- Import from existing layouts (KLE, etc.)

---

## Key Files

| File | Purpose |
|------|---------|
| `docs/product-brief-kanata-editor-2026-04-25.md` | Phase 1 analysis output |
| `docs/prd-kanata-editor-2026-04-25.md` | Phase 2 planning output (this document) |
| `docs/product-brief-kanata-editor-2026-04-25.md` | Phase 1 artifact |
| `.planning/` | GSD workflow artifacts |

---

*Last updated: 2026-04-25*