# Agent Guidelines

## Development Server

- **Never run or kill `npm run dev`**
- Assume the development server is running on port 3000

## UX Issue Fixing Process

When asked to fix a UX issue:

1. Use the Chrome DevTools to take a picture/snapshot of the issue
2. Verify that you understand and can see the issue in the snapshot
3. Attempt to fix the issue
4. Use Chrome DevTools to verify the fix worked
5. If the fix did not work, remain in a fix-and-verify loop until the issue is corrected

**Important**: If you encounter MCP Chrome DevTools issues, resolve those issues first before attempting to apply any fix. Without functioning Chrome DevTools, your fix is considered invalid.

## Layout Preset Switching

When switching layout presets (e.g., ANSI 104, Default 60%, TKL), follow this workflow using the Chrome DevTools MCP server:

1. **Click the dropdown** - Use `chrome-devtools_click` on the layout combobox to open it
2. **Navigate with keyboard** - Use `chrome-devtools_press_key` with `ArrowDown` or `ArrowUp` to highlight the desired preset
3. **Select with Enter** - Use `chrome-devtools_press_key` with `Enter` to confirm the selection

This keyboard navigation approach is reliable and persists across sessions. Avoid using `fill` or `type_text` on the combobox - these may change the displayed value without triggering the actual layout change.

**Why this works**: The combobox uses native keyboard navigation for selection, which fires the proper `onChange` event. Direct value manipulation via `fill` only updates the input without invoking the change handler.

## Keyboard Shortcuts

### Canvas Navigation (no selection)

| Shortcut | Action |
|---------|-------|
| Arrow keys | Pan canvas |
| Home | Center view / reset pan and zoom |
| + / = | Zoom in |
| - | Zoom out |
| 0 | Reset zoom to 100% |

### Key Editing (when keys are selected)

| Shortcut | Action |
|---------|-------|
| Arrow keys | Move by 1U |
| Shift+Arrow | Nudge by 0.25U |
| Ctrl+Arrow | Resize key (width/height) |
| Alt+Up/Down | Rotate by 15° |
| Alt+Left/Right | Rotate by 1° |
| Delete/Backspace | Delete selected keys |
| Ctrl+A | Select all keys |
| Escape | Deselect all |

### Mouse Selection

| Action | Behavior |
|--------|----------|
| Click | Select single key |
| Shift+Click | Toggle key in/out of selection |
| Drag rectangle | Select multiple keys |
| Click empty canvas | Deselect all |

## Legend Rendering

Keycap legends use standard typography:
- Primary font: **Barlow Condensed** (600/700 weight)
- Secondary font: **Nunito Sans** (400/600 weight)
- Font size ratios: letters 50%, digits/punctuation 37.5%, modifiers 25% of key height
- Primary at 58% position, secondary at 28%