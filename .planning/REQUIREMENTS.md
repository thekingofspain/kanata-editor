# Requirements: kanata-editor

**Version:** 1.0.0  
**Date:** 2026-04-25  
**Phase:** All (v1)  

---

## Requirement ID Format

`{CATEGORY}-{NN}`

- `{CATEGORY}` = feature category (CANVAS, KEY, EXPORT, IO, etc.)
- `{NN}` = sequential number within category

---

## Functional Requirements

### Canvas Operations (CANVAS)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| CANVAS-01 | SVG-based interactive canvas renders keyboard layout | P0 | 3 |
| CANVAS-02 | Pan and zoom controls for canvas navigation | P0 | 3 |
| CANVAS-03 | Grid overlay for visual alignment (toggle) - covers entire visible canvas area | P1 | 3 |
| CANVAS-04 | Handle 100+ keys without performance degradation | P0 | 3 |
| CANVAS-05 | Responsive to window resize | P1 | 3 |
| CANVAS-06 | Mouse position displayed in grid coordinates (lower left) | P1 | 3 |

### Key Management (KEY)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| KEY-01 | Add key to canvas at specified position | P0 | 3 |
| KEY-02 | Remove key from canvas | P0 | 3 |
| KEY-03 | Select single key | P0 | 3 |
| KEY-03 | Select single key | P0 | 3 |
| KEY-04 | Multi-select keys (shift+click, drag rectangle) | P0 | 3 |
| KEY-05 | Copy selected keys to clipboard | P0 | 3 |
| KEY-06 | Paste keys from clipboard | P0 | 3 |
| KEY-07 | Delete selected keys | P0 | 3 |

### Key Positioning (POS)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| POS-01 | Drag key to reposition | P0 | 3 |
| POS-02 | Position stored in U units (1U = 19.05mm) | P0 | 3 |
| POS-03 | Position precision: 0.25U subdivisions | P0 | 3 |
| POS-04 | Snap-to-grid with 0.125U default margin | P0 | 3 |
| POS-05 | Rotation-aware snap (adjacent keys snap relative to rotated geometry) | P0 | 3 |
| POS-06 | Arrow keys for fine positioning (0.25U increments) | P1 | 3 |

### Key Resize (SIZE)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| SIZE-01 | Resize keys to standard sizes: 1U, 1.25U, 1.5U, 1.75U, 2U, 2.25U, 2.75U | P0 | 3 |
| SIZE-02 | Width and height independently adjustable | P0 | 3 |
| SIZE-03 | Maintain aspect ratio option | P1 | 3 |

### Key Rotation (ROT)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| ROT-01 | Rotate individual key around its center | P0 | 3 |
| ROT-02 | Free degree of rotation (0-360°) | P0 | 3 |
| ROT-03 | Rotation input via property panel (numeric degrees) | P0 | 3 |
| ROT-04 | Visual rotation handle on selected key | P0 | 3 |
| ROT-05 | Snap rotation to 0°, 90°, 180°, 270° (quick buttons) | P1 | 3 |

### Mirror Operation (MIRR)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| MIRR-01 | Mirror operation: copy selection with rotation inverted (+180°) | P0 | 3 |
| MIRR-02 | Offset control for mirrored copy placement | P0 | 3 |
| MIRR-03 | Mirror essential for split ergonomic keyboards | P0 | 3 |
| MIRR-04 | Keyboard shortcut: Ctrl+M | P1 | 3 |

### Grouping (GROUP)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| GROUP-01 | Group selected keys into logical unit | P0 | 3 |
| GROUP-02 | Ungroup to release contained keys | P0 | 3 |
| GROUP-03 | Move groups as single unit | P0 | 3 |
| GROUP-04 | No mandatory row semantics | P0 | 3 |
| GROUP-05 | Nested groups supported | P1 | 3 |

### Undo/Redo (UNDO)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| UNDO-01 | Undo last action (Ctrl+Z) | P1 | 3 |
| UNDO-02 | Redo last undone action (Ctrl+Y) | P1 | 3 |
| UNDO-03 | Action history maintained for session | P1 | 3 |

### Key Properties (PROP)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| PROP-01 | Key shape property: 'rect', 'rounded', 'isoEnter', 'block', 'barrel' | P0 | 3 |
| PROP-02 | Key color property (hex) | P1 | 3 |
| PROP-03 | Hardware metadata: matrix row/column assignment | P1 | 3 |
| PROP-04 | Key function metadata: keycode + behaviors | P1 | 3 |
| PROP-05 | Legend metadata: 9-position text labels with per-position colors | P1 | 3 |

### Export: SVG (EXP-SVG)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| EXP-SVG-01 | Export layout as vector SVG | P0 | 4 |
| EXP-SVG-02 | SVG includes key shapes, positions, rotations, colors | P0 | 4 |
| EXP-SVG-03 | Legends rendered as text elements in SVG | P0 | 4 |
| EXP-SVG-04 | Export completes in < 2 seconds for 100+ key layouts | P0 | 4 |

