# Product Requirements Document (PRD): kanata-editor

**Project:** kanata-editor  
**Version:** 2.0.0  
**Date:** 2026-04-25  
**BMAD Phase:** 2 - Planning  
**Status:** Complete  
**Authors:** kanata-editor project team  

---

## 1. Project Overview

### 1.1 Project Name
kanata-editor

### 1.2 Project Type
Single Page Application (SPA) — Web Application (no backend dependency)

### 1.3 Core Value Proposition
A Visio-like keyboard layout editor enabling keyboard enthusiasts and custom keyboard builders to visually design, edit, and export custom keyboard layouts with an intuitive drag-and-drop interface. Native support for kanata firmware export, rotation-aware snap-to-grid, and flexible grouping without mandatory row semantics.

### 1.4 Target Users
- Keyboard enthusiasts designing custom keyboard layouts
- Custom keyboard builders who need to visualize and share layouts
- Mechanical keyboard hobbyists planning key arrangements
- Keyboard layout designers for ortholinear, split, and ergonomic keyboards
- Keycap set designers creating mockup renders for group buys
- First-time builders exploring layout options

### 1.5 Project Level
**Level 2 (Full PRD with Architecture)** — Detailed requirements, data models, UX specs, and acceptance criteria for a complete, implementable specification.

### 1.6 Out of Scope (v1)
- Real-time collaboration
- Cloud save/persistence
- 3D visualization
- Key switch specification
- Firmware compilation
- Multi-layer support (defer to v2)
- Import from existing layouts (defer to v2)

---

## 2. Functional Requirements

### 2.1 Core Editor Features

#### FR-001: Visual Canvas
- **Description:** SVG-based interactive canvas for keyboard layout design
- **Details:**
  - Render keyboard layout as scalable SVG elements
  - Support pan and zoom controls
  - Display grid overlay for visual alignment (optional toggle)
  - Canvas must handle 100+ keys without performance degradation
  - Responsive to window resize
- **Priority:** P0 (Must Have)

#### FR-002: Key Management
- **FR-002a:** Add key to canvas at specified position
- **FR-002b:** Remove key from canvas
- **FR-002c:** Select single key
- **FR-002d:** Select multiple keys (shift+click for additive, drag rectangle for area)
- **FR-002e:** Copy selected key(s)
- **FR-002f:** Paste copied key(s) at cursor position
- **FR-002g:** Delete selected key(s)
- **Priority:** P0

#### FR-003: Key Positioning
- **FR-003a:** Drag key to reposition
- **FR-003b:** Position stored in U units (1U = 19.05mm standard)
- **FR-003c:** Position precision: 0.25U subdivisions
- **FR-003d:** Snap-to-grid with 0.125U default margin between keys
- **FR-003e:** Rotation-aware snap: when a rotated key is placed, adjacent keys snap relative to the rotated geometry
- **Priority:** P0

#### FR-004: Key Resize
- **Description:** Resize keys to standard unit sizes
- **Details:**
  - Support sizes: 1U, 1.25U, 1.5U, 1.75U, 2U, 2.25U, 2.75U
  - Resize via property panel or keyboard shortcut
  - Width and height independently adjustable
  - Maintain aspect ratio option (toggle)
- **Priority:** P0

#### FR-005: Key Rotation
- **FR-005a:** Rotate individual key around its center
- **FR-005b:** Free degree of rotation (0-360°)
- **FR-005c:** Rotation input via property panel (numeric degrees) or drag handle
- **FR-005d:** Visual rotation indicator on selected key
- **Priority:** P0

