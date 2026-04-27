import { useEditorStore } from '../store';
import { STANDARD_KEY_SIZES, KEYBOARD_PRESETS, loadPreset } from '../types';
import { useState } from 'react';

export const Toolbar: React.FC = () => {
  const [currentKeyWidth, setCurrentKeyWidth] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState("");
  const {
    layout,
    canvas,
    grid,
    selection,
    addKey,
    removeKeys,
    copySelection,
    paste,
    cutSelection,
    duplicateSelection,
    mirrorSelection,
    groupKeys,
    undo,
    redo,
    toggleGrid,
    setCanvasZoom,
    selectAll,
    clearSelection,
    loadLayout
  } = useEditorStore();
  
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const presetName = e.target.value;
    setSelectedPreset(presetName);
    
    if (!presetName) return;
    
    const preset = KEYBOARD_PRESETS.find(p => p.name === presetName);
    if (!preset) return;
    
    const parsed = loadPreset(preset);
    if (parsed.keys.length > 0) {
      loadLayout({
        ...layout,
        keys: parsed.keys,
        modifiedAt: new Date().toISOString()
      });
      
      // Calculate zoom to fit the keyboard
      const container = document.querySelector('.canvas-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        const padding = 40;
        const width = parsed.width || 1;
        const height = parsed.height || 1;
        const scaleX = (rect.width - padding * 2) / width;
        const scaleY = (rect.height - padding * 2) / height;
        const newZoom = Math.min(scaleX, scaleY, 2);
        setCanvasZoom(newZoom);
      }
    }
  };

