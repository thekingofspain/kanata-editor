import { useEditorStore } from '../store';

export function StatusBar() {
  const canvas = useEditorStore(s => s.canvas);
  const setCanvasZoom = useEditorStore(s => s.setCanvasZoom);

  const handleZoomIn = () => setCanvasZoom(canvas.zoom * 1.25);
  const handleZoomOut = () => setCanvasZoom(canvas.zoom / 1.25);

  const handleFit = () => {
    const keys = useEditorStore.getState().layout.keys;
    if (keys.length === 0) {
      setCanvasZoom(1);
      useEditorStore.getState().setCanvasPan({ x: 0, y: 0 });
      return;
    }
    const container = document.querySelector('.canvas-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const padding = 40;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    keys.forEach(k => {
      minX = Math.min(minX, k.x);
      minY = Math.min(minY, k.y);
      maxX = Math.max(maxX, k.x + k.width);
      maxY = Math.max(maxY, k.y + k.height);
    });
    const width = maxX - minX || 1;
    const height = maxY - minY || 1;
    const scaleX = (rect.width - padding * 2) / width;
    const scaleY = (rect.height - padding * 2) / height;
    setCanvasZoom(Math.min(scaleX, scaleY, 2));
  };

  return (
    <div className="status-bar" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '4px 12px',
      borderTop: '1px solid #e0e0e0',
      background: '#f8f8f8',
      fontSize: '13px'
    }}>
      <span>{Math.round(canvas.pan.x)}, {Math.round(canvas.pan.y)}</span>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button onClick={handleZoomOut} title="Zoom Out" style={{ padding: '2px 8px' }}>-</button>
        <input
          type="number"
          value={Math.round(canvas.zoom * 100)}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 100;
            setCanvasZoom(Math.max(25, Math.min(400, val)) / 100);
          }}
          style={{ width: '50px', textAlign: 'center', padding: '2px 4px' }}
        />
        <button onClick={handleZoomIn} title="Zoom In" style={{ padding: '2px 8px' }}>+</button>
        <span>%</span>
        <button onClick={handleFit} title="Fit to Window" style={{ marginLeft: '8px' }}>Fit</button>
      </div>
    </div>
  );
}