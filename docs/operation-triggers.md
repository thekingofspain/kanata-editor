# Keyboard Layout Editor - Operation Triggers Specification

**Version:** 2.0.0  
**Date:** 2026-04-25  
**Status:** Draft (Pending User Approval)  
**Detail Level:** High (individual operations with unique IDs)

---

## Overview

This document defines all trigger methods for operations in the kanata-editor. Each operation specifies:

- **Unique ID:** For tracking (e.g., C2-ZI-01 = Canvas-02, Zoom-In-01)
- **Four trigger types:**
  | Trigger Type | Description |
  |--------------|-------------|
  | **UX** | UI element (button, menu, toolbar) |
  | **Mouse** | Mouse-only operation |
  | **Keyboard** | Single or multi-key keyboard shortcut |
  | **Combo** | Combined mouse + keyboard operation |

- **Null (`—`)** indicates the trigger type is not applicable

---

## ID Prefix Reference

| Prefix | Category |
|--------|----------|
| C1- | CANVAS-01 (SVG Canvas) |
| C2- | CANVAS-02 (Pan & Zoom) |
| C3- | CANVAS-03 (Grid) |
| C4- | CANVAS-04 (Performance) |
| C5- | CANVAS-05 (Responsive) |
| K1- | KEY-01 (Add Key) |
| K2- | KEY-02 (Remove Key) |
| K3- | KEY-03 (Select Single) |
| K4- | KEY-04 (Multi-select) |
| K5- | KEY-05 (Copy) |
| K6- | KEY-06 (Paste) |
| K7- | KEY-07 (Delete) |
| P1- | POS-01 (Drag) |
| P2- | POS-02 (U Units) |
| P3- | POS-03 (Precision) |
| P4- | POS-04 (Snap) |
| P5- | POS-05 (Rotation-Aware Snap) |
| P6- | POS-06 (Arrow Keys) |
| S1- | SIZE-01 (Standard Sizes) |
| S2- | SIZE-02 (Width/Height) |
| S3- | SIZE-03 (Aspect Ratio) |
| R1- | ROT-01 (Rotate) |
| R2- | ROT-02 (Free Rotation) |
| R3- | ROT-03 (Property Panel) |
| R4- | ROT-04 (Visual Handle) |
| R5- | ROT-05 (Snap Rotation) |
| M1- | MIRR-01 (Mirror) |
| M2- | MIRR-02 (Offset) |
| M3- | MIRR-03 (Split Keyboards) |
| M4- | MIRR-04 (Shortcut) |
| G1- | GROUP-01 (Group) |
| G2- | GROUP-02 (Ungroup) |
| G3- | GROUP-03 (Move Group) |
| G4- | GROUP-04 (No Row Semantics) |
| G5- | GROUP-05 (Nested Groups) |
| U1- | UNDO-01 |
| U2- | UNDO-02 |
| U3- | UNDO-03 |
| P1- | PROP-01 (Shape) |
| P2- | PROP-02 (Color) |
| P3- | PROP-03 (Hardware) |
| P4- | PROP-04 (Function) |
| P5- | PROP-05 (Legend) |
| L1- | LAYOUT-01 (Name) |
| L2- | LAYOUT-02 (Author) |
| L3- | LAYOUT-03 (Timestamps) |
| L4- | LAYOUT-04 (Unit Size) |
| L5- | LAYOUT-05 (Hardware Config) |
| IO- | Save/Load Operations |

---

## Trigger Reference Sources

- Microsoft Visio
- Figma
- Adobe Illustrator
- Keyboard Layout Editor (KLE)
- Standard drawing application conventions

---

## Canvas Operations

### CANVAS-01: SVG-based Interactive Canvas

| Operation | UX | Mouse | Keyboard | Combo |
|-----------|-----|-------|----------|-------|
| Render keyboard layout | — | — | — | — |

> Note: This is the base rendering layer, not a user-triggered operation.

---

### CANVAS-02: Pan and Zoom

