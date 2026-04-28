# Phase 3 Context: Editor Core

**Phase:** 3  
**Goal:** Fully functional keyboard layout canvas with all primary editing operations  
**Status:** In Progress (canvas core implemented)

---

## Current Implementation State

### Completed (direct implementation)

- **Canvas.tsx**: SVG-based canvas with base-1 coordinate system
  - Base-1 coordinate system (1U = 1 key width = 19.05mm)
  - SVG transform for zoom/pan: `translate(pan) scale(19.05 * zoom)`
  - Screen-to-canvas coordinate conversion
  - Mouse position display in U units

- **Key selection**: 
  - Click to select single key
  - Shift+Click to toggle key in/out of selection
  - Drag rectangle to select multiple keys
  - Escape/click empty to deselect

- **Pan**:
  - Arrow keys when nothing selected
  - Middle mouse button or Alt+click drag
  - Mouse wheel without Ctrl

- **Zoom**:
  - Fit button calculates zoom to fit all keys in viewport
  - +/- keys for zoom in/out
  - 0 key to reset zoom to 100%
  - Ctrl+mouse wheel

- **Key movement**:
  - Arrow keys move selected keys
  - Movement distance proportional to key dimension (width for horizontal, height for vertical)
  - Shift modifier for fine control (0.25x)

- **Keyboard shortcuts** documented in AGENTS.md

---

## Remaining Requirements (from REQUIREMENTS.md)

### CANVAS
- [ ] CANVAS-03: Grid overlay (toggle) - covers entire visible canvas area

### KEY
- [x] KEY-01: Add key to canvas at specified position (via toolbar)
- [x] KEY-02: Remove key from canvas (via toolbar)
- [x] KEY-03: Select single key
- [x] KEY-04: Multi-select keys (shift+click, drag rectangle)
- [x] KEY-05: Copy selected keys to clipboard
- [x] KEY-06: Paste keys from clipboard
- [x] KEY-07: Delete selected keys

### POS (Positioning)
- [x] POS-01: Drag key to reposition
- [x] POS-02: Position stored in U units (1U = 19.05mm)
- [x] POS-03: Position precision: 0.25U subdivisions
- [ ] POS-04: Snap-to-grid with 0.125U default margin
- [ ] POS-05: Rotation-aware snap
- [x] POS-06: Arrow keys for fine positioning (0.25U increments)

### SIZE (Resize)
- [x] SIZE-01: Resize to standard sizes (via toolbar dropdown)
- [x] SIZE-02: Width and height independently adjustable
- [ ] SIZE-03: Maintain aspect ratio option

### ROT (Rotation)
- [x] ROT-01: Rotate individual key around its center
- [x] ROT-02: Free degree of rotation (0-360°)
- [x] ROT-03: Rotation input via property panel
- [x] ROT-04: Visual rotation handle on selected key
- [ ] ROT-05: Snap rotation to 0°, 90°, 180°, 270°

### MIRR (Mirror)
- [x] MIRR-01: Mirror operation: copy selection with rotation inverted (+180°)
- [x] MIRR-02: Offset control for mirrored copy placement
- [x] MIRR-03: Mirror essential for split ergonomic keyboards
- [ ] MIRR-04: Keyboard shortcut: Ctrl+M

### GROUP
- [ ] GROUP-01: Group selected keys into logical unit
- [ ] GROUP-02: Ungroup to release contained keys
- [ ] GROUP-03: Move groups as single unit
- [x] GROUP-04: No mandatory row semantics
- [ ] GROUP-05: Nested groups supported

### UNDO
- [ ] UNDO-01: Undo last action (Ctrl+Z)
- [ ] UNDO-02: Redo last undone action (Ctrl+Y)
- [ ] UNDO-03: Action history maintained for session

### PROP (Properties)
- [x] PROP-01: Key shape property (rect, rounded, isoEnter, block, barrel)
- [ ] PROP-02: Key color property (hex)
- [ ] PROP-03: Hardware metadata: matrix row/column assignment
- [ ] PROP-04: Key function metadata: keycode + behaviors
- [ ] PROP-05: Legend metadata: 9-position text labels

### LAYOUT
- [ ] LAYOUT-01: Layout name property
- [ ] LAYOUT-02: Author property
- [ ] LAYOUT-03: Created/modified timestamps
- [x] LAYOUT-04: Unit size configuration (default 19.05mm)
- [ ] LAYOUT-05: Hardware rows/cols definition

---

## Architecture

### Files
- `src/components/Canvas.tsx` - Main canvas with SVG rendering
- `src/components/Toolbar.tsx` - Toolbar with actions
- `src/store/index.ts` - Zustand state management
- `src/types/index.ts` - TypeScript interfaces
- `src/types/presets.ts` - Keyboard presets
- `src/index.css` - Global styles

### Dependencies
- React 18
- Zustand (state management)
- TypeScript

---

## Questions for Discussion

1. Which features to prioritize next?
2. How to implement undo/redo - custom solution or library?
3. Property panel - where should it live (sidebar/modal)?
4. Group implementation approach?

---

*Context created: 2026-04-28*