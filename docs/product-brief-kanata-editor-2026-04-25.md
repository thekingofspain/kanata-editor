# Product Brief: kanata-editor

**Project:** kanata-editor  
**Version:** 1.0.0  
**Date:** 2026-04-25  
**BMAD Phase:** 1 - Analysis  
**Project Level:** 2 (Full PRD with Architecture)

---

## 1. Project Overview

### Project Name
kanata-editor

### Project Type
Single Page Application (SPA) - Web Application

### Core Value Proposition
A Visio-like keyboard layout editor enabling keyboard enthusiasts and custom keyboard builders to visually design, edit, and export custom keyboard layouts with an intuitive drag-and-drop interface.

### Target Users
- Keyboard enthusiasts who want to design custom keyboard layouts
- Custom keyboard builders who need to visualize and share layouts
- Mechanical keyboard hobbyists planning key arrangements
- Keyboard layout designers for ortholinear, split, and ergonomic keyboards

---

## 2. Problem Statement

Currently, keyboard layout design tools are either:
- Too basic (simple text-based representations)
- Too complex (CAD software requiring steep learning curve)
- Missing visual feedback (cannot see layout in real-time)
- Lacking export capabilities (cannot generate production-ready files)

Users need a visual, intuitive editor that combines the ease of Visio-style diagramming with keyboard-specific features.

---

## 3. Analysis Results

### 3.1 Market Research: Keyboard Editor Landscape

The keyboard layout editor market has several established players with distinct positioning:

| Tool | Type | Target | Key Strength | Weakness |
|------|------|-------|--------------|----------|
| **keyboard-layout-editor.com (KLE)** | Web SPA | Mechanical keyboards | Industry standard, widespread adoption | Aging UI, no active development |
| **kle-ng** | Web SPA | Mechanical keyboards | Modern tech, TypeScript, plate generator | Newer, smaller community |
| **Keyboard Layout Studio** | Web SPA | QMK developers | QMK/Vial export, modern UI | QMK-focused only |
| **QMK Configurator** | Web SPA | QMK users | Direct firmware compilation | Requires QMK integration |
| **VIA** | Web SPA | VIA users | Key remapping, no compile | Must already have VIA firmware |
| **ZMK Keymap Editor** | Web SPA | ZMK users | GitHub integration, macros | ZMK-specific |
| **KbdEdit** | Windows Desktop | Windows users | Most powerful, ligatures/dead keys | Windows only, expensive |
| **Keyman Developer** | Desktop | Multilingual | 1000+ languages | Overkill for mechanical keebs |
| **keymap-drawer** | CLI | Developers | Programmatic, SVG export | No GUI, CLI-only |

**Market Gap Identified:**
No modern, visually-capable web editor specifically supports:
- **kanata firmware** (increasingly popular alternative to QMK/ZMK)
- **Advanced geometric operations** (mirror/flip with rotation awareness)
- **Flexible grouping** without mandatory row semantics
- **Hardware metadata** storage in export
- **Multiple export formats** (kanata, QMK, JSON)

### 3.2 User Personas

#### Primary Persona: The Keyboard Enthusiast
**Name:** "Layout Explorer"  
**Age:** 25-45  
**Profile:**