### Export: PNG (EXP-PNG)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| EXP-PNG-01 | Export layout as rasterized PNG | P1 | 4 |
| EXP-PNG-02 | Resolution configurable (1x, 2x, 4x) | P1 | 4 |
| EXP-PNG-03 | Transparent background option | P1 | 4 |

### Export: JSON (EXP-JSON)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| EXP-JSON-01 | Export layout as JSON with full metadata | P0 | 4 |
| EXP-JSON-02 | Schema matches KeyboardLayout interface | P0 | 4 |
| EXP-JSON-03 | Human-readable formatting | P1 | 4 |

### Export: kanata (EXP-KANATA)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| EXP-KANATA-01 | Generate keyboard.h with key positions and config | P0 | 4 |
| EXP-KANATA-02 | Generate rules.mk for QMK-compatible build | P0 | 4 |
| EXP-KANATA-03 | No intermediate conversion steps | P0 | 4 |

### Export: QMK (EXP-QMK)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| EXP-QMK-01 | Export as QMK keymap.json | P1 | 4 |
| EXP-QMK-02 | Map key function metadata to QMK keycodes | P1 | 4 |

### Save/Load (IO)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| IO-01 | Save layout to local JSON file | P0 | 4 |
| IO-02 | Load layout from local JSON file | P0 | 4 |
| IO-03 | LocalStorage auto-save (debounced) | P1 | 4 |
| IO-04 | LocalStorage restore on page load | P1 | 4 |
| IO-05 | JSON file validation on load | P0 | 4 |

### Layout Properties (LAYOUT)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| LAYOUT-01 | Layout name property | P1 | 3 |
| LAYOUT-02 | Author property | P1 | 3 |
| LAYOUT-03 | Created/modified timestamps | P1 | 3 |
| LAYOUT-04 | Unit size configuration (default 19.05mm) | P2 | 3 |
| LAYOUT-05 | Hardware rows/cols definition (optional) | P2 | 3 |

---

## Non-Functional Requirements

### Performance (PERF)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| PERF-01 | Handle 100+ keys without lag | P0 | 3 |
| PERF-02 | Smooth drag operations at 60fps | P0 | 3 |
| PERF-03 | Export operations < 2 seconds | P0 | 4 |
| PERF-04 | First meaningful paint < 3 seconds on 4G | P1 | 3 |

### Browser Compatibility (BROWSER)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| BROWSER-01 | Chrome 90+ support | P0 | 3 |
| BROWSER-02 | Firefox 88+ support | P0 | 3 |
| BROWSER-03 | Safari 14+ support | P0 | 3 |
| BROWSER-04 | Edge 90+ support | P0 | 3 |
| BROWSER-05 | SVG 2.0 support required | P0 | 3 |
| BROWSER-06 | LocalStorage API required | P0 | 3 |

### Accessibility (A11Y)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| A11Y-01 | All primary actions via keyboard | P1 | 3 |
| A11Y-02 | Tab navigation between keys | P1 | 3 |
| A11Y-03 | Basic ARIA labels | P2 | 3 |

### Code Quality (QUAL)

| ID | Requirement | Priority | Phase |
|----|-------------|----------|-------|
| QUAL-01 | Full TypeScript coverage | P0 | 3 |
| QUAL-02 | Strict mode, no `any` types | P0 | 3 |
| QUAL-03 | Unit test coverage for core logic | P1 | 3 |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CANVAS-01 through CANVAS-05 | Phase 3 | Pending |
| KEY-01 through KEY-07 | Phase 3 | Pending |
| POS-01 through POS-06 | Phase 3 | Pending |
| SIZE-01 through SIZE-03 | Phase 3 | Pending |
| ROT-01 through ROT-05 | Phase 3 | Pending |
| MIRR-01 through MIRR-04 | Phase 3 | Pending |
| GROUP-01 through GROUP-05 | Phase 3 | Pending |
| UNDO-01 through UNDO-03 | Phase 3 | Pending |
| PROP-01 through PROP-05 | Phase 3 | Pending |
| EXP-SVG-01 through EXP-SVG-04 | Phase 4 | Pending |
| EXP-PNG-01 through EXP-PNG-03 | Phase 4 | Pending |
| EXP-JSON-01 through EXP-JSON-03 | Phase 4 | Pending |
| EXP-KANATA-01 through EXP-KANATA-03 | Phase 4 | Pending |
| EXP-QMK-01, EXP-QMK-02 | Phase 4 | Pending |
| IO-01 through IO-05 | Phase 4 | Pending |
| LAYOUT-01 through LAYOUT-05 | Phase 3 | Pending |
| PERF-01 through PERF-04 | Phase 3 | Pending |
| BROWSER-01 through BROWSER-06 | Phase 3 | Pending |
| A11Y-01 through A11Y-03 | Phase 3 | Pending |
| QUAL-01 through QUAL-03 | Phase 3 | Pending |

**Total v1 Requirements:** 71  
**Mapped to Phase 3:** 47 (canvas, key, positioning, resize, rotation, mirror, group, undo, properties, layout, performance, browser, a11y, quality)  
**Mapped to Phase 4:** 24 (all exports, save/load)

---

*Last updated: 2026-04-25*