const handleAddKey = () => {
    // Always add at center (0, 0) and select the new key
    const selectedKeys = [...selection.keys];
    
    if (selectedKeys.length > 0) {
      // Add near selected key
      const lastKeyId = selection.lastSelected;
      const lastKey = layout.keys.find(k => k.id === lastKeyId);
      if (lastKey) {
        const newKey = addKey(lastKey.x + lastKey.width, lastKey.y);
        useEditorStore.getState().selectKey(newKey.id);
        return;
      }
    }
    
    // Use store directly to ensure atomic operation
    const store = useEditorStore.getState();
    // Clear mouse position first
    store.setLastMousePos(null);
    // Add at center (0, 0) with current key width
    const newKey = store.addKey(0, 0, currentKeyWidth, 1);
    // Select the new key
    store.selectKey(newKey.id);
  };

  const handleDelete = () => {
    if (selection.keys.size > 0) {
      removeKeys([...selection.keys]);
    }
  };

  const handleZoomIn = () => setCanvasZoom(canvas.zoom * 1.25);
  const handleZoomOut = () => setCanvasZoom(canvas.zoom / 1.25);
  const handleZoomFit = () => {
    const keys = layout.keys;
    if (keys.length === 0) {
      setCanvasZoom(1);
      useEditorStore.getState().setCanvasPan({ x: 0, y: 0 });
      return;
    }
    
    const container = document.querySelector('.canvas-container');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const padding = 40;
    
    const bounds = keys.reduce((acc, k) => ({
      minX: Math.min(acc.minX, k.x),
      minY: Math.min(acc.minY, k.y),
      maxX: Math.max(acc.maxX, k.x + k.width),
      maxY: Math.max(acc.maxY, k.y + k.height)
    }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
    
    const contentWidth = bounds.maxX - bounds.minX;
    const contentHeight = bounds.maxY - bounds.minY;
    
    const scaleX = (rect.width - padding * 2) / contentWidth;
    const scaleY = (rect.height - padding * 2) / contentHeight;
    const newZoom = Math.min(scaleX, scaleY, 2);
    
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    
    const panX = rect.width / 2 - centerX * newZoom;
    const panY = rect.height / 2 - centerY * newZoom;
    
    setCanvasZoom(newZoom);
    useEditorStore.getState().setCanvasPan({ x: panX, y: panY });
  };

  const handleGroup = () => {
    if (selection.keys.size > 1) {
      groupKeys([...selection.keys], 'New Group');
    }
  };

  return (
    <div className="toolbar" style={{
      display: 'flex',
      gap: '8px',
      padding: '8px',
      background: '#fff',
      borderBottom: '1px solid #e0e0e0',
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
      {/* File operations */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <button onClick={() => useEditorStore.getState().newLayout()}>New</button>
        <button onClick={() => {
          const json = JSON.stringify(layout, null, 2);
          const blob = new Blob([json], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${layout.name || 'layout'}.json`;
          a.click();
        }}>Save</button>
      </div>

      {/* Preset keyboard layouts */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <select value={selectedPreset} onChange={handlePresetChange}>
          <option value="">Load Preset...</option>
          {KEYBOARD_PRESETS.map(preset => (
            <option key={preset.name} value={preset.name}>{preset.name}</option>
          ))}
        </select>
      </div>

      {/* Key operations */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <button onClick={handleAddKey} title="Add Key (N)">+ Key</button>
        <button onClick={handleDelete} disabled={selection.keys.size === 0} title="Delete (Del)">Delete</button>
        <button onClick={selectAll} title="Select All (Ctrl+A)">Select All</button>
        <button onClick={clearSelection} title="Deselect (Esc)">Deselect</button>
      </div>

      {/* Copy/Paste */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <button onClick={copySelection} disabled={selection.keys.size === 0} title="Copy (Ctrl+C)">Copy</button>
        <button onClick={paste} title="Paste (Ctrl+V)">Paste</button>
        <button onClick={cutSelection} disabled={selection.keys.size === 0} title="Cut (Ctrl+X)">Cut</button>
        <button onClick={duplicateSelection} disabled={selection.keys.size === 0} title="Duplicate (Ctrl+D)">Duplicate</button>
        <button onClick={() => mirrorSelection(false)} disabled={selection.keys.size === 0} title="Mirror (Ctrl+M)">Mirror</button>
      </div>

      {/* Grouping */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <button onClick={handleGroup} disabled={selection.keys.size <= 1} title="Group (Ctrl+G)">Group</button>
      </div>

      {/* Undo/Redo */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <button onClick={undo} title="Undo (Ctrl+Z)">Undo</button>
        <button onClick={redo} title="Redo (Ctrl+Y)">Redo</button>
      </div>

      {/* View controls */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <button onClick={handleZoomOut} title="Zoom Out (-)">-</button>
        <span style={{ padding: '4px 8px', minWidth: '50px', textAlign: 'center' }}>
          {Math.round(canvas.zoom * 100)}%
        </span>
        <button onClick={handleZoomIn} title="Zoom In (+)">+</button>
        <button onClick={handleZoomFit} title="Fit to Window (Ctrl+0)">Fit</button>
        <button onClick={toggleGrid} title="Toggle Grid (G)">
          {grid.enabled ? 'Grid ✓' : 'Grid'}
        </button>
      </div>

      {/* Key size selector */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <select 
          onChange={(e) => {
            const width = parseFloat(e.target.value);
            setCurrentKeyWidth(width);
            if (selection.keys.size > 0) {
              selection.keys.forEach(id => {
                useEditorStore.getState().updateKey(id, { width });
              });
            }
          }}
          disabled={selection.keys.size === 0}
          value={selection.keys.size > 0 ? [...selection.keys][0] ? layout.keys.find(k => k.id === [...selection.keys][0])?.width || 1 : 1 : currentKeyWidth}
        >
          {STANDARD_KEY_SIZES.map(size => (
            <option key={size} value={size}>{size}U</option>
          ))}
        </select>
        
        {/* Rotation input */}
        {selection.keys.size > 0 && (
          <input
            type="number"
            step="15"
            style={{ width: '60px', padding: '4px 8px' }}
            value={selection.keys.size > 0 ? [...selection.keys][0] ? layout.keys.find(k => k.id === [...selection.keys][0])?.rotation || 0 : 0 : 0}
            onChange={(e) => {
              const rotation = parseFloat(e.target.value) || 0;
              selection.keys.forEach(id => {
                useEditorStore.getState().updateKey(id, { rotation });
              });
            }}
            title="Rotation angle (Alt+Arrow to adjust)"
          />
        )}
      </div>

      {/* Layout info */}
      <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#666' }}>
        {layout.keys.length} keys | {selection.keys.size} selected
      </div>
    </div>
  );
};

export default Toolbar;