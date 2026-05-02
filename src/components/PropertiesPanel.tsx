import { useEditorStore } from '../store';
import { Key } from '../types';
import { useState, useRef, useEffect } from 'react';
import { COLORS } from '../constants';

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
          className="properties-panel-collapsed"
          onClick={() => { setIsCollapsed(false); setPanelWidth(280); }}
          title="Expand panel"
        >
          <div className="panel-collapsed-text">Panel</div>
        </div>
      );
    }
    return (
      <div className="properties-panel" style={{ width: panelWidth }}>
        <div
          className="panel-resize-handle"
          onMouseDown={handleDragStart}
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
  
  const primaryColor = getValue(k => k.legend.primaryColor || COLORS.primary);
  const primaryLegend = getValue(k => k.legend.primary || '');
  const secondaryColor = getValue(k => k.legend.secondaryColor || COLORS.primary);
  const secondaryLegend = getValue(k => k.legend.secondary || '');
  const keyColor = getValue(k => k.color || COLORS.white);
  const width = getValue(k => k.width);
  const height = getValue(k => k.height);
  const rotation = getValue(k => k.rotation);
  const x = getValue(k => k.x);
  const y = getValue(k => k.y);
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
        className="properties-panel-collapsed"
        onClick={() => { setIsCollapsed(false); setPanelWidth(280); }}
        title="Expand panel"
      >
        <div className="panel-collapsed-text">Panel</div>
      </div>
    );
  }

  return (
    <div className="properties-panel-full" style={{ width: panelWidth }}>
      <div
        className="panel-resize-handle"
        onMouseDown={handleDragStart}
        title="Drag to resize"
      />
      {isMulti && (
        <div className="panel-info">{selectedKeys.length} keys selected</div>
      )}
      
      {/* Top half - Properties */}
      <div className="panel-content">
        <fieldset className="panel-fieldset">
          <legend className="panel-legend">Legend</legend>
          <div className="panel-section">
            <label>Primary</label>
            <div className="legend-row">
              {isMulti && primaryColor === '' ? (
                <div className="color-mixed color-mixed-placeholder" onClick={() => handleMultiLegendColorChange('primaryColor', COLORS.primary)} title="Click to set color" />
              ) : (
                <input
                  type="color"
                  value={typeof primaryColor === 'string' ? primaryColor : COLORS.primary}
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
                <div className="color-mixed color-mixed-placeholder" onClick={() => handleMultiLegendColorChange('secondaryColor', COLORS.primary)} title="Click to set color" />
              ) : (
                <input
                  type="color"
                  value={typeof secondaryColor === 'string' ? secondaryColor : COLORS.primary}
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
        
        <fieldset className="panel-fieldset">
          <legend className="panel-legend">Dimensions</legend>
          <div className="panel-section compact">
            <label>Size</label>
            <div className="legend-row">
              <span>W:</span>
              <input
                type="number"
                className="margin-right-sm"
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
            <label>Angle</label>
            <div className="legend-row">
              <span>°</span>
              <input
                type="number"
                className="margin-left-sm"
                value={rotation}
                onChange={(e) => handleMultiRotationChange(e.target.value)}
                step="15"
              />
            </div>
          </div>
          
          <div className="panel-section compact">
            <label>Position</label>
            <div className="legend-row">
              <span>X:</span>
              <input
                type="number"
                className="margin-right-sm"
                value={x}
                onChange={(e) => handleMultiPositionChange('x', e.target.value)}
                step="1"
              />
              <span>Y:</span>
              <input
                type="number"
                value={y}
                onChange={(e) => handleMultiPositionChange('y', e.target.value)}
                step="1"
              />
            </div>
          </div>
        </fieldset>
        
        <fieldset className="panel-fieldset">
          <legend className="panel-legend">Appearance</legend>
          <div className="panel-section">
            <label>Key Color</label>
            <div className="legend-row">
              {isMulti && keyColor === '' ? (
                <div className="color-mixed color-mixed-placeholder" onClick={() => handleMultiKeyColorChange(COLORS.white)} title="Click to set color" />
              ) : (
                <input
                  type="color"
                  value={typeof keyColor === 'string' ? keyColor : COLORS.white}
                  onChange={(e) => handleMultiKeyColorChange(e.target.value)}
                  title="Key color"
                />
              )}
            </div>
          </div>
        </fieldset>
      </div>
      
      {/* Bottom half - Shortcuts */}
      <div className="shortcuts-section">
        <div className="shortcuts-list">
          {shortcuts.map(({ key, action }) => (
            <div key={key} className="shortcut-row">
              <span className="shortcut-action">{action}</span>
              <span className="shortcut-key">{key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};