#### Zoom Operations

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| C2-ZI-01 | Zoom in (increment) | Zoom + button in toolbar, zoom slider (drag right) | Mouse wheel up | `+` (plus), `Ctrl + =` | `Ctrl + Mouse wheel up` |
| C2-ZI-02 | Zoom in (large step) | Zoom dropdown: "150%", "200%" | — | `Ctrl + Shift + =` | — |
| C2-ZO-01 | Zoom out (increment) | Zoom - button in toolbar, zoom slider (drag left) | Mouse wheel down | `-` (minus), `Ctrl + -` | `Ctrl + Mouse wheel down` |
| C2-ZO-02 | Zoom out (large step) | Zoom dropdown: "75%", "50%" | — | `Ctrl + Shift + -` | — |
| C2-ZF-01 | Zoom to fit (all keys) | "Fit to window" button, toolbar icon | Double-click hand tool | `Ctrl + 0`, `Shift + 1` | `Ctrl + Shift + click` on canvas |
| C2-ZF-02 | Zoom to selection | "Zoom to selection" button | Double-click on selected key | `Shift + 2` | `Ctrl + Shift + drag` (draw region) |
| C2-ZF-03 | Zoom to 100% (actual size) | "100%" button in toolbar | — | `Ctrl + 1` | — |
| C2-ZF-04 | Zoom to 200% | Zoom dropdown: "200%" | — | — | — |
| C2-ZF-05 | Zoom to 50% | Zoom dropdown: "50%" | — | — | — |
| C2-ZR-01 | Zoom reset / center view | "Reset view" button | — | `Home` | — |

#### Pan Operations

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| C2-PL-01 | Pan left | — | Middle mouse drag (left), Space + drag (left) | `Alt + Left Arrow` | `Shift + Mouse wheel right` |
| C2-PR-01 | Pan right | — | Middle mouse drag (right), Space + drag (right) | `Alt + Right Arrow` | `Shift + Mouse wheel left` |
| C2-PU-01 | Pan up | — | Middle mouse drag (up), Space + drag (up) | `Alt + Up Arrow` | `Mouse wheel backward` (Visio) |
| C2-PD-01 | Pan down | — | Middle mouse drag (down), Space + drag (down) | `Alt + Down Arrow` | `Mouse wheel forward` (Visio) |
| C2-PL-02 | Pan left (large step) | — | — | `Page Up` | — |
| C2-PR-02 | Pan right (large step) | — | — | `Page Down` | — |
| C2-PH-01 | Pan with hand tool | Hand tool button in toolbar | Right mouse drag (Visio) | `H` (Figma hand tool), hold `Space` | — |
| C2-PF-01 | Pan to first key | — | — | `Home` | — |
| C2-PL-03 | Pan to last key | — | — | `End` | — |
| C2-PC-01 | Pan to center | "Center view" button | Double-click on empty area | `Ctrl + Home` | — |

#### Zoom + Pan Combined

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| C2-ZP-01 | Zoom in at cursor position | — | `Ctrl + Mouse wheel up` | — | — |
| C2-ZP-02 | Zoom out at cursor position | — | `Ctrl + Mouse wheel down` | — | — |
| C2-ZP-03 | Zoom in and pan up | — | — | `Ctrl + Up Arrow` | — |
| C2-ZP-04 | Zoom out and pan down | — | — | `Ctrl + Down Arrow` | — |

#### Zoom Level Controls

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| C2-ZL-01 | Set zoom percentage | Zoom input field, slider | — | Type percentage + Enter | — |
| C2-ZL-02 | Zoom to specific % | Zoom dropdown: 25%, 50%, 75%, 100%, 150%, 200%, 400% | — | — | — |
| C2-ZL-03 | Toggle zoom to cursor | — | — | — | — |

---

### CANVAS-03: Grid Overlay

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| C3-TG-01 | Toggle grid visibility | "Grid" toggle button | — | `G` | — |
| C3-SR-01 | Show/hide rulers | "Rulers" toggle | — | `Shift + R` | — |
| C3-SG-01 | Toggle snap to grid | "Snap" toggle | — | `S` | — |
| C3-GS-01 | Configure grid size | Grid settings dialog | — | — | — |
| C3-GS-02 | Set grid spacing | Grid size input (e.g., 0.125U) | — | — | — |
| C3-GS-03 | Toggle grid points | "Grid points" toggle | — | — | — |

