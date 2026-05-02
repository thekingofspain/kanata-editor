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
    <div className="status-bar">
      <span>{Math.round(canvas.pan.x)}, {Math.round(canvas.pan.y)}</span>
      
      <div className="status-bar-controls">
        <button className="status-bar-btn" onClick={handleZoomOut} title="Zoom Out">-</button>
        <input
          type="number"
          className="status-bar-input"
          value={Math.round(canvas.zoom * 100)}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 100;
            setCanvasZoom(Math.max(25, Math.min(400, val)) / 100);
          }}
        />
        <button className="status-bar-btn" onClick={handleZoomIn} title="Zoom In">+</button>
        <span>%</span>
        <button className="status-bar-fit" onClick={handleFit} title="Fit to Window">Fit</button>
      </div>
    </div>
  );
}