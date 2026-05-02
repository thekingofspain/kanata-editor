# Roadmap: kanata-editor

**Version:** 1.0.0  
**Date:** 2026-04-25  
**Granularity:** Standard  
**Project Level:** 2 (Full PRD with Architecture)  

---

## Project: kanata-editor

**Core Value:** A Visio-like keyboard layout editor for designing, editing, and exporting custom keyboard layouts with kanata firmware native support.

---

## Phases

- [x] **Phase 1: Analysis** — Market research, user personas, competitive analysis, product brief
- [x] **Phase 2: Planning** — PRD with requirements, UX specification, technical architecture
- [~] **Phase 3: Editor Core** — Canvas, key management, positioning, resize, rotation, mirror, group, properties, layout management
- [ ] **Phase 4: Export & Persistence** — SVG/PNG/JSON/kanata/QMK export, save/load, LocalStorage persistence
- [ ] **Phase 5: Polish & Testing** — Performance optimization, accessibility, unit tests, edge cases

---

## Phase Details

### Phase 1: Analysis

**Goal:** Understand market landscape, user needs, and competitive positioning to define product value.

**Depends on:** Nothing

**Requirements:** (Analysis phase — no implementation requirements)

**Success Criteria** (what must be TRUE):
1. Market research covers 9+ existing keyboard editor tools
2. At least 3 user personas defined with clear jobs-to-be-done
3. Competitive feature matrix identifies 5+ differentiators for kanata-editor
4. Product brief documents data models, grid system, and export formats
5. Out-of-scope items clearly defined for v1

**Plans:** 1 plan
- [ ] `01-01-PLAN.md` — Analysis tasks (product brief creation)

**Status:** ✓ Complete (2026-04-25)

---

### Phase 2: Planning

**Goal:** Comprehensive product specification with functional/non-functional requirements, user stories, acceptance criteria, and UX interaction patterns.

**Depends on:** Phase 1

**Requirements:** (Planning phase — no implementation requirements)

**Success Criteria** (what must be TRUE):
1. PRD contains complete functional requirements with P0/P1/P2 priorities
2. All 71 v1 requirements identified and categorized
3. Non-functional requirements cover performance, browser compatibility, accessibility
4. At least 10 user stories covering primary and secondary personas
5. Acceptance criteria provides testable conditions for all P0 requirements
6. UX specification defines layout structure, visual design, interaction patterns, keyboard shortcuts
7. Phase 3 and Phase 4 requirements mapped correctly

**Plans:** 1 plan
- [x] `02-01-PLAN.md` — PRD creation and GSD scaffold

**Status:** ✓ Complete (2026-04-25)

---

### Phase 3: Editor Core

**Goal:** Fully functional keyboard layout canvas with all primary editing operations.

**Depends on:** Phase 2

**Requirements:** CANVAS-01, CANVAS-02, CANVAS-04, KEY-01 through KEY-07, POS-01 through POS-06, SIZE-01 through SIZE-03, ROT-01 through ROT-04, MIRR-01 through MIRR-04, GROUP-01 through GROUP-05, UNDO-01 through UNDO-03, PROP-01 through PROP-05, LAYOUT-01 through LAYOUT-03, PERF-01, PERF-02, BROWSER-01 through BROWSER-06, A11Y-01, A11Y-02, QUAL-01, QUAL-02

**Success Criteria** (what must be TRUE):
1. User can add, position, resize, and rotate individual keys on canvas
2. User can select single or multiple keys with shift+click and drag rectangle
3. Copy/paste creates independent duplicate keys
4. Mirror operation creates copy with 180° rotation inversion
5. Group/ungroup operations work with no mandatory row semantics
6. Undo/redo works for all operations in session
7. Key properties (shape, color, hardware, function, legend) editable via properties panel
8. 100+ keys render and drag at 60fps without lag
9. Canvas responsive to window resize
10. All primary actions accessible via keyboard

**Plans:** TBD

**Status:** In Progress (Core canvas + keyboard shortcuts implemented, ARIA remaining)

---

### Phase 4: Export & Persistence

**Goal:** Complete export pipeline and save/load functionality.

**Depends on:** Phase 3

**Requirements:** CANVAS-03, CANVAS-05, EXP-SVG-01 through EXP-SVG-04, EXP-PNG-01 through EXP-PNG-03, EXP-JSON-01 through EXP-JSON-03, EXP-KANATA-01 through EXP-KANATA-03, EXP-QMK-01, EXP-QMK-02, IO-01 through IO-05, LAYOUT-04, LAYOUT-05, PERF-03, PERF-04, QUAL-03

**Success Criteria** (what must be TRUE):
1. SVG export produces clean vector output parseable by standard tools
2. PNG export with configurable resolution and transparent background
3. JSON export preserves all layout data including metadata
4. kanata config export generates valid keyboard.h and rules.mk
5. QMK keymap export generates valid keymap.json
6. File save creates valid JSON file
7. File load restores exact layout state
8. LocalStorage auto-saves and restores on page load
9. Export completes in < 2 seconds for 100+ key layouts
10. First meaningful paint < 3 seconds

**Plans:** TBD

**Status:** Not started

---

### Phase 5: Polish & Testing

**Goal:** Performance optimization, accessibility improvements, unit test coverage, and edge case handling.

**Depends on:** Phase 4

**Requirements:** A11Y-03, remaining items from earlier phases

**Success Criteria** (what must be TRUE):
1. Basic ARIA labels present on all interactive elements
2. Core logic has unit test coverage
3. Error states handled gracefully (invalid JSON, LocalStorage full, etc.)
4. No console errors in normal operation
5. Layouts can be exported and re-imported without data loss

**Plans:** TBD

**Status:** Not started

---

## Progress Table

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 1 | Analysis | 1/1 | ✓ Complete | 2026-04-25 |
| 2 | Planning | 1/1 | ✓ Complete | 2026-04-25 |
| 3 | Editor Core | 1/? | In Progress | — |
| 4 | Export & Persistence | 0/? | Not started | — |
| 5 | Polish & Testing | 0/? | Not started | — |

---

## Coverage

✓ Phase 1: Complete (product brief at `docs/product-brief-kanata-editor-2026-04-25.md`)  
✓ Phase 2: Complete (PRD at `docs/prd-kanata-editor-2026-04-25.md`)  
○ Phase 3: 47 requirements mapped  
○ Phase 4: 24 requirements mapped  
○ Phase 5: 0 requirements mapped (deferred polish items)

**Total:** 71 v1 requirements across 5 phases

---

*Last updated: 2026-04-25*