---

### CANVAS-04: Handle 100+ Keys

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| C4-PM-01 | Toggle performance mode | "Performance" toggle | — | — | — |
| C4-PM-02 | Enable simplified rendering | — | — | — | — |

> Note: These are system-level controls, not per-operation triggers.

---

### CANVAS-05: Responsive to Window Resize

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| C5-RS-01 | (Auto-resize canvas) | — | Window resize event | — | — |
| C5-RS-02 | Fit to window | "Fit to window" button | — | `Ctrl + 0` | — |
| C5-RS-03 | Toggle fullscreen | "Fullscreen" button | — | `F11` | — |

---

## Key Management (KEY)

### KEY-01: Add Key to Canvas

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| K1-AK-01 | Add key at cursor | "Add Key" button, toolbar key icon | Double-click on canvas | `N` (new key), `Insert` | — |
| K1-AK-02 | Add key at center | "Add Key at Center" button | — | `Ctrl + N` | — |
| K1-AK-03 | Add key via drag | Key tool in toolbar | Click and drag on canvas | — | — |
| K1-AK-04 | Add key from library | Shape library panel | Drag from library | — | — |
| K1-AK-05 | Add key at position (x,y) | Position inputs in toolbar | — | — | — |

---

### KEY-02: Remove Key

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| K2-DK-01 | Delete selected key(s) | Delete button in toolbar, context menu | — | `Delete`, `Backspace` | — |
| K2-DK-02 | Delete via context menu | Right-click → Delete | — | — | — |
| K2-CK-01 | Cut selected key(s) | Cut button, Edit menu | — | `Ctrl + X` | — |

---

### KEY-03: Select Single Key

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| K3-SK-01 | Select key | — | Click on key | — | — |
| K3-SK-02 | Select key (add to selection) | — | — | — | `Shift + Click` |
| K3-SK-03 | Cycle selection forward | — | — | `Tab` | — |
| K3-SK-04 | Cycle selection backward | — | — | `Shift + Tab` | — |
| K3-DS-01 | Deselect all | — | Click on empty canvas area | `Esc` | `Ctrl + Shift + A` (Figma invert) |
| K3-SK-05 | Select first key | — | — | `Home` | — |
| K3-SK-06 | Select last key | — | — | `End` | — |
| K3-SK-07 | Select by hover | — | Hover over key (highlight) | — | — |

---

### KEY-04: Multi-select Keys

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| K4-MS-01 | Add to selection (toggle) | — | `Ctrl + Click` on key | — | — |
| K4-MS-02 | Add to selection (range) | — | `Shift + Click` on second key | — | — |
| K4-MS-03 | Box/lasso select | — | Click and drag rectangle on canvas | — | `Ctrl + drag` (add to existing) |
| K4-MS-04 | Select all keys | — | — | `Ctrl + A` | — |
| K4-MS-05 | Select all visible | — | — | `Ctrl + Shift + A` | — |
| K4-MS-06 | Invert selection | — | — | `Alt + A` | — |
| K4-MS-07 | Select same size | — | — | `Ctrl + Alt + S` | — |
| K4-MS-08 | Select same rotation | — | — | `Ctrl + Alt + R` | — |
| K4-MS-09 | Select all with keycode | — | — | — | — |
| K4-MS-10 | Select none (deselect) | — | Click empty canvas | `Esc` | — |

---

### KEY-05: Copy Selected Keys

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| K5-CP-01 | Copy to clipboard | Copy button, context menu, Edit menu | — | `Ctrl + C` | — |
| K5-CP-02 | Duplicate in place | "Duplicate" button | — | `Ctrl + D` | — |
| K5-CP-03 | Copy while dragging | — | — | — | `Alt + drag` (Figma) |
| K5-CP-04 | Copy and offset | — | — | — | `Alt + Shift + drag` |
| K5-CP-05 | Copy properties | — | — | `Ctrl + Alt + C` | — |

---

