import { useEditorStore } from '../store';
import { Key } from '../types';
import { useState, useRef, useEffect } from 'react';

function getCommonValue<T>(keys: Key[], getter: (k: Key) => T): T | '' {
  const values = keys.map(getter);
  const first = values[0];
  return values.every(v => v === first) ? first : '';
}

export const PropertiesPanel: React.FC = () => {
  const { selection, layout, updateKey } = useEditorStore();
  const [panelWidth, setPanelWidth] = useState(280);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dragRef = useRef<number>(0);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(280);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragRef.current === 0) return;
      const delta = startXRef.current - e.clientX;
      const newWidth = Math.max(0, Math.min(500, startWidthRef.current + delta));
      setPanelWidth(newWidth);
      setIsCollapsed(newWidth <= 10);
    };

    const handleMouseUp = () => {
      dragRef.current = 0;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleDragStart = (e: React.MouseEvent) => {
    dragRef.current = 1;
    startXRef.current = e.clientX;
    startWidthRef.current = panelWidth;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };
  
  const selectedKeyIds = [...selection.keys];
  const selectedKeys = selectedKeyIds.map(id => layout.keys.find(k => k.id === id)).filter(Boolean) as Key[];
  
  if (selectedKeys.length === 0) {
    if (isCollapsed) {
      return (
        <div
          style={{
            width: '20px',
            background: '#f5f5f5',
            borderLeft: '3px solid #ddd',
            cursor: 'ew-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => { setIsCollapsed(false); setPanelWidth(280); }}
          title="Expand panel"
        >
          <div style={{ writingMode: 'vertical-rl', fontSize: '10px', color: '#666' }}>Panel</div>
        </div>
      );
    }
    return (
      <div className="properties-panel" style={{ width: panelWidth }}>
        <div
          onMouseDown={handleDragStart}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            cursor: 'ew-resize',
            background: 'transparent',
            zIndex: 10
          }}
          title="Drag to resize"
        />
        <div className="panel-empty">No key selected</div>
      </div>
    );
  }
  
  const isMulti = selectedKeys.length > 1;
  
  const getValue = <T,>(getter: (k: Key) => T): T | '' => {
    return getCommonValue(selectedKeys, getter);
  };
  
  const updateAll = (update: Partial<Key>) => {
    selectedKeyIds.forEach(id => updateKey(id, update));
  };
  
  const handleMultiLegendChange = (field: 'primary' | 'secondary', value: string) => {
    selectedKeyIds.forEach(id => {
      const key = selectedKeys.find(k => k.id === id);
      if (key) {
        updateKey(id, { legend: { ...key.legend, [field]: value } });
      }
    });
  };
  
  const handleMultiLegendColorChange = (field: 'primaryColor' | 'secondaryColor', value: string) => {
    selectedKeyIds.forEach(id => {
      const key = selectedKeys.find(k => k.id === id);
      if (key) {
        updateKey(id, { legend: { ...key.legend, [field]: value } });
      }
    });
  };
  
  const handleMultiKeyColorChange = (value: string) => {
    updateAll({ color: value });
  };
  
  const handleMultiSizeChange = (field: 'width' | 'height', value: string) => {
    const num = Math.max(0.25, parseFloat(value) || 1);
    updateAll({ [field]: num });
  };
  
  const handleMultiRotationChange = (value: string) => {
    const num = parseFloat(value) || 0;
    updateAll({ rotation: num % 360 });
  };
  
  const handleMultiPositionChange = (field: 'x' | 'y', value: string) => {
    const num = parseFloat(value) || 0;
    updateAll({ [field]: num });
  };
  
  const primaryColor = getValue(k => k.legend.primaryColor || '#000000');
  const primaryLegend = getValue(k => k.legend.primary || '');
  const secondaryColor = getValue(k => k.legend.secondaryColor || '#000000');
  const secondaryLegend = getValue(k => k.legend.secondary || '');
  const keyColor = getValue(k => k.color || '#ffffff');
  const width = getValue(k => k.width);
  const height = getValue(k => k.height);
  const rotation = getValue(k => k.rotation);
  const x = getValue(k => k.x);
  const y = getValue(k => k.y);
  const mixedColorStyle = { border: '2px dashed #999', background: 'transparent' };
  
  const shortcuts = [
    { key: 'Ctrl+A', action: 'Select All' },
    { key: 'Ctrl+C', action: 'Copy' },
    { key: 'Ctrl+V', action: 'Paste' },
    { key: 'Ctrl+X', action: 'Cut' },
    { key: 'Ctrl+G', action: 'Group' },
    { key: 'Ctrl+Shift+G', action: 'Ungroup' },
    { key: 'Ctrl+M', action: 'Mirror' },
    { key: 'Ctrl+Z', action: 'Undo' },
    { key: 'Ctrl+Y', action: 'Redo' },
    { key: 'Del', action: 'Delete' },
    { key: 'Esc', action: 'Deselect' },
    { key: 'N', action: 'New Key' },
    { key: 'Arrow', action: 'Move' },
    { key: 'Alt+Arrow', action: 'Rotate' },
    { key: 'Ctrl+Arrow', action: 'Resize' },
  ];

  if (isCollapsed) {
    return (
      <div
        style={{
          width: '20px',
          background: '#f5f5f5',
          borderLeft: '3px solid #ddd',
          cursor: 'ew-resize',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => { setIsCollapsed(false); setPanelWidth(280); }}
        title="Expand panel"
      >
        <div style={{ writingMode: 'vertical-rl', fontSize: '10px', color: '#666' }}>Panel</div>
      </div>
    );
  }

  return (
    <div className="properties-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: panelWidth, position: 'relative' }}>
      <div
        onMouseDown={handleDragStart}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '6px',
          cursor: 'ew-resize',
          background: 'transparent',
          zIndex: 10
        }}
        title="Drag to resize"
      />
      {isMulti && (
        <div className="panel-info">{selectedKeys.length} keys selected</div>
      )}
      
      {/* Top half - Properties */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <fieldset style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '8px', margin: 0 }}>
          <legend style={{ fontSize: '10px', color: '#666', fontWeight: 600 }}>Legend</legend>
          <div className="panel-section">
            <label>Primary</label>
            <div className="legend-row">
              {isMulti && primaryColor === '' ? (
                <div className="color-mixed" onClick={() => handleMultiLegendColorChange('primaryColor', '#000000')} style={mixedColorStyle} title="Click to set color" />
              ) : (
                <input
                  type="color"
                  value={typeof primaryColor === 'string' ? primaryColor : '#000000'}
                  onChange={(e) => handleMultiLegendColorChange('primaryColor', e.target.value)}
                  title="Primary color"
                />
              )}
              <input
                type="text"
                value={primaryLegend}
                onChange={(e) => handleMultiLegendChange('primary', e.target.value)}
                placeholder="Primary"
              />
            </div>
          </div>
          
          <div className="panel-section">
            <label>Secondary</label>
            <div className="legend-row">
              {isMulti && secondaryColor === '' ? (
                <div className="color-mixed" onClick={() => handleMultiLegendColorChange('secondaryColor', '#000000')} style={mixedColorStyle} title="Click to set color" />
              ) : (
                <input
                  type="color"
                  value={typeof secondaryColor === 'string' ? secondaryColor : '#000000'}
                  onChange={(e) => handleMultiLegendColorChange('secondaryColor', e.target.value)}
                  title="Secondary color"
                />
              )}
              <input
                type="text"
                value={secondaryLegend}
                onChange={(e) => handleMultiLegendChange('secondary', e.target.value)}
                placeholder="Secondary"
              />
            </div>
          </div>
        </fieldset>
        
        <fieldset style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '8px', margin: 0 }}>
          <legend style={{ fontSize: '10px', color: '#666', fontWeight: 600 }}>Dimensions</legend>
          <div className="panel-section compact">
            <label>Size</label>
            <div className="legend-row">
              <span>W:</span>
              <input
                type="number"
                value={width}
                onChange={(e) => handleMultiSizeChange('width', e.target.value)}
                step="0.25"
                min="0.25"
              />
              <span>H:</span>
              <input
                type="number"
                value={height}
                onChange={(e) => handleMultiSizeChange('height', e.target.value)}
                step="0.25"
                min="0.25"
              />
            </div>
          </div>
          
          <div className="panel-section compact">
            <label>Rotation</label>
            <div className="legend-row">
              <input
                type="number"
                value={rotation}
                onChange={(e) => handleMultiRotationChange(e.target.value)}
                step="15"
              />
              <span>°</span>
            </div>
          </div>
          
          <div className="panel-section compact">
            <label>Position</label>
            <div className="legend-row">
              <span>X:</span>
              <input
                type="number"
                value={x}
                onChange={(e) => handleMultiPositionChange('x', e.target.value)}
                step="0.25"
              />
              <span>Y:</span>
              <input
                type="number"
                value={y}
                onChange={(e) => handleMultiPositionChange('y', e.target.value)}
                step="0.25"
              />
            </div>
          </div>
        </fieldset>
        
        <fieldset style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '8px', margin: 0 }}>
          <legend style={{ fontSize: '10px', color: '#666', fontWeight: 600 }}>Appearance</legend>
          <div className="panel-section">
            <label>Key Color</label>
            <div className="legend-row">
              {isMulti && keyColor === '' ? (
                <div className="color-mixed" onClick={() => handleMultiKeyColorChange('#ffffff')} style={mixedColorStyle} title="Click to set color" />
              ) : (
                <input
                  type="color"
                  value={typeof keyColor === 'string' ? keyColor : '#ffffff'}
                  onChange={(e) => handleMultiKeyColorChange(e.target.value)}
                  title="Key color"
                />
              )}
            </div>
          </div>
        </fieldset>
      </div>
      
      {/* Bottom half - Shortcuts */}
      <div style={{ 
        borderTop: '1px solid #e0e0e0', 
        padding: '8px',
        background: '#f5f5f5',
        fontSize: '11px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {shortcuts.map(({ key, action }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#666', textAlign: 'right', minWidth: '80px' }}>{action}</span>
              <span style={{ 
                background: '#fff', 
                padding: '2px 4px', 
                borderRadius: '3px',
                fontFamily: 'monospace',
                fontSize: '10px',
                border: '1px solid #ddd',
                marginLeft: '12px'
              }}>{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};