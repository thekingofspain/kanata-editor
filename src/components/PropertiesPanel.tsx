import { useEditorStore } from '../store';
import { Key } from '../types';

function getCommonValue<T>(keys: Key[], getter: (k: Key) => T): T | '' {
  const values = keys.map(getter);
  const first = values[0];
  return values.every(v => v === first) ? first : '';
}

export const PropertiesPanel: React.FC = () => {
  const { selection, layout, updateKey } = useEditorStore();
  
  const selectedKeyIds = [...selection.keys];
  const selectedKeys = selectedKeyIds.map(id => layout.keys.find(k => k.id === id)).filter(Boolean) as Key[];
  
  if (selectedKeys.length === 0) {
    return (
      <div className="properties-panel">
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
  
  return (
    <div className="properties-panel">
      {isMulti && (
        <div className="panel-info">{selectedKeys.length} keys selected</div>
      )}
      
      <div className="panel-section">
        <label>Primary</label>
        <div className="legend-row">
          <input
            type="color"
            value={typeof primaryColor === 'string' ? primaryColor : '#000000'}
            onChange={(e) => handleMultiLegendColorChange('primaryColor', e.target.value)}
            title="Primary color"
          />
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
          <input
            type="color"
            value={typeof secondaryColor === 'string' ? secondaryColor : '#000000'}
            onChange={(e) => handleMultiLegendColorChange('secondaryColor', e.target.value)}
            title="Secondary color"
          />
          <input
            type="text"
            value={secondaryLegend}
            onChange={(e) => handleMultiLegendChange('secondary', e.target.value)}
            placeholder="Secondary"
          />
        </div>
      </div>
      
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
      
      <div className="panel-section">
        <label>Key Color</label>
        <div className="legend-row">
          <input
            type="color"
            value={typeof keyColor === 'string' ? keyColor : '#ffffff'}
            onChange={(e) => handleMultiKeyColorChange(e.target.value)}
            title="Key color"
          />
        </div>
      </div>
    </div>
  );
};