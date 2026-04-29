# UI Review: Phase 3 - Editor Core

**Phase:** 3  
**Project:** kanata-editor  
**Audit Date:** 2026-04-28  
**Overall Score:** 15/24

---

## Summary

The editor canvas implements core functionality well with a clean SVG-based interface. However, there are several UX gaps and visual inconsistencies that affect usability.

| Pillar | Score |
|--------|-------|
| Copywriting | 2/4 |
| Visuals | 3/4 |
| Color | 3/4 |
| Typography | 3/4 |
| Spacing | 2/4 |
| Experience Design | 2/4 |

---

## 1. Copywriting (2/4)

### Findings

**Issues:**
- `prompt()` used for legend editing (line 350-352) - native browser dialog, no context or placeholder text
- Zoom indicator shows just percentage - no "Zoom" label
- Mouse position shows "U" units but no context label
- No tooltips on canvas elements

**Positive:**
- Keyboard shortcuts documented in AGENTS.md
- Legend rendering uses clear primary/secondary labels

### Recommendations
- Replace `prompt()` with inline editing or modal
- Add labels: "Zoom: 100%", "Position:" prefix for coordinates

---

## 2. Visuals (3/4)

### Findings

**Positive:**
- Clean SVG rendering with proper transforms
- Selection box has dashed stroke - good visual feedback
- Key shapes defined in defs - reusable and clean
- Separate layers for grid, keys, selected keys - good organization

**Issues:**
- No visual indicator for drag preview (ghosting)
- No hover state on keys before selection
- Zoom indicator and mouse position overlay lack styling hierarchy

### Recommendations
- Add key hover state with subtle color change
- Implement drag preview with opacity

---

## 3. Color (3/4)

### Findings

**Positive:**
- High contrast (#000 text on keys)
- Selection blue (#0066ff) is accessible
- Canvas background (#f5f5f5) provides good contrast with keys

**Issues:**
- No color picker for keys (only #ffffff default)
- Grid uses store colors - not validated for contrast
- Legend colors not applied consistently (defaults to #000)

### Recommendations
- Add color picker to key properties
- Validate grid colors against canvas background

---

## 4. Typography (3/4)

### Findings

**Positive:**
- Good font choices: Barlow Condensed (primary), Nunito Sans (secondary)
- Font scaling based on character category (modifier, letter, digit, punctuation)
- Visual weight adjustments for tricky characters (i, l, etc.)

**Issues:**
- Primary legend at 58% position, secondary at 28% - may not work for all key sizes
- No fallback fonts specified in CSS (only system fonts)
- Legend font sizing calculation is complex - could simplify

### Recommendations
- Test with various key sizes to validate legibility
- Add explicit font fallbacks in CSS

---

## 5. Spacing (2/4)

### Findings

**Issues:**
- No consistent spacing scale
- Zoom/mouse position indicators use 10px bottom, 10px left/right - inconsistent
- Key gap (KEY_GAP = 0.08/BASE_SCALE) is very small (~0.004U)
- No padding in container, zoom indicator touches edge

### Recommendations
- Use consistent spacing tokens (4px, 8px, 12px, etc.)
- Add padding to container (16px minimum)
- Increase key gap for better visual separation

---

## 6. Experience Design (2/4)

### Findings

**Positive:**
- Comprehensive keyboard shortcuts for power users
- Multiple pan methods (arrows, mouse, wheel)
- Multiple zoom methods (+/-, fit, wheel)
- Drag selection with rectangle intersection

**Issues:**
- No property panel for key editing (shape, color, legend color, etc.)
- No undo/redo system
- No visible grid toggle UI in canvas
- No keyboard shortcut hints displayed
- No zoom limits UI (min/max indicators)
- Missing keyboard shortcut: Ctrl+M for mirror

### Recommendations
- Add property panel sidebar
- Implement undo/redo
- Add toolbar buttons for grid toggle, mirror
- Show keyboard shortcuts on screen or in tooltip

---

## Top Fixes

1. **Add property panel** - Edit key shape, color, legends inline
2. **Replace prompt() with modal** - Better UX for legend editing
3. **Add keyboard shortcut hints** - Display available shortcuts
4. **Implement undo/redo** - Critical for usability
5. **Add grid toggle** - Toggle visibility from UI, not just store

---

## Compliance with PRD Color Palette

| Token | Used | Status |
|-------|------|--------|
| `--bg-canvas` #1a1a2e | #f5f5f5 | ✗ Not using dark theme |
| `--accent-primary` #e94560 | #0066ff | ✗ Wrong color |
| `--text-primary` #ffffff | #000 | ✗ Not using palette |
| `--key-default` #3a3a5c | #ffffff | ✗ Not using palette |

**Note:** PRD specifies dark theme with specific palette. Current implementation uses light theme with different colors. This is a significant deviation.

---

## Files Audited

- `src/components/Canvas.tsx` - 544 lines
- `src/index.css` - 91 lines
- `src/types/presets.ts` - Key definitions

---

*UI Review Complete — 2026-04-28*