### KEY-06: Paste Keys from Clipboard

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| K6-PA-01 | Paste | Paste button, Edit menu | — | `Ctrl + V` | — |
| K6-PA-02 | Paste in place | — | — | `Ctrl + Shift + V` | — |
| K6-PA-03 | Paste at cursor | — | Right-click → "Paste here" | — | — |
| K6-PA-04 | Paste to replace | — | — | `Ctrl + Shift + R` | — |
| K6-PA-05 | Paste properties | — | — | `Ctrl + Alt + V` | — |
| K6-PA-06 | Repeat paste | — | — | `Ctrl + D` (after initial paste) | — |

---

### KEY-07: Delete Selected Keys

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| K7-DL-01 | Delete selected | Delete button, context menu | — | `Delete`, `Backspace` | — |
| K7-CU-01 | Cut selected | Cut button, Edit menu | — | `Ctrl + X` | — |
| K7-DL-02 | Delete via backspace | — | — | `Backspace` | — |

---

## Key Positioning (POS)

### POS-01: Drag Key to Reposition

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P1-MV-01 | Move key(s) via drag | — | Drag selected key(s) | — | — |
| P1-MV-02 | Move key(s) via arrow keys | — | — | Arrow keys (nudge) | — |
| P1-MV-03 | Move key(s) fast | — | — | — | `Shift + Arrow` (10x distance) |
| P1-MV-04 | Move key(s) fine | — | — | — | `Ctrl + Arrow` (0.125U) |
| P1-MV-05 | Move to front | — | — | `]` | — |
| P1-MV-06 | Move to back | — | — | `[` | — |
| P1-MV-07 | Constrain to axis | — | — | — | `Shift + drag` (horizontal/vertical only) |
| P1-MV-08 | Duplicate while moving | — | — | — | `Alt + drag` |

---

### POS-02: Position in U Units

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P2-PU-01 | (Unit definition) | — | — | — | — |

> Note: This is a unit specification, not a user operation.

---

### POS-03: Position Precision (0.25U)

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P3-FP-01 | Fine position (0.25U) | — | — | Arrow keys | — |
| P3-FP-02 | Coarse position (1U) | — | — | — | `Shift + Arrow` |
| P3-FP-03 | Super fine (0.125U) | — | — | — | `Ctrl + Arrow` |
| P3-FP-04 | Enter exact position | X/Y input fields in toolbar | — | Tab to field | — |

---

### POS-04: Snap-to-Grid

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P4-SG-01 | Toggle snap | "Snap" toggle in toolbar | — | `S` | — |
| P4-SG-02 | Snap while dragging | — | Automatic when enabled | — | — |
| P4-SG-03 | Snap to grid lines | — | Drag near grid line | — | — |
| P4-SG-04 | Disable snap temporarily | — | — | `Alt` (hold while dragging) | — |
| P4-SG-05 | Configure grid size | Grid settings panel | — | — | — |

---

### POS-05: Rotation-Aware Snap

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P5-RS-01 | Snap to adjacent key edge | — | Drag key near another key edge | — | — |
| P5-RS-02 | Release snap | — | Drag away from snap point | `Esc` | — |
| P5-RS-03 | Snap guide appears | — | Show guide line when near | — | — |
| P5-RS-04 | Manual placement override | — | Drag after snap | — | — |

---

### POS-06: Arrow Keys Fine Positioning

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P6-N1-01 | Nudge 0.25U | — | — | Arrow keys | — |
| P6-N1-02 | Nudge 1U | — | — | — | `Shift + Arrow` |
| P6-N1-03 | Nudge 0.125U (fine) | — | — | — | `Ctrl + Arrow` |
| P6-N1-04 | Nudge 2U (coarse) | — | — | — | `Ctrl + Shift + Arrow` |

---

## Key Resize (SIZE)