#### FR-006: Mirror Operation (Copy + Invert Rotation)
- **FR-006a:** Select key(s), trigger mirror operation
- **FR-006b:** Create copy of selection with rotation inverted (add 180° to each key's rotation)
- **FR-006c:** Position mirrored copy offset from original (user-controlled offset)
- **FR-006d:** Mirror operation essential for split ergonomic keyboards (Ferris, Sofle, etc.)
- **Priority:** P0

#### FR-007: Group/Ungroup
- **FR-007a:** Group selected keys into a logical unit
- **FR-007b:** Ungroup to release contained keys
- **FR-007c:** Move groups as single units
- **FR-007d:** No mandatory row semantics — groups are purely visual/organizational
- **FR-007e:** Group metadata: id, name, keyIds[]
- **Priority:** P0

#### FR-008: Undo/Redo
- **FR-008a:** Undo last action (Ctrl+Z)
- **FR-008b:** Redo last undone action (Ctrl+Y)
- **FR-008c:** Action history maintained for session duration
- **Priority:** P1 (Should Have)

### 2.2 Key Properties

#### FR-009: Key Shape
- **Description:** Key shape determines visual rendering
- **Details:**
  - Shapes: 'rect', 'rounded', 'isoEnter', 'block', 'barrel'
  - Shape stored as property on each key
  - Different shapes render with different SVG paths
- **Priority:** P0

#### FR-010: Key Color
- **Description:** Fill color for key
- **Details:**
  - Color stored as hex string
  - Default color configurable
  - Color editable via property panel
- **Priority:** P1 (Should Have)

#### FR-011: Hardware Metadata (Per Key, Optional)
- **FR-011a:** Matrix row assignment
- **FR-011b:** Matrix column assignment
- **FR-011c:** Matrix pin assignment
- **FR-011d:** Hardware metadata optional — user decides abstraction level
- **Priority:** P1

#### FR-012: Key Function Metadata (Per Key)
- **FR-012a:** Keycode assignment (string)
- **FR-012b:** Behavior definitions (array of strings for TAP/HOLD behaviors)
- **Priority:** P1

#### FR-013: Legend Metadata (Per Key)
- **FR-013a:** Text labels in 9-position grid (top, center, bottom, front faces)
- **FR-013b:** Per-position custom colors
- **FR-013c:** Font size configuration
- **Priority:** P1

### 2.3 Export Capabilities

#### FR-014: SVG Export
- **Description:** Export layout as vector SVG
- **Details:**
  - Clean SVG output parseable by standard tools
  - Includes key shapes, positions, rotations, colors
  - Legends rendered as text elements
  - Export completes in < 2 seconds for 100+ key layouts
- **Priority:** P0

#### FR-015: PNG Export
- **Description:** Export layout as rasterized PNG
- **Details:**
  - Resolution configurable (1x, 2x, 4x)
  - Transparent background option
  - Export completes in < 2 seconds
- **Priority:** P1

#### FR-016: JSON Export (Native Format)
- **Description:** Export layout as JSON with full metadata
- **Details:**
  - Complete layout data including all keys, groups, metadata
  - Schema matches KeyboardLayout interface
  - Human-readable formatting
- **Priority:** P0

#### FR-017: kanata Config Export
- **Description:** Export directly to kanata firmware files
- **Details:**
  - Generate `keyboard.h` with key positions and config
  - Generate `rules.mk` for QMK-compatible build
  - Address growing kanata user base
  - No intermediate conversion steps required
- **Priority:** P0

#### FR-018: QMK Keymap Export
- **Description:** Export as QMK keymap.json
- **Details:**
  - Generate keymap.json for QMK Configurator import
  - Map key function metadata to QMK keycodes
- **Priority:** P1

### 2.4 Save/Load

#### FR-019: LocalStorage Persistence
- **Description:** Auto-save layout to browser LocalStorage
- **Details:**
  - Save on every change (debounced)
  - Restore on page load
  - Clear/reset option
- **Priority:** P1

#### FR-020: JSON File Save
- **Description:** Save layout to local JSON file
- **Details:**
  - File picker dialog
  - Save current layout as .json file
- **Priority:** P0

#### FR-021: JSON File Load
- **Description:** Load layout from local JSON file
- **Details:**
  - File picker dialog
  - Validate JSON schema on load
  - Replace current layout
- **Priority:** P0

### 2.5 Layout-Level Properties

#### FR-022: Layout Metadata
- **Description:** Layout-level information
- **Details:**
  - Layout name
  - Author name
  - Created timestamp
  - Modified timestamp
- **Priority:** P1

#### FR-023: Hardware Definition (Optional)
- **Description:** Hardware-level configuration
- **Details:**
  - Rows (optional — only if needed)
  - Cols (optional)
  - Unit size (default: 19.05mm for 1U)
- **Priority:** P2 (Nice to Have)

---

## 3. Non-Functional Requirements

### 3.1 Performance

#### NFR-001: Canvas Performance
- **Target:** Handle 100+ keys without lag
- **Measurement:** Smooth drag operations at 60fps
- **Constraint:** Export operations must complete in < 2 seconds

#### NFR-002: Load Time
- **Target:** First meaningful paint < 3 seconds on 4G connection
- **Measurement:** Lighthouse performance score ≥ 80

#### NFR-003: Bundle Size
- **Target:** JavaScript bundle < 500KB gzipped
- **Measurement:** Build output analysis

### 3.2 Browser Compatibility

#### NFR-004: Browser Support
- **Supported:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Requirements:**
  - SVG 2.0 support required
  - LocalStorage API required
  - Modern ES2020+ JavaScript

### 3.3 Accessibility

#### NFR-005: Keyboard Navigation
- **Requirement:** All primary actions accessible via keyboard
- **Details:**
  - Tab navigation between keys
  - Arrow keys for fine positioning
  - Enter to select/confirm
  - Escape to cancel/deselect

#### NFR-006: Screen Reader Support
- **Requirement:** Basic ARIA labels for interactive elements
- **Details:**
  - Key property announcements
  - Canvas state announcements

### 3.4 Technical Constraints

#### NFR-007: Architecture
- **Requirement:** Single Page Application (SPA), no backend dependency
- **Framework:** TypeScript SPA (framework choice deferred to implementation phase)
- **Rendering:** SVG-native canvas (like Figma/Visio)

#### NFR-008: PWA Capability
- **Requirement:** App should be capable of offline use
- **Details:** Service worker for offline caching (PWA manifest)

### 3.5 Code Quality

#### NFR-009: Type Safety
- **Requirement:** Full TypeScript coverage
- **Details:** Strict mode enabled, no `any` types

#### NFR-010: Testing
- **Requirement:** Unit test coverage for core logic
- **Target:** Core canvas operations, geometry calculations, export generators

---

## 4. User Stories

### 4.1 Primary Persona: The Keyboard Enthusiast ("Layout Explorer")

#### US-001: Create Basic Layout
**As a** keyboard enthusiast  
**I want to** place keys on a canvas and see them instantly  
**So that** I can quickly visualize layout ideas before committing to a build.

**Acceptance Criteria:**
- [ ] User can click "Add Key" button to add a 1U key at default position
- [ ] Key appears immediately on canvas after click
- [ ] Key renders with correct shape and size
- [ ] User can drag key to reposition it
- [ ] Position snaps to nearest 0.25U grid

#### US-002: Copy and Mirror for Split Layout
**As a** keyboard enthusiast  
**I want to** copy a cluster of keys and flip them with correct key orientation  
**So that** I can create split keyboard layouts intuitively without manual rotation.

**Acceptance Criteria:**
- [ ] User can select multiple keys with shift+click
- [ ] User can trigger mirror operation from toolbar or Ctrl+M
- [ ] Mirrored copy has rotation inverted (180° added to each key)
- [ ] User can position mirrored copy with offset control
- [ ] Original and mirrored copies are independent

#### US-003: Export to kanata
**As a** kanata user  
**I want to** export my layout directly to kanata config files  
**So that** I can use the layout in my keyboard firmware without intermediate conversion.

**Acceptance Criteria:**
- [ ] User can select "Export to kanata" from export menu
- [ ] Export generates valid `keyboard.h` file
- [ ] Export generates valid `rules.mk` file
- [ ] Files contain correct key positions and configuration
- [ ] Export completes in < 2 seconds

#### US-004: Save and Load Layouts
**As a** keyboard enthusiast  
**I want to** save my layout to a file and load it later  
**So that** I can share layouts with the community and return to them later.

**Acceptance Criteria:**
- [ ] User can save layout to JSON file via File > Save
- [ ] User can load layout from JSON file via File > Open
- [ ] Loaded layout exactly matches saved state (keys, properties, groups)
- [ ] LocalStorage auto-save protects against browser crash

#### US-005: Resize and Rotate Keys
**As a** keyboard enthusiast  
**I want to** resize keys to standard sizes and rotate them freely  
**So that** I can create non-standard layouts like Alice, ortholinear, and split keyboards.

**Acceptance Criteria:**
- [ ] User can select a key and choose resize from 1U, 1.25U, 1.5U, 1.75U, 2U, 2.25U, 2.75U
- [ ] Key visually updates to new size immediately
- [ ] User can rotate key by dragging handle or entering degrees
- [ ] Rotation origin is key center
- [ ] Rotation-aware snap positions adjacent keys correctly relative to rotated key

### 4.2 Secondary Persona: The Keycap Set Designer ("Visual Planner")

#### US-006: Create Layout Mockup
**As a** keycap set designer  
**I want to** visualize key arrangement with legends for different keycap sets  
**So that** I can create accurate mockup renders for group buys.

**Acceptance Criteria:**
- [ ] User can add text legends to keys (top, center, bottom, front positions)
- [ ] User can set different colors for each legend position
- [ ] User can adjust font size for legends
- [ ] Legend renders correctly in SVG/PNG export

#### US-007: Export Clean SVG for Manufacturing
**As a** keycap set designer  
**I want to** export clean SVGs for manufacturing files and documentation  
**So that** I can provide production-ready files to manufacturers.

**Acceptance Criteria:**
- [ ] SVG export produces clean vector output
- [ ] SVG contains all key shapes, positions, rotations
- [ ] SVG is parseable by standard vector tools
- [ ] Export handles 100+ key layouts without clipping

#### US-008: Design Non-Standard Layouts
**As a** keycap set designer  
**I want to** design for Alice, ortholinear, and split ergo layouts  
**So that** I can support the full range of keyboard community layouts.

**Acceptance Criteria:**
- [ ] Keys can be positioned freely without mandatory row structure
- [ ] Groups can be created without row semantics
- [ ] Mirror operation supports split keyboard patterns
- [ ] Rotation-aware snap handles angled layouts

### 4.3 Tertiary Persona: The Newcomer ("First-Time Builder")

#### US-009: Learn Layout Options
**As a** first-time builder  
**I want to** explore different layout sizes (60%, 65%, TKL) visually  
**So that** I can learn what layout fits my needs before buying.

**Acceptance Criteria:**
- [ ] User can quickly add common layout templates
- [ ] Canvas shows visual feedback for layout structure
- [ ] No learning curve for drag-drop interaction
- [ ] Get started without command line

#### US-010: Get Visual Feedback
**As a** first-time builder  
**I want to** see my layout changes instantly  
**So that** I can iterate rapidly without waiting for compilation or refresh.

**Acceptance Criteria:**
- [ ] Canvas updates immediately on every change
- [ ] No perceptible lag during drag operations
- [ ] Export provides instant visual output

---

## 5. Acceptance Criteria

### 5.1 Core Editor Operations

| ID | Criterion | Test Method |
|----|-----------|-------------|
| AC-001 | User can add a key to canvas | Create layout, add key, verify key exists in key array |
| AC-002 | User can drag key to reposition | Drag key, verify x,y coordinates updated |
| AC-003 | Position snaps to 0.25U grid | Place key, verify x,y are multiples of 0.25 |
| AC-004 | Keys snap rotation-aware | Place rotated key, verify adjacent keys snap correctly |
| AC-005 | Key resize to all standard sizes works | Resize key, verify width/height match selected size |
| AC-006 | Key rotation works 0-360° | Rotate key, verify rotation property and visual update |
| AC-007 | Copy/paste creates independent duplicate | Copy key, paste, verify duplicate with new id |
| AC-008 | Mirror operation inverts rotation | Mirror key with 90° rotation, verify 270° on copy |
| AC-009 | Group moves all keys together | Group keys, drag group, verify all positions update |
| AC-010 | Ungroup releases keys to independent | Ungroup keys, verify all keys have individual positions |

### 5.2 Export Operations

| ID | Criterion | Test Method |
|----|-----------|-------------|
| AC-011 | SVG export produces valid SVG | Export, open in browser, verify renders |
| AC-012 | PNG export produces raster image | Export 2x, verify PNG dimensions and content |
| AC-013 | JSON export contains full metadata | Export, parse JSON, verify all key properties |
| AC-014 | kanata export generates valid files | Export, verify file structure matches kanata spec |
| AC-015 | QMK export generates valid keymap.json | Export, verify JSON schema matches QMK format |
| AC-016 | Export completes in < 2 seconds | Time export of 100-key layout |

### 5.3 Save/Load Operations

| ID | Criterion | Test Method |
|----|-----------|-------------|
| AC-017 | Save to file creates JSON file | Save, verify file created with JSON content |
| AC-018 | Load from file restores exact state | Save, clear, load, verify all keys match |
| AC-019 | LocalStorage persists across refresh | Add keys, refresh, verify keys restored |

### 5.4 Performance

| ID | Criterion | Test Method |
|----|-----------|-------------|
| AC-020 | 100 keys render without lag | Add 100 keys, verify drag is smooth |
| AC-021 | Drag operations at 60fps | Measure frame rate during drag |
| AC-022 | First paint < 3 seconds | Lighthouse performance audit |

### 5.5 Data Integrity

| ID | Criterion | Test Method |
|----|-----------|-------------|
| AC-023 | Key id is unique | Verify all key ids are unique |
| AC-024 | Layout id is unique | Verify layout id preserved across save/load |
| AC-025 | Timestamps updated on modify | Modify layout, verify modified timestamp updated |

---

## 6. UX Specification

### 6.1 Layout Structure

#### 6.1.1 Main Layout Regions

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER BAR                                                       │
│  [Logo] [File Menu] [Edit Menu] [View Menu] [Export Menu] [Help]   │
├───────────┬─────────────────────────────────────────────────────┤
│           │                                                          │
│  TOOLBAR  │              CANVAS AREA                                │
│  (Left)   │              (Main workspace)                           │
│           │                                                          │
│  Tools:   │              ┌──────────────────────────┐              │
│  - Select │              │                          │              │
│  - Add Key│              │      SVG Canvas          │              │
│  - Delete │              │      (Keyboard Layout)   │              │
│  - Copy   │              │                          │              │
│  - Paste  │              └──────────────────────────┘              │
│  - Mirror │                                                          │
│  - Group  │                                                          │
│  - Ungroup│                                                          │
│           │                                                          │
├───────────┴─────────────────────────────────────────────────────┤
│  STATUS BAR                                                       │
│  [Zoom: 100%] [Keys: 66] [Selection: 1 key] [Modified]            │
└─────────────────────────────────────────────────────────────────┘

Right Panel (collapsible):
┌──────────────────────────────┐
│  PROPERTIES PANEL             │
│                               │
│  Key Properties:               │
│  - Shape: [dropdown]           │
│  - Width: [1U ▼]               │
│  - Height: [1U ▼]              │
│  - Rotation: [0° ____]         │
│  - Color: [■ ____]             │
│                               │
│  Hardware:                    │
│  - Matrix Row: [__]           │
│  - Matrix Col: [__]           │
│                               │
│  Function:                    │
│  - Keycode: [__]              │
│  - Behaviors: [__]            │
│                               │
│  Legend:                      │
│  - Top: [__]                  │
│  - Center: [__]               │
│  - Bottom: [__]               │
│  - Front: [__]                │
└──────────────────────────────┘
```

#### 6.1.2 Responsive Behavior
- **Desktop (>1200px):** Full layout with left toolbar and right properties panel
- **Tablet (768-1200px):** Collapsible right panel, compact toolbar
- **Mobile (<768px):** Not primary target — show "Desktop recommended" message

### 6.2 Visual Design

#### 6.2.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-canvas` | #1a1a2e | Canvas background (dark theme) |
| `--bg-toolbar` | #16213e | Toolbar and panel backgrounds |
| `--bg-surface` | #0f3460 | Cards, elevated surfaces |
| `--accent-primary` | #e94560 | Primary actions, selected state |
| `--accent-secondary` | #533483 | Secondary actions, hover states |
| `--text-primary` | #ffffff | Primary text |
| `--text-secondary` | #a0a0a0 | Secondary text, labels |
| `--text-muted` | #606060 | Disabled, placeholder text |
| `--border` | #2a2a4a | Borders, dividers |
| `--key-default` | #3a3a5c | Default key fill |
| `--key-selected` | #e94560 | Selected key highlight |
| `--key-hover` | #4a4a7c | Key hover state |
| `--grid-line` | #2a2a4a | Canvas grid lines |

#### 6.2.2 Typography

| Token | Font | Size | Weight |
|-------|------|------|--------|
| `--font-ui` | Inter, system-ui, sans-serif | 14px | 400 |
| `--font-ui-sm` | Inter, system-ui, sans-serif | 12px | 400 |
| `--font-ui-lg` | Inter, system-ui, sans-serif | 16px | 600 |
| `--font-legend` | Inter, system-ui, sans-serif | variable | 500 |
| `--font-mono` | JetBrains Mono, monospace | 12px | 400 |

#### 6.2.3 Spacing System

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |

#### 6.2.4 Component Sizes

| Element | Size |
|---------|------|
| Key (1U) | 19.05mm × 19.05mm (scaled to pixels) |
| Toolbar width | 48px |
| Properties panel width | 280px |
| Header height | 48px |
| Status bar height | 32px |
| Button height | 32px |
| Input height | 32px |

### 6.3 Canvas Interaction Patterns

#### 6.3.1 Selection

| Action | Behavior |
|--------|----------|
| Click key | Select single key, deselect others |
| Shift+Click key | Add to selection |
| Ctrl+Click key | Toggle selection |
| Click empty canvas | Deselect all |
| Drag on empty canvas | Rectangle selection (additive if Shift held) |
| Escape key | Deselect all |

**Visual feedback:**
- Selected keys: `--accent-primary` border (2px), subtle glow
- Multi-selection: same as single, bounding box around all selected
- Hover: `--key-hover` background

#### 6.3.2 Drag and Drop

| Action | Behavior |
|--------|----------|
| Drag selected key | Move key, snap to grid on release |
| Drag without selection | Start rectangle selection |
| Alt+Drag key | Duplicate and move |
| Arrow keys | Move selected key 0.25U |
| Shift+Arrow keys | Move selected key 1U |

**Visual feedback:**
- During drag: key follows cursor with slight transparency (opacity: 0.8)
- Snap preview: ghost outline shows snap position
- Grid highlights as key approaches snap points

#### 6.3.3 Key Resize

| Action | Behavior |
|--------|----------|
| Click size dropdown | Show standard sizes |
| Double-click key | Open inline size editor |

**Standard sizes in dropdown:**
- 1U (19.05mm)
- 1.25U (23.81mm)
- 1.5U (28.57mm)
- 1.75U (33.34mm)
- 2U (38.1mm)
- 2.25U (42.86mm)
- 2.75U (52.39mm)

**Visual feedback:**
- Resized key immediately re-renders
- Adjacent keys show snap guides
- Properties panel updates to show new size

#### 6.3.4 Key Rotation

| Action | Behavior |
|--------|----------|
| Drag rotation handle | Rotate around key center |
| Click rotation input | Type degrees directly |
| 0°, 90°, 180°, 270° buttons | Snap to common angles |

**Visual feedback:**
- Rotation handle: circular arrow icon on selected key
- During rotation: key follows rotation, degree readout updates live
- Rotation-aware snap: adjacent keys re-snap relative to new orientation

#### 6.3.5 Mirror Operation

| Action | Behavior |
|--------|----------|
| Ctrl+M | Mirror selected keys |
| Toolbar button | Same as Ctrl+M |

**Mirror behavior:**
1. Calculate bounding box of selection
2. Create copy offset by configurable distance (default: layout width + 2U)
3. Invert rotation: newRotation = (360 - oldRotation) % 360
4. Position copy relative to mirror axis
5. Select the new mirrored copy

**Visual feedback:**
- During mirror: ghost preview of mirrored position
- After mirror: new keys selected, original deselected
- Toast notification: "N keys mirrored"

#### 6.3.6 Group/Ungroup

| Action | Behavior |
|--------|----------|
| Ctrl+G | Group selected keys |
| Ctrl+Shift+G | Ungroup selected groups |
| Toolbar buttons | Same as keyboard shortcuts |

**Group behavior:**
- Grouped keys share a groupId
- Dragging any key in group moves all keys in group
- Properties panel shows group-level properties
- Nested groups supported (groups containing groups)

**Visual feedback:**
- Grouped keys: subtle connecting line between group members
- Group selected: bounding box around entire group
- Drag group: all keys move together

### 6.4 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Z | Undo |
| Ctrl+Y / Ctrl+Shift+Z | Redo |
| Ctrl+C | Copy selected |
| Ctrl+V | Paste |
| Ctrl+X | Cut selected |
| Delete / Backspace | Delete selected |
| Ctrl+A | Select all |
| Ctrl+M | Mirror selected |
| Ctrl+G | Group selected |
| Ctrl+Shift+G | Ungroup selected |
| Ctrl+S | Save to file |
| Ctrl+O | Open from file |
| Ctrl+E | Export menu |
| + / = | Zoom in |
| - | Zoom out |
| 0 | Reset zoom to 100% |
| Arrow keys | Move selected (0.25U) |
| Shift+Arrow | Move selected (1U) |
| Escape | Deselect all |
| Tab | Select next key |
| Shift+Tab | Select previous key |

### 6.5 Export Workflow

#### 6.5.1 Export Dialog

```
┌─────────────────────────────────────────────┐
│  Export Layout                              │
├─────────────────────────────────────────────┤
│  Format: [SVG ▼]                            │
│                                             │
│  Options:                                   │
│  ☑ Include legends                         │
│  ☑ Include hardware metadata                │
│  ☐ Transparent background (PNG only)       │
│  Resolution: [2x ▼] (PNG only)              │
│                                             │
│  [Cancel]              [Export]            │
└─────────────────────────────────────────────┘
```

#### 6.5.2 Export Formats and Options

| Format | Options |
|--------|---------|
| SVG | Include legends, include hardware metadata |
| PNG | Resolution (1x, 2x, 4x), transparent background |
| JSON | Full metadata, pretty print |
| kanata config | Generate keyboard.h + rules.mk |
| QMK keymap | Generate keymap.json |

### 6.6 Error States and Edge Cases

#### 6.6.1 Canvas States

| State | Visual | Action |
|-------|--------|--------|
| Empty canvas | "Click 'Add Key' to start" message centered | N/A |
| Loading layout | Skeleton pulse animation on canvas | Wait |
| Error loading | Red banner: "Failed to load layout" | Retry / Cancel |
| Unsaved changes | Orange dot on tab title | Save prompt |

#### 6.6.2 Key States

| State | Visual |
|-------|--------|
| Default | `--key-default` fill |
| Hover | `--key-hover` fill, cursor: move |
| Selected | `--accent-primary` border, `--key-selected` fill |
| Multi-selected | Same as selected + bounding box |
| Dragging | opacity: 0.8, cursor: grabbing |
| Rotating | Rotation handle visible, degree readout |
| Resizing | Resize handles visible at corners |
| Grouped | Subtle connecting line to group members |

#### 6.6.3 Validation Messages

| Scenario | Message |
|----------|---------|
| Invalid JSON load | "Invalid layout file. Please check the file format." |
| Export too large | "Layout exceeds export limits. Consider splitting into smaller sections." |
| LocalStorage full | "Storage full. Please save to file to free up space." |
| Unsaved on close | "You have unsaved changes. Save before leaving?" |

---

## 7. Data Model

### 7.1 Core Interfaces

```typescript
// Key unit = 1U = 19.05mm standard
type UUnit = number;

interface Key {
  id: string;
  shape: 'rect' | 'rounded' | 'isoEnter' | 'block' | 'barrel';
  width: UUnit;
  height: UUnit;
  x: UUnit;
  y: UUnit;
  rotation: number; // degrees 0-360
  color: string; // hex color
  
  // Hardware metadata (optional)
  hardware?: {
    matrixRow?: number;
    matrixCol?: number;
    pin?: string;
    labels?: Record<string, string>;
  };
  
  // Key function metadata
  function?: {
    keycode?: string;
    behaviors?: string[];
  };
  
  // Legend metadata
  legend?: {
    text?: Record<string, string>; // position: text
    color?: Record<string, string>; // position: color
    fontSize?: number;
  };
  
  groupId?: string;
}

interface KeyGroup {
  id: string;
  keyIds: string[];
  name?: string;
}

interface KeyboardLayout {
  id: string;
  name: string;
  author?: string;
  created: string; // ISO date
  modified: string; // ISO date
  
  // Hardware definition (optional — rows defined only if needed)
  hardware?: {
    rows?: number;
    cols?: number;
    unitSize: number; // mm for 1U (default 19.05)
  };
  
  keys: Key[];
  groups: KeyGroup[];
}
```

### 7.2 Export Format Schemas

#### 7.2.1 SVG Export Schema
```typescript
interface SVGExport {
  width: string; // e.g., "600px"
  height: string; // e.g., "200px"
  viewBox: string; // e.g., "0 0 600 200"
  keys: SVGKey[];
}

interface SVGKey {
  id: string;
  path: string; // SVG path d attribute
  transform: string; // e.g., "rotate(90 50 50) translate(100 50)"
  fill: string;
  legends?: SVGLegend[];
}
```

#### 7.2.2 kanata Export Schema
```typescript
interface KanataExport {
  keyboardH: string; // content for keyboard.h
  rulesMk: string; // content for rules.mk
}
```

#### 7.2.3 QMK Keymap Export Schema
```typescript
interface QMKExport {
  version: number; // typically 0 or 1
  name: string;
  layout: string;
  layerCount: number;
  layers: string[][]; // 2D array of keycodes per layer
}
```

---

## 8. Technical Architecture (High-Level)

### 8.1 Technology Stack (Deferred to Implementation Phase)

The following decisions are **deferred** to the implementation phase (Phase 3):
- UI framework (React, Vue, Svelte, Solid, vanilla)
- State management approach
- Build tool (Vite, Webpack, Rollup)
- Testing framework
- SVG rendering approach (native SVG vs canvas with SVG export)

**Constraints:**
- TypeScript SPA
- SVG-native canvas
- No backend dependency
- Modern browser support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### 8.2 Module Architecture

```
src/
├── core/           # Core domain logic (key manipulation, geometry, snap)
├── canvas/         # SVG canvas rendering and interaction
├── store/          # State management (layout store, selection store)
├── export/         # Export generators (SVG, PNG, JSON, kanata, QMK)
├── io/             # File save/load, LocalStorage persistence
├── ui/             # UI components (toolbar, panels, dialogs)
└── utils/          # Utilities (geometry math, color utils, etc.)
```

### 8.3 Key Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| `core/key` | Key CRUD operations, property updates |
| `core/geometry` | Position calculations, rotation math, snap logic |
| `core/group` | Group/ungroup operations |
| `canvas/renderer` | SVG element rendering, position transforms |
| `canvas/interactions` | Mouse/touch event handling, drag, rotate, resize |
| `store/layout` | Central layout state (keys, groups, metadata) |
| `store/selection` | Selection state, multi-select management |
| `export/svg` | SVG generation |
| `export/kanata` | kanata config generation |
| `export/qmk` | QMK keymap generation |
| `io/file` | File system operations |
| `io/storage` | LocalStorage persistence |

---

## 9. Glossary

| Term | Definition |
|------|------------|
| 1U | Standard key unit = 19.05mm (the width of a standard key) |
| U unit | Unit of measurement for keyboard keys (1U = 19.05mm standard) |
| Snap-to-grid | Keys align to grid points when placed |
| Rotation-aware snap | When a rotated key is placed, adjacent keys snap relative to its rotated orientation |
| Matrix row/col | Row and column indices in the keyboard matrix |
| Keycode | Code representing a key's function (e.g., KC_A, KC_LSFT) |
| Legend | Text label on a key (top, center, bottom, front) |
| kanata | Alternative firmware to QMK/ZMK for custom keyboards |
| ISO Enter | Standard ISO (European) Enter key shape |
| Ortholinear | Keyboard with keys in a grid (no stagger) |
| Split keyboard | Keyboard with two halves separated physically |

---

## 10. References

- [Product Brief (Phase 1)](docs/product-brief-kanata-editor-2026-04-25.md)
- kanata firmware: https://github.com/reverseb逗/kanata
- QMK documentation: https://docs.qmk.fm/
- SVG 2.0 specification: https://www.w3.org/TR/SVG2/
- Keyboard Layout Editor (KLE): https://www.keyboard-layout-editor.com/
- Mechanical keyboard unit standards: https://docs.google.com/spreadsheets/d/1a4T7U02vLmws2IKBxMkSGF8wvJJRjEHL_7IHB5NI6lU/

---

## 11. Document History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-04-25 | Initial PRD from Phase 1 product brief |

---

**Document Status:** Phase 2 - Complete  
**PRD Level:** Full specification with functional/non-functional requirements, user stories, acceptance criteria, UX specification  
**Next Phase:** Phase 3 - Implementation Planning