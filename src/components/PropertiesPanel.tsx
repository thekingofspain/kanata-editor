import { useEditorStore } from '../store';

export const PropertiesPanel: React.FC = () => {
  const { selection, layout, updateKey } = useEditorStore();
  
  const selectedKeys = [...selection.keys];
  const selectedKey = selectedKeys.length === 1 
    ? layout.keys.find(k => k.id === selectedKeys[0])
    : null;
  
  if (selectedKeys.length === 0) {
    return (
      <div className="properties-panel">
        <div className="panel-empty">No key selected</div>
      </div>
    );
  }
  
  if (selectedKeys.length > 1) {
    return (
      <div className="properties-panel">
        <div className="panel-info">{selectedKeys.length} keys selected</div>
      </div>
    );
  }
  
  if (!selectedKey) {
    return (
      <div className="properties-panel">
        <div className="panel-empty">Key not found</div>
      </div>
    );
  }
  
  const handleLegendChange = (field: 'primary' | 'secondary', value: string) => {
    updateKey(selectedKey.id, {
      legend: {
        ...selectedKey.legend,
        [field]: value
      }
    });
  };
  
  const handleLegendColorChange = (field: 'primaryColor' | 'secondaryColor', value: string) => {
    updateKey(selectedKey.id, {
      legend: {
        ...selectedKey.legend,
        [field]: value
      }
    });
  };
  
  const handleKeyColorChange = (value: string) => {
    updateKey(selectedKey.id, { color: value });
  };
  
  return (
    <div className="properties-panel">
      <div className="panel-section">
        <label>Legend</label>
        <div className="legend-row">
          <input
            type="text"
            value={selectedKey.legend.primary || ''}
            onChange={(e) => handleLegendChange('primary', e.target.value)}
            placeholder="Primary"
          />
          <input
            type="color"
            value={selectedKey.legend.primaryColor || '#000000'}
            onChange={(e) => handleLegendColorChange('primaryColor', e.target.value)}
            title="Primary color"
          />
        </div>
        <div className="legend-row">
          <input
            type="text"
            value={selectedKey.legend.secondary || ''}
            onChange={(e) => handleLegendChange('secondary', e.target.value)}
            placeholder="Secondary"
          />
          <input
            type="color"
            value={selectedKey.legend.secondaryColor || '#000000'}
            onChange={(e) => handleLegendColorChange('secondaryColor', e.target.value)}
            title="Secondary color"
          />
        </div>
      </div>
      
      <div className="panel-section compact">
        <label>Key</label>
        <div className="legend-row">
          <input
            type="color"
            value={selectedKey.color || '#ffffff'}
            onChange={(e) => handleKeyColorChange(e.target.value)}
            title="Key color"
          />
          <span>{selectedKey.width.toFixed(1)}U × {selectedKey.height.toFixed(1)}U</span>
          <span>{selectedKey.rotation}°</span>
        </div>
      </div>
      
      <div className="panel-section compact">
        <label>Pos</label>
        <div className="legend-row">
          <span>X: {selectedKey.x.toFixed(1)}U</span>
          <span>Y: {selectedKey.y.toFixed(1)}U</span>
        </div>
      </div>
    </div>
  );
};