- Designs keyboards as a hobby or side project
- Familiar with CAD/diagram tools (Visio, Figma, Canva)
- Values visual feedback and rapid iteration
- May use QMK, ZMK, or emerging firmwares like kanata
- Active in online communities (Reddit r/mk, Discord, Keyboard Builders' Digest)

**Goals:**

- Quickly visualize layout ideas before committing to build
- Share layouts with community for feedback
- Export to multiple firmware formats
- Create documentation for group buys

**Pain Points:**

- Existing tools don't match their firmware choice
- Can't mirror layouts for split keyboards intuitively
- Export requires multiple conversion steps
- No metadata preservation in export

**Jobs to Be Done:**

1. "I want to place keys on a canvas and see them instantly"
2. "I want to copy a row and flip it for split layout"
3. "I want export that works with kanata config directly"
4. "I want to save my layout and load it later"

#### Secondary Persona: The Keycap Set Designer
**Name:** "Visual Planner"**Profile:**

- Creates custom keycap sets for group buys
- Needs to visualize key arrangement and legends
- Requires SVG output for production files
- May design for unique layouts (Alice, ortholinear, split ergo)

**Goals:**

- Create accurate legend/mockup renders
- Export clean SVGs for manufacturers
- Design for non-standard layouts

**Pain Points:**

- KLE output sometimes requires cleanup
- Limited control over key shape rendering
- Can't easily resize/key units without recalculation

#### Tertiary Persona: The Newcomer
**Name:** "First-Time Builder"****Profile:**

- Building first custom keyboard
- Doesn't know firmware choices
- Wants to explore layouts before buying

**Goals:**

- Learn what layout fits their needs
- Visualize different sizes (60%, 65%, TKL)
- Get started without command line

**Pain Points:**

- Overwhelmed by existing tools
- No guided workflow for beginners

### 3.3 Competitive Analysis: Feature Matrix

| Feature | KLE | kle-ng | KbdEdit | KLE-Studio | QMK Config | kanata-editor (Goal) |
|---------|-----|-------|---------|-----------|-----------|-----------|-------------------|
| **Visual Canvas** | Yes | Yes | Yes | Yes | Yes | Yes |
| **Drag & Drop** | Yes | Yes | Yes | Yes | Yes | Yes |
| **Copy/Paste** | Yes | Yes | Yes | Yes | Limited | Yes |
| **Mirror/Flip** | Manual | Manual | Yes | No | No | **Yes** |
| **Group/Ungroup** | No | No | Yes | No | N/A | **Yes** |
| **Key Resize (U units)** | Yes | Yes | Yes | Yes | Yes | Yes |
| **Rotate Keys** | Yes | Yes | Yes | Yes | No | Yes |
| **Snap-to-Grid** | Yes | Yes | Yes | Yes | Yes | Yes |
| **Rotation-Aware Snap** | No | No | No | No | No | **Yes** |
| **No Mandatory Rows** | No | No | Partial | Yes | No | **Yes** |
| **Hardware Metadata** | Yes | Yes | Limited | Yes | Yes | Yes |
| **Key Function Metadata** | Limited | Yes | Yes | Yes | Yes | **Yes** |
| **Legend Metadata** | Yes | Yes | Yes | Yes | No | **Yes** |
| **SVG Export** | Yes | Yes | Yes | Yes | No | Yes |
| **PNG Export** | Yes | Yes | No | Yes | No | Yes |
| **JSON Export** | Yes | Yes | Yes | Yes | Yes | Yes |
| **QMK Export** | No | Yes | No | Yes | Yes | Yes |
| **kanata Export** | No | No | No | No | No | **Yes** |
| **Save/Load** | Yes | Yes | Yes | Yes | No | Yes |
| **Multi-layer** | No | Yes | No | Yes | Yes | Future |

### 3.4 Value Proposition Refinement

**Core Differentiators:**

1. **Mirror Operation with Rotation Awareness**
   - Copy a cluster of keys and flip them with correct key orientation
   - Essential for split ergonomic keyboards (Ferris, Sofle, etc.)
   - Different from KLE's manual rotation after flip

2. **kanata Firmware Native Export**
   - Direct export to `config.h` / `rules.mk`
   - Addresses growing kanata user base
   - No intermediate conversion steps

3. **Flexible Grouping Without Row Semantics**
   - Groups are purely visual/organizational
   - Hardware metadata stored separately (rows defined only if needed)
   - User decides abstraction level

4. **Modern Tech Stack**
   - TypeScript SPA with no backend dependency
   - SVG-native canvas (like Figma/Visio)
   - Offline-capable PWA

5. **Key Properties Architecture**
   - Shape (rectangular, rounded, ISO enter, etc.)
   - Position (x, y)
   - Rotation (degrees)
   - Hardware metadata (row, col, matrix pin)
   - Key function metadata (keycode, behaviors)
   - Legend metadata (labels in 9 positions)

### 3.5 Technical Constraint Analysis

#### Browser Requirements
- Modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- SVG 2.0 support required
- LocalStorage for persistence

#### Performance Requirements
- Handle 100+ keys without lag
- Smooth drag operations at 60fps
- Export operations < 2 seconds

#### Data Architecture

**Key Object Model:**
```typescript
interface Key {
  id: string;
  shape: KeyShape;           // 'rect', 'rounded', 'isoEnter', etc.
  width: number;           // in U units (1U = 1)
  height: number;          // in U units
  x: number;             // position in U units
  y: number;            // position in U units
  rotation: number;       // degrees
  color: string;          // hex color
  
  // Hardware metadata (optional)
  hardware?: {
    matrixRow?: number;
    matrixCol?: number;
  };
  
  // Key function metadata
  function?: {
    keycode?: string;
    behaviors?: string[];
  };
  
  // Legend metadata
  legend?: {
    text?: { [position: string]: string };
    color?: { [position: string]: string };
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
  created: string;
  modified: string;
  
  // Hardware definition (optional - rows defined if needed)
  hardware?: {
    rows?: number;
    cols?: number;
    unitSize: number;      // 19.05mm for 1U typically
  };
  
  keys: Key[];
  groups: KeyGroup[];
}
```

#### Grid System
- Base unit: 1U = 19.05mm (standard)
- Grid subdivisions: 0.25U precision
- Default key margins: 0.125U (3mm) between keys
- Rotation-aware snap: keys rotate around their center

#### Export Formats
- **JSON**: Native format, full metadata preservation
- **SVG**: Vector graphics for manufacturing/docs
- **PNG**: Rasterized for documentation
- **kanata config**: `keyboard.h`, `rules.mk` generation
- **QMK keymap**: `keymap.json` for QMK Configurator

---

## 4. Product Description

### Core Feature Summary
A web-based visual editor for creating custom keyboard layouts with drag-and-drop functionality, supporting copy/paste operations, group/ungroup key arrangements, and SVG export for manufacturing and documentation.

### Key Capabilities

#### Visual Canvas
- Interactive SVG-based canvas for keyboard layout design
- Drag and drop keys to reposition
- Zoom and pan controls
- Snap-to-grid with adjustable precision
- Rotation-aware snapping

#### Key Management
- Add/remove keys with customizable properties
- Copy/paste individual keys or groups
- Mirror operation (copy + invert rotation)
- Multi-select support
- Key resize (1U, 1.25U, 1.5U, 1.75U, 2U, 2.25U, 2.75U, etc.)

#### Rotation
- Individual key rotation
- Free degree of rotation
- Rotation origin at key center

#### Grouping
- Group multiple keys into logical units
- Ungroup to release contained keys
- Move groups as single units
- No mandatory row semantics - user defines grouping

#### Hardware Metadata (per key, optional)
- Matrix row/column assignment
- Matrix pin assignment

#### Key Function Metadata
- Keycode assignment
- Behavior definitions

#### Legend Metadata
- Top/Center/Bottom/Front legends
- 9-position label grid
- Custom colors per position

#### Export
- SVG for manufacturing files
- PNG for documentation
- JSON (native format)
- kanata config (keyboard.h + rules.mk)
- QMK keymap

#### Save/Load
- LocalStorage persistence
- JSON file save/load
- URL-based sharing

---

## 5. Success Metrics

### User Experience
- Users can create a basic layout within 5 minutes of first use
- Zero learning curve for users familiar with drag-drop tools

### Technical
- Responsive canvas handling 100+ keys without lag
- Export produces valid SVG parseable by standard tools

### Market
- Address gap in kanata-compatible visual editors
- Enable keyboard enthusiasts to design without CAD expertise

---

## 6. Constraints & Assumptions

### Technical Constraints
- Browser-based SPA (no native installation required)
- Modern browser support (Chrome, Firefox, Safari, Edge)
- Single-user local editing (no collaboration in v1)

### Assumptions
- Users have basic familiarity with drag-drop interfaces
- Primary use case: designing mechanical keyboard layouts
- Export format (SVG) suitable for target users' needs
- kanata users need alternative to KLE-based exports

### Out of Scope (v1)
- Real-time collaboration
- Cloud save/persistence
- 3D visualization
- Key switch specification
- Firmware compilation
- Multi-layer support (defer to v2)

---

## 7. Next Steps

This Product Brief completes **BMAD Phase 1 - Analysis**. The following artifacts were produced:

- [x] Market Research: Keyboard editor landscape analysis
- [x] User Personas: Detailed primary and secondary user profiles
- [x] Competitive Analysis: Feature comparison with existing tools
- [x] Value Proposition Refinement: Core differentiators
- [x] Constraint Analysis: Technical and UX constraints

Proceed to **Phase 2 - Planning** for full PRD development with functional requirements, acceptance criteria, and UX specifications.

---

**Document Status:** Phase 1 - Complete  
**BMAD Workflow:** SSD Enabled (TEA Cycle Ready)

---

## Appendix A: Key Properties Reference

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `shape` | string | Key shape: 'rect', 'rounded', 'isoEnter', 'block', 'barrel' |
| `position` | {x, y} | Position in U units |
| `size` | {width, height} | Size in U units |
| `rotation` | number | Rotation in degrees |
| `color` | string | Fill color (hex) |
| `hardware` | object | Matrix row/col, pin |
| `function` | object | Keycode, behaviors |
| `legend` | object | Text, colors, font size |

### Hardware Metadata

| Property | Type | Description |
|----------|------|-------------|
| `matrixRow` | number | Matrix row index |
| `matrixCol` | number | Matrix column index |
| `labels` | object | Custom labels |

### Key Function Metadata

| Property | Type | Description |
|----------|------|-------------|
| `keycode` | string | Primary keycode |
| `behaviors` | string[] | TAP/HOLD behaviors |

### Legend Metadata

| Property | Type | Description |
|----------|------|-------------|
| `text` | {position: string} | Labels for 9 positions |
| `fontSize` | number | Font size in px |
| `color` | {position: string} | Per-position color |

### Layout Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Layout name |
| `author` | string | Author name |
| `unitSize` | number | 1U = X mm (default 19.05) |
| `keys` | Key[] | Array of keys |
| `groups` | KeyGroup[] | Array of groups |