### SIZE-01: Resize to Standard Sizes

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| S1-R1-01 | Open size picker | Size dropdown in toolbar | — | — | — |
| S1-R1-02 | Select 1U | Click "1U" option | — | `1` | — |
| S1-R1-03 | Select 1.25U | Click "1.25U" option | — | `2` | — |
| S1-R1-04 | Select 1.5U | Click "1.5U" option | — | `3` | — |
| S1-R1-05 | Select 1.75U | Click "1.75U" option | — | `4` | — |
| S1-R1-06 | Select 2U | Click "2U" option | — | `5` | — |
| S1-R1-07 | Select 2.25U | Click "2.25U" option | — | `6` | — |
| S1-R1-08 | Select 2.75U | Click "2.75U" option | — | `7` | — |
| S1-R1-09 | Custom width input | Width input field | — | Tab to field | — |
| S1-R1-10 | Custom height input | Height input field | — | Tab to field | — |
| S1-R1-11 | Apply size | "Apply" button | — | `Enter` | — |

---

### SIZE-02: Width/Height Independently Adjustable

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| S2-RS-01 | Resize via corner handle | — | Drag corner handle | — | — |
| S2-RS-02 | Resize via edge handle | — | Drag edge handle | — | — |
| S2-RS-03 | Resize from center | — | — | — | `Alt + drag corner` |
| S2-RS-04 | Resize (free) | — | — | — | `Alt + drag` (from any handle) |
| S2-RS-05 | Resize with aspect lock | — | — | — | `Shift + drag corner` |
| S2-RS-06 | Resize width only | — | Drag left/right edge | — | — |
| S2-RS-07 | Resize height only | — | Drag top/bottom edge | — | — |

---

### SIZE-03: Maintain Aspect Ratio Option

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| S3-AL-01 | Toggle aspect lock | Lock icon in toolbar | — | — | — |
| S3-AL-02 | Temporarily unlock | — | — | — | `Shift + drag` (temporary override) |
| S3-AL-03 | Lock aspect ratio | "Lock aspect" checkbox | — | — | — |

---

## Key Rotation (ROT)

### ROT-01: Rotate Individual Key

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| R1-RO-01 | Rotate via handle | — | Drag rotation handle | — | — |
| R1-RO-02 | Rotate free | — | — | — | `Alt + drag rotation` |
| R1-RO-03 | Rotate via input | Rotation input field in toolbar | — | Tab to field, type degrees | — |

---

### ROT-02: Free Degree of Rotation (0-360°)

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| R2-FR-01 | Rotate free (any angle) | — | Drag rotation handle | — | — |
| R2-FR-02 | Rotate constrained | — | — | — | `Shift + drag` (snap to 15°) |
| R2-FR-03 | Rotate exact degrees | Rotation input: type 0-360 | — | Type number + Enter | — |
| R2-FR-04 | Rotate +/- degrees | Rotation input: +/- delta | — | — | — |

---

### ROT-03: Rotation Input via Property Panel

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| R3-PI-01 | Enter rotation degrees | Rotation input in properties panel | — | Tab to input | — |
| R3-PI-02 | Quick rotate 0° | "0°" button in panel | — | — | — |
| R3-PI-03 | Quick rotate 90° CW | "90°" button in panel | — | — | — |
| R3-PI-04 | Quick rotate 180° | "180°" button in panel | — | — | — |
| R3-PI-05 | Quick rotate 90° CCW | "-90°" button in panel | — | — | — |
| R3-PI-06 | Rotate clockwise | — | — | `Ctrl + ]` | — |
| R3-PI-07 | Rotate counter-clockwise | — | — | `Ctrl + [` | — |

---

### ROT-04: Visual Rotation Handle

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| R4-VR-01 | Show rotation handle | — | Click to select key | — | — |
| R4-VR-02 | Rotate via handle | — | Drag rotation handle | — | — |
| R4-VR-03 | Hide rotation handle | — | Click elsewhere / Esc | — | — |

---

### ROT-05: Snap Rotation to 0°/90°/180°/270°

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| R5-SR-01 | Snap to 0° | "0°" button | — | — | `Shift + drag` (snaps at 0°) |
| R5-SR-02 | Snap to 90° | "90°" button | — | — | `Shift + drag` (snaps at 90°) |
| R5-SR-03 | Snap to 180° | "180°" button | — | — | `Shift + drag` (snaps at 180°) |
| R5-SR-04 | Snap to 270° | "270°" button | — | — | `Shift + drag` (snaps at 270°) |
| R5-SR-05 | Quick rotate CW | — | — | `Ctrl + .` (period) | — |
| R5-SR-06 | Quick rotate CCW | — | — | `Ctrl + ,` (comma) | — |
| R5-SR-07 | Rotate 45° increments | — | — | — | `Shift + drag` |

