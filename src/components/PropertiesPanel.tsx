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
  
  return (
    <div className="properties-panel">
      <div className="panel-section">
        <label>Primary Legend</label>
        <input
          type="text"
          value={selectedKey.legend.primary || ''}
          onChange={(e) => handleLegendChange('primary', e.target.value)}
          placeholder="Enter text"
        />
      </div>
      
      <div className="panel-section">
        <label>Secondary Legend</label>
        <input
          type="text"
          value={selectedKey.legend.secondary || ''}
          onChange={(e) => handleLegendChange('secondary', e.target.value)}
          placeholder="Enter text"
        />
      </div>
      
      <div className="panel-section">
        <label>Position</label>
        <div className="panel-row">
          <span>X: {selectedKey.x.toFixed(2)}U</span>
          <span>Y: {selectedKey.y.toFixed(2)}U</span>
        </div>
      </div>
      
      <div className="panel-section">
        <label>Size</label>
        <div className="panel-row">
          <span>W: {selectedKey.width.toFixed(2)}U</span>
          <span>H: {selectedKey.height.toFixed(2)}U</span>
        </div>
      </div>
      
      <div className="panel-section">
        <label>Rotation</label>
        <div className="panel-row">
          <span>{selectedKey.rotation}°</span>
        </div>
      </div>
    </div>
  );
};