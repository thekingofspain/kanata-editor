import { useEditorStore } from '../store';
import { STANDARD_KEY_SIZES, KEYBOARD_PRESETS, loadPreset } from '../types';
import { useState } from 'react';

const IconButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, disabled, pressed, title, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    style={{
      padding: '6px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '32px',
      background: pressed ? '#e0e0e0' : '#fff',
      border: pressed ? '1px solid #888' : '1px solid #ccc',
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: disabled ? '#999' : '#000'
    }}
  >
    {children}
  </button>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const PasteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
  </svg>
);

const CutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const MirrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18" />
    <path d="M8 6l-4 6 4 6" />
    <path d="M16 6l4 6-4 6" />
  </svg>
);

const GroupIcon: React.FC<{ filled?: boolean; disabled?: boolean }> = ({ filled, disabled }) => {
  const isEnabled = !disabled;
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={disabled ? "#999" : "#ff8800"} strokeWidth={filled && isEnabled ? 2.5 : 2} strokeDasharray={filled && isEnabled ? "2 1" : "none"}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
};

const UngroupIcon: React.FC<{ selected?: boolean; disabled?: boolean }> = ({ selected, disabled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={disabled ? "#999" : (selected ? "#0066ff" : "currentColor")} strokeWidth={selected ? 2.5 : 2}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <line x1="10" y1="10" x2="14" y2="14" strokeDasharray="2 2" />
  </svg>
);

const UndoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7v6h6" />
    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6.58 2.56L3 13" />
  </svg>
);

const RedoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 7v6h-6" />
    <path d="M3 17a9 9 0 019-9 9 9 0 016.58 2.56L21 13" />
  </svg>
);

export const Toolbar: React.FC = () => {
  const [currentKeyWidth, setCurrentKeyWidth] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState("");
  const {
    layout,
    grid,
    selection,
    history,
    future,
    addKey,
    removeKeys,
    copySelection,
    paste,
    cutSelection,
    mirrorSelection,
    groupKeys,
    ungroupKeys,
    undo,
    redo,
    toggleGrid,
    setCanvasZoom,
    selectAll,
    clearSelection,
    loadLayout,
    selectKey,
    updateKey,
    newLayout,
    setLastMousePos
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
    const selectedKeys = [...selection.keys];
    
    if (selectedKeys.length > 0) {
      const lastKeyId = selection.lastSelected;
      const lastKey = layout.keys.find(k => k.id === lastKeyId);
      if (lastKey) {
        const newKey = addKey(lastKey.x + lastKey.width, lastKey.y);
        selectKey(newKey.id);
        return;
      }
    }
    
    setLastMousePos(null);
    const newKey = addKey(0, 0, currentKeyWidth, 1);
    selectKey(newKey.id);
  };

  const handleDelete = () => {
    if (selection.keys.size > 0) {
      removeKeys([...selection.keys]);
    }
  };

  const handleGroup = () => {
    if (selection.keys.size > 1) {
      groupKeys([...selection.keys], 'New Group');
    }
  };

  const handleUngroup = () => {
    const selectedKeyIds = [...selection.keys];
    const selectedKeys = selectedKeyIds
      .map(id => layout.keys.find(k => k.id === id))
      .filter((k): k is NonNullable<typeof k> => k !== undefined);
    const groupIds = selectedKeys
      .filter(k => k.groupId)
      .map(k => k.groupId);
    if (groupIds.length > 0) {
      ungroupKeys(groupIds[0]!);
    }
  };

  const hasSelection = selection.keys.size > 0;
  const hasMultipleSelection = selection.keys.size > 1;
  const hasGroupedSelection = hasSelection && [...selection.keys].some(id => {
    const key = layout.keys.find(k => k.id === id);
    return key && key.groupId;
  });
  const canGroup = hasMultipleSelection && !([...selection.keys].every(id => {
    const key = layout.keys.find(k => k.id === id);
    return key && key.groupId;
  }));
  const groupButtonDisabled = !canGroup;
  const ungroupButtonDisabled = !hasGroupedSelection;

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
        <button onClick={newLayout}>New</button>
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
        <button onClick={handleDelete} disabled={!hasSelection} title="Delete (Del)">Delete</button>
        <button onClick={selectAll} title="Select All (Ctrl+A)">Select All</button>
        <button onClick={clearSelection} disabled={!hasSelection} title="Deselect (Esc)">Deselect</button>
      </div>

      {/* Copy/Paste/Cut/Mirror - with icons */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <IconButton onClick={copySelection} disabled={!hasSelection} title="Copy (Ctrl+C)">
          <CopyIcon />
        </IconButton>
        <IconButton onClick={paste} title="Paste (Ctrl+V)">
          <PasteIcon />
        </IconButton>
        <IconButton onClick={cutSelection} disabled={!hasSelection} title="Cut (Ctrl+X)">
          <CutIcon />
        </IconButton>
        <IconButton onClick={() => mirrorSelection(false)} disabled={!hasSelection} title="Mirror (Ctrl+M)">
          <MirrorIcon />
        </IconButton>
      </div>

      {/* Group/Ungroup in the middle */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <IconButton onClick={handleGroup} disabled={groupButtonDisabled} title="Group (Ctrl+G)">
          <GroupIcon filled={hasGroupedSelection} disabled={groupButtonDisabled} />
        </IconButton>
        <IconButton onClick={handleUngroup} disabled={ungroupButtonDisabled} title="Ungroup (Ctrl+Shift+G)">
          <UngroupIcon selected={hasGroupedSelection} disabled={ungroupButtonDisabled} />
        </IconButton>
      </div>

      {/* Undo/Redo */}
      <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid #e0e0e0', paddingRight: '8px' }}>
        <IconButton onClick={undo} disabled={history.length === 0} title="Undo (Ctrl+Z)">
          <UndoIcon />
        </IconButton>
        <IconButton onClick={redo} disabled={future.length === 0} title="Redo (Ctrl+Y)">
          <RedoIcon />
        </IconButton>
      </div>

      {/* View controls - right aligned */}
      <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
        <button 
          onClick={toggleGrid} 
          title="Toggle Grid (G)"
          style={{
            background: grid.enabled ? '#e0e0e0' : '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Grid
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
                updateKey(id, { width });
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
                updateKey(id, { rotation });
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