---

## Mirror Operation (MIRR)

### MIRR-01: Mirror (Copy with Rotation Inverted)

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| M1-MI-01 | Mirror selection (vertical axis) | "Mirror" button in toolbar | — | `Ctrl + M` | — |
| M1-MI-02 | Mirror selection (horizontal axis) | "Mirror H" button | — | `Ctrl + Shift + M` | — |
| M1-MI-03 | Mirror with offset | Offset input in dialog | — | — | — |
| M1-MI-04 | Mirror and replace original | — | — | — | — |

---

### MIRR-02: Offset Control

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| M2-OF-01 | Set mirror offset | Offset input field in mirror dialog | — | — | — |
| M2-OF-02 | Adjust offset after mirror | — | Drag mirrored copy | Arrow keys | — |
| M2-OF-03 | Clear offset | "Reset offset" button | — | — | — |

---

### MIRR-03: Mirror for Split Keyboards

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| M3-ML-01 | Mirror left to right | "Mirror L→R" button | — | — | — |
| M3-MR-01 | Mirror right to left | "Mirror R→L" button | — | — | — |
| M3-MB-01 | Mirror both sides | "Mirror Both" button | — | — | — |

---

### MIRR-04: Keyboard Shortcut

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| M4-KS-01 | Mirror (default vertical) | — | — | `Ctrl + M` | — |
| M4-KS-02 | Mirror horizontal | — | — | `Ctrl + Shift + M` | — |

---

## Grouping (GROUP)

### GROUP-01: Group Selected Keys

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| G1-GR-01 | Group keys | "Group" button in toolbar, context menu | — | `Ctrl + G` | — |
| G1-GR-02 | Group via selection box | — | Draw selection around all keys | — | — |
| G1-GR-03 | Group (keep originals) | — | — | — | — |

---

### GROUP-02: Ungroup Keys

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| G2-UG-01 | Ungroup | "Ungroup" button, context menu | — | `Ctrl + Shift + G` | — |
| G2-UG-02 | Ungroup one level | — | — | — | — |

---

### GROUP-03: Move Group as Unit

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| G3-MG-01 | Move group | — | Drag group | Arrow keys | `Shift + Arrow` |
| G3-MG-02 | Nudge group | — | — | Arrow keys | `Shift + Arrow` (10x) |

---

### GROUP-04: No Mandatory Row Semantics

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| G4-RS-01 | (Structural constraint) | — | — | — | — |

> Note: This is a data model constraint, not a direct operation.

---

### GROUP-05: Nested Groups

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| G5-DS-01 | Select nested group (deep select) | — | `Ctrl + Click` | — | — |
| G5-EN-01 | Enter group (edit) | — | Double-click group | `Enter` | — |
| G5-EX-01 | Exit group (edit mode) | — | Double-click outside | `Esc` | — |
| G5-TB-01 | Traverse into group | — | — | `Tab` | — |
| G5-TB-02 | Traverse out of group | — | — | `Shift + Tab` | — |

---

## Undo/Redo (UNDO)

### UNDO-01: Undo

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| U1-UN-01 | Undo last action | Undo button in toolbar, Edit menu | — | `Ctrl + Z` | — |
| U1-UN-02 | Undo multiple steps | History dropdown | — | `Ctrl + Z` (press repeatedly) | — |
| U1-UN-03 | Undo (via menu) | Edit → Undo | — | — | — |

---

### UNDO-02: Redo

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| U2-RD-01 | Redo action | Redo button in toolbar, Edit menu | — | `Ctrl + Y`, `Ctrl + Shift + Z` | — |
| U2-RD-02 | Redo multiple steps | History dropdown | — | `Ctrl + Y` (press repeatedly) | — |

---

### UNDO-03: Action History

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| U3-HS-01 | Open history panel | History button in toolbar | — | `Ctrl + H` | — |
| U3-HS-02 | View action history | History panel (scrollable list) | — | — | — |
| U3-HS-03 | Revert to specific state | — | Click on history item | — | — |
| U3-HS-04 | Clear history | "Clear history" button | — | — | — |

