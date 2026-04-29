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
  
  const handlePositionChange = (field: 'x' | 'y', value: string) => {
    const num = parseFloat(value) || 0;
    updateKey(selectedKey.id, { [field]: num });
  };
  
  const handleSizeChange = (field: 'width' | 'height', value: string) => {
    const num = Math.max(0.25, parseFloat(value) || 1);
    updateKey(selectedKey.id, { [field]: num });
  };
  
  const handleRotationChange = (value: string) => {
    const num = parseFloat(value) || 0;
    updateKey(selectedKey.id, { rotation: num % 360 });
  };
  
  return (
    <div className="properties-panel">
      <div className="panel-section">
        <label>Primary</label>
        <div className="legend-row">
          <input
            type="color"
            value={selectedKey.legend.primaryColor || '#000000'}
            onChange={(e) => handleLegendColorChange('primaryColor', e.target.value)}
            title="Primary color"
          />
          <input
            type="text"
            value={selectedKey.legend.primary || ''}
            onChange={(e) => handleLegendChange('primary', e.target.value)}
            placeholder="Primary"
          />
        </div>
      </div>
      
      <div className="panel-section">
        <label>Secondary</label>
        <div className="legend-row">
          <input
            type="color"
            value={selectedKey.legend.secondaryColor || '#000000'}
            onChange={(e) => handleLegendColorChange('secondaryColor', e.target.value)}
            title="Secondary color"
          />
          <input
            type="text"
            value={selectedKey.legend.secondary || ''}
            onChange={(e) => handleLegendChange('secondary', e.target.value)}
            placeholder="Secondary"
          />
        </div>
      </div>
      
      <div className="panel-section compact">
        <label>Size</label>
        <div className="legend-row">
          <input
            type="number"
            value={selectedKey.width}
            onChange={(e) => handleSizeChange('width', e.target.value)}
            step="0.25"
            min="0.25"
          />
          <span>×</span>
          <input
            type="number"
            value={selectedKey.height}
            onChange={(e) => handleSizeChange('height', e.target.value)}
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
            value={selectedKey.rotation}
            onChange={(e) => handleRotationChange(e.target.value)}
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
            value={selectedKey.x}
            onChange={(e) => handlePositionChange('x', e.target.value)}
            step="0.25"
          />
          <span>Y:</span>
          <input
            type="number"
            value={selectedKey.y}
            onChange={(e) => handlePositionChange('y', e.target.value)}
            step="0.25"
          />
        </div>
      </div>
      
      <div className="panel-section">
        <label>Key Color</label>
        <div className="legend-row">
          <input
            type="color"
            value={selectedKey.color || '#ffffff'}
            onChange={(e) => handleKeyColorChange(e.target.value)}
            title="Key color"
          />
        </div>
      </div>
    </div>
  );
};