---

## Key Properties (PROP)

### PROP-01: Key Shape Property

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P1-SH-01 | Select shape type | Shape dropdown in properties panel | — | — | — |
| P1-SH-02 | Shape: rect | Click "rect" option | — | — | — |
| P1-SH-03 | Shape: rounded | Click "rounded" option | — | — | — |
| P1-SH-04 | Shape: isoEnter | Click "isoEnter" option | — | — | — |
| P1-SH-05 | Shape: block | Click "block" option | — | — | — |
| P1-SH-06 | Shape: barrel | Click "barrel" option | — | — | — |
| P1-SH-07 | Apply shape to selection | — | — | `Enter` | — |

---

### PROP-02: Key Color Property

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P2-CP-01 | Open color picker | Color swatch in properties panel | — | — | — |
| P2-CP-02 | Pick color from screen | — | — | — | `Alt + drag` (eyedropper) |
| P2-CP-03 | Enter hex color | Hex input field | — | Type hex code | — |
| P2-CP-04 | Apply color | — | Click color swatch | `Enter` | — |
| P2-CP-05 | Recent colors | Recent colors row in picker | Click recent | — | — |
| P2-CP-06 | Copy color | — | Right-click swatch → Copy | — | — |
| P2-CP-07 | Paste color | — | Right-click swatch → Paste | — | — |

---

### PROP-03: Hardware Metadata

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P3-HW-01 | Edit matrix row | Row input in hardware panel | — | Tab to field | — |
| P3-HW-02 | Edit matrix column | Column input in hardware panel | — | Tab to field | — |
| P3-HW-03 | Edit matrix layer | Layer input in hardware panel | — | Tab to field | — |
| P3-HW-04 | Auto-assign matrix | "Auto-assign" button | — | — | — |
| P3-HW-05 | Clear matrix assignment | "Clear" button | — | — | — |

---

### PROP-04: Key Function Metadata

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P4-KF-01 | Enter keycode | Keycode input field | — | Tab to field, type keycode | — |
| P4-KF-02 | Open keycode picker | Keycode input → dropdown | Click dropdown | `Ctrl + K` | — |
| P4-KF-03 | Add behavior | "Add behavior" button | — | — | — |
| P4-KF-04 | Remove behavior | — | Click remove on behavior | — | — |
| P4-KF-05 | Reorder behaviors | — | Drag behavior up/down | — | — |

---

### PROP-05: Legend Metadata

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| P5-LG-01 | Edit legend text | Legend text inputs (9 positions) | Click on key legend | Tab to position | — |
| P5-LG-02 | Set legend position | Position dropdown: top, center, bottom, etc. | — | — | — |
| P5-LG-03 | Set legend color | Color picker per position | — | — | — |
| P5-LG-04 | Set legend font size | Font size input | — | — | — |
| P5-LG-05 | Clear legend | "Clear" button | — | — | — |
| P5-LG-06 | Copy legend from key | — | Right-click → Copy legend | — | — |
| P5-LG-07 | Paste legend to key | — | Right-click → Paste legend | — | — |

---

## Layout Properties (LAYOUT)

### LAYOUT-01: Layout Name

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| L1-NM-01 | Edit layout name | Name input field in header | — | Tab to field | — |
| L1-NM-02 | Rename layout | — | Double-click name in header | `F2` | — |

---

### LAYOUT-02: Author Property

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| L2-AU-01 | Edit author | Author input field in settings | — | Tab to field | — |
| L2-AU-02 | Set author from system | "Use system user" button | — | — | — |

---

### LAYOUT-03: Timestamps

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| L3-TS-01 | View created date | Display only in metadata panel | — | — | — |
| L3-TS-02 | View modified date | Display only in metadata panel | — | — | — |
| L3-TS-03 | Force update modified | File → Save (triggers auto) | — | — | — |

---

### LAYOUT-04: Unit Size Configuration

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| L4-US-01 | Set unit size (mm) | Unit size input (default 19.05mm) | — | — | — |
| L4-US-02 | Set unit size (U) | Unit size dropdown | — | — | — |
| L4-US-03 | Configure margins | Margin inputs | — | — | — |

---

### LAYOUT-05: Hardware Rows/Cols Definition

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| L5-HW-01 | Define matrix rows | Rows input in hardware config | — | Tab to field | — |
| L5-HW-02 | Define matrix columns | Columns input in hardware config | — | Tab to field | — |
| L5-HW-03 | Add row | "+" button next to rows | — | — | — |
| L5-HW-04 | Remove row | "-" button next to rows | — | — | — |
| L5-HW-05 | View matrix preview | Matrix preview panel | — | — | — |

---

## Save/Load Operations (IO)

### IO-01: Save Layout to File

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| IO-SV-01 | Save to JSON file | File → Save, Save button | — | `Ctrl + S` | — |
| IO-SV-02 | Save as (new file) | File → Save As | — | `Ctrl + Shift + S` | — |
| IO-SV-03 | Auto-save to LocalStorage | Automatic (debounced) | — | — | — |
| IO-SV-04 | Export layout | File → Export | — | `Ctrl + E` | — |

---

### IO-02: Load Layout from File

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| IO-LD-01 | Open file dialog | File → Open, Open button | — | `Ctrl + O` | — |
| IO-LD-02 | Drag and drop file | — | Drag JSON file onto canvas | — | — |
| IO-LD-03 | Load from LocalStorage | Recent files list | Click recent file | — | — |
| IO-LD-04 | Reload current file | File → Reload | — | — | — |

---

### IO-03: LocalStorage Auto-save

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| IO-AS-01 | Enable auto-save | Settings → Auto-save toggle | — | — | — |
| IO-AS-02 | Manual save to LocalStorage | "Save draft" button | — | — | — |

---

### IO-04: LocalStorage Restore

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| IO-RS-01 | Restore from LocalStorage | Prompt on load if draft exists | — | — | — |
| IO-RS-02 | Clear LocalStorage | Settings → Clear draft | — | — | — |

---

### IO-05: JSON File Validation

| # | Operation | UX | Mouse | Keyboard | Combo |
|---|-----------|-----|-------|----------|-------|
| IO-VL-01 | Validate on load | Automatic | — | — | — |
| IO-VL-02 | Show validation errors | Error dialog | — | — | — |

---

## Keyboard Shortcut Summary Table

| Action | Primary Shortcut | Alternative |
|--------|------------------|-------------|
| Copy | `Ctrl + C` | `Alt + drag` |
| Paste | `Ctrl + V` | `Ctrl + Shift + V` |
| Cut | `Ctrl + X` | — |
| Delete | `Delete` | `Backspace` |
| Select All | `Ctrl + A` | — |
| Deselect | `Esc` | `Ctrl + Shift + A` |
| Undo | `Ctrl + Z` | — |
| Redo | `Ctrl + Y` | `Ctrl + Shift + Z` |
| Group | `Ctrl + G` | — |
| Ungroup | `Ctrl + Shift + G` | — |
| Zoom In | `Ctrl + +` | `+` |
| Zoom Out | `Ctrl + -` | `-` |
| Zoom to Fit | `Ctrl + 0` | — |
| Pan | Space + drag | Arrow keys |
| Duplicate | `Ctrl + D` | `Alt + drag` |
| Mirror | `Ctrl + M` | — |
| Nudge | Arrow keys | `Shift + Arrow` (10x) |
| Toggle Grid | `G` | — |
| Properties | `Ctrl + Enter` | Double-click |

---

## Notes

1. **Platform Differences:** Windows uses `Ctrl`, macOS uses `Cmd`. This document uses Windows conventions (`Ctrl`). Consider adding platform detection.

2. **Conflict Resolution:** If shortcuts conflict with browser defaults, prefer:
   - Adding modifier keys
   - Using function keys with modifiers
   - Context-aware shortcuts (only active when canvas focused)

3. **Accessibility:** All primary actions must have keyboard shortcuts per A11Y-01.

4. **Customization:** Consider adding a shortcut customization dialog for power users.

---

*Document based on research from: Microsoft Visio, Figma, Adobe Illustrator, KLE*