import { useRef, useEffect, useState, useCallback } from 'react';
import { useEditorStore } from '../store';
import { DEFAULT_UNIT_SIZE, STANDARD_KEY_SIZES, Key } from '../types';

const KeyShapes: React.FC = () => {
  const unitSize = DEFAULT_UNIT_SIZE;
  return (
    <defs>
      {STANDARD_KEY_SIZES.map(size => (
        <rect 
          key={`key-${size}U`} 
          id={`key-${size}U`} 
          width={size * unitSize} 
          height={unitSize}
          rx="1"
        />
      ))}
      <rect id="key-shape-rect" width="100%" height="100%" rx="0" />
      <rect id="key-shape-rounded" width="100%" height="100%" rx="2" />
      <path id="key-shape-isoEnter" d="M0,0 h19.05 v9.525 h4.7625 v9.525 h-4.7625 v9.525 h-9.525 v-9.525 h-4.7625 v-9.525 h4.7625 v-9.525 Z" />
      <rect id="key-shape-block" width="100%" height="100%" rx="0" stroke="#999" strokeWidth="0.5" />
      <path id="key-shape-barrel" d="M0,4 a4,4 0 0 1 4,-4 h11.05 a4,4 0 0 1 4,4 v11.05 a4,4 0 0 1 -4,4 h-11.05 a4,4 0 0 1 -4,-4 z" />
      <rect id="selection-outline" width="100%" height="100%" fill="none" stroke="#0066ff" strokeWidth="2" strokeDasharray="4,2" transform="translate(-2, -2)" />
      <g id="rotation-handle">
        <line x1="0" y1="0" x2="0" y2="-20" stroke="#0066ff" strokeWidth="2" />
        <circle cx="0" cy="-20" r="5" fill="#0066ff" />
      </g>
      <filter id="key-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
      </filter>
    </defs>
  );
};

interface KeyElementProps {
  keyData: Key;
  isSelected: boolean;
  unitSize: number;
  onSelect: (id: string, e: React.MouseEvent) => void;
  onDragStart: (id: string, e: React.MouseEvent) => void;
  onDoubleClick: (id: string) => void;
}

const KEY_GAP = 0.08;

const KeyElement: React.FC<KeyElementProps> = ({
  keyData,
  isSelected,
  unitSize,
  onSelect,
  onDragStart,
  onDoubleClick
}) => {
  const width = keyData.width * unitSize - KEY_GAP;
  const height = keyData.height * unitSize - KEY_GAP;
  const centerX = width / 2;
  const centerY = height / 2;
  
  const transform = `translate(${keyData.x * unitSize + KEY_GAP / 2}, ${keyData.y * unitSize + KEY_GAP / 2}) rotate(${keyData.rotation}, ${centerX}, ${centerY})`;
          
  return (
    <g className={`key ${isSelected ? 'selected' : ''}`} data-key-id={keyData.id} transform={transform} onClick={(e) => onSelect(keyData.id, e)} onMouseDown={(e) => onDragStart(keyData.id, e)} onDoubleClick={() => onDoubleClick(keyData.id)} style={{ cursor: 'move' }}>
      <rect width={width} height={height} fill={keyData.color} rx="2" stroke="#000" strokeWidth="1" />
      
      {Object.entries(keyData.legend).map(([position, legend]) => legend && (
        <text key={position} className={`legend legend-${position}`} fill={legend.color || '#000'} fontSize={legend.fontSize || 12} textAnchor="middle" dominantBaseline="middle" {...getLegendPosition(position, width, height)}>
          {legend.text}
        </text>
      ))}
      
      {isSelected && (
        <rect x={-1} y={-1} width={width + 2} height={height + 2} fill="none" stroke="#000" strokeWidth={2} rx="3" />
      )}
    </g>
  );
};

const getLegendPosition = (position: string, width: number, height: number) => {
  const positions: Record<string, { x: number; y: number }> = {
    top: { x: width / 2, y: height * 0.25 },
    topLeft: { x: width * 0.2, y: height * 0.25 },
    topRight: { x: width * 0.8, y: height * 0.25 },
    center: { x: width / 2, y: height / 2 },
    bottom: { x: width / 2, y: height * 0.75 },
    bottomLeft: { x: width * 0.2, y: height * 0.75 },
    bottomRight: { x: width * 0.8, y: height * 0.75 },
    left: { x: width * 0.2, y: height / 2 },
    right: { x: width * 0.8, y: height / 2 }
  };
  return positions[position] || { x: width / 2, y: height / 2 };
};

export const Canvas: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragKeyId, setDragKeyId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectionBox, setSelectionBox] = useState<{ start: { x: number; y: number }; end: { x: number; y: number } } | null>(null);
  const [isCloning, setIsCloning] = useState(false);
  
  const { layout, canvas, grid, selection, updateKey, selectKey, toggleKeySelection, selectKeys, clearSelection, setCanvasPan, setCanvasZoom, setLastMousePos, setCanvasSize, removeKeys, duplicateSelection } = useEditorStore();
  const { pan, zoom, lastMousePos } = canvas;
  const unitSize = layout.unitSize || DEFAULT_UNIT_SIZE;
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        setCanvasSize({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [setCanvasSize]);
  
  const screenToCanvas = useCallback((screenX: number, screenY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const x = (screenX - rect.left - pan.x) / zoom / unitSize;
    const y = (screenY - rect.top - pan.y) / zoom / unitSize;
    return { x, y };
  }, [pan, zoom, unitSize]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selection.keys.size > 0) removeKeys([...selection.keys]);
      }
      
      if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        selectKeys(layout.keys.map(k => k.id));
      }
      
      if (e.key === 'Escape') clearSelection();
      
      if (selection.keys.size > 0) {
        const step = e.shiftKey ? 1 : 0.25;
        
        if (e.key === 'ArrowUp') { 
          e.preventDefault(); 
          if (e.ctrlKey) {
            // Ctrl+Up = increase height
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key && key.height < 8) updateKey(id, { height: Math.min(8, key.height + 0.5) }); }); 
          } else {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { y: key.y - step }); }); 
          }
        }
        if (e.key === 'ArrowDown') { 
          e.preventDefault(); 
          if (e.ctrlKey) {
            // Ctrl+Down = decrease height
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key && key.height > 0.25) updateKey(id, { height: Math.max(0.25, key.height - 0.5) }); }); 
          } else {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { y: key.y + step }); }); 
          }
        }
        if (e.key === 'ArrowLeft') { 
          e.preventDefault(); 
          if (e.ctrlKey) {
            // Ctrl+Left = decrease width
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key && key.width > 0.25) updateKey(id, { width: Math.max(0.25, key.width - 0.5) }); }); 
          } else {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { x: key.x - step }); }); 
          }
        }
        if (e.key === 'ArrowRight') { 
          e.preventDefault(); 
          if (e.ctrlKey) {
            // Ctrl+Right = increase width
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key && key.width < 8) updateKey(id, { width: Math.min(8, key.width + 0.5) }); }); 
          } else {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { x: key.x + step }); }); 
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selection.keys, layout.keys, removeKeys, selectKeys, clearSelection, updateKey]);
  
  // Handle keyup to cancel cloning if user releases Ctrl
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        setIsCloning(false);
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);
  
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setCanvasZoom(Math.max(0.25, Math.min(4, zoom * delta)));
    } else {
      setCanvasPan({ x: pan.x - e.deltaX, y: pan.y - e.deltaY });
    }
  }, [zoom, pan, setCanvasZoom, setCanvasPan]);
  
  const handleKeySelect = (keyId: string, e: React.MouseEvent) => {
    if (e.shiftKey && selection.lastSelected) {
      const startIndex = layout.keys.findIndex(k => k.id === selection.lastSelected);
      const endIndex = layout.keys.findIndex(k => k.id === keyId);
      const rangeIds = layout.keys.slice(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex) + 1).map(k => k.id);
      selectKeys([...selection.keys, ...rangeIds]);
    } else if (e.ctrlKey || e.metaKey) {
      toggleKeySelection(keyId);
    } else {
      selectKey(keyId);
    }
  };
  
  const handleKeyDoubleClick = (keyId: string) => {
    const key = layout.keys.find(k => k.id === keyId);
    if (!key) return;
    
    const currentText = key.legend.center?.text || '';
    const newText = prompt('Enter key label:', currentText) || '';
    
    if (newText !== currentText) {
      updateKey(keyId, {
        legend: {
          ...key.legend,
          center: { text: newText, color: '#000' }
        }
      });
    }
  };
  
  const handleDragStart = (keyId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selection.keys.has(keyId)) selectKey(keyId);
    
    // Start clone mode if Ctrl is held and key is already selected
    if (e.ctrlKey && selection.keys.has(keyId)) {
      setIsCloning(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    } else {
      setIsDragging(true);
      setDragKeyId(keyId);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Clone mode: if Ctrl is held and user starts dragging a selected key
    if (isCloning) {
      // On first move, create the clone
      duplicateSelection();
      setIsCloning(false);
      setIsDragging(true);
      // Get the newly cloned keys (these are already selected by duplicateSelection)
      const newSelection = [...selection.keys];
      setDragKeyId(newSelection[0] || null);
      setDragStart({ x: e.clientX, y: e.clientY });
      // Clear selection - only cloned keys should be selected (they were just created by duplicateSelection)
      clearSelection();
      // Select only the new cloned keys
      newSelection.forEach(id => selectKey(id));
    } else if (isDragging && dragKeyId) {
      const dx = (e.clientX - dragStart.x) / zoom / unitSize;
      const dy = (e.clientY - dragStart.y) / zoom / unitSize;
      
      const selectedKeyIds = selection.keys.has(dragKeyId) ? [...selection.keys] : [dragKeyId];
      
      selectedKeyIds.forEach(id => {
        const key = layout.keys.find(k => k.id === id);
        if (key) {
          const newX = grid.snapEnabled ? Math.round((key.x + dx) / 0.125) * 0.125 : key.x + dx;
          const newY = grid.snapEnabled ? Math.round((key.y + dy) / 0.125) * 0.125 : key.y + dy;
          updateKey(id, { x: newX, y: newY });
        }
      });
      
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (isPanning) {
      setCanvasPan({ x: pan.x + (e.clientX - panStart.x), y: pan.y + (e.clientY - panStart.y) });
      setPanStart({ x: e.clientX, y: e.clientY });
    } else if (selectionBox) {
      const start = screenToCanvas(e.clientX, e.clientY);
      setSelectionBox(prev => prev ? { ...prev, end: start } : null);
    } else {
      const pos = screenToCanvas(e.clientX, e.clientY);
      setLastMousePos(pos);
    }
  }, [isDragging, dragKeyId, dragStart, selection.keys, layout.keys, zoom, unitSize, grid.snapEnabled, updateKey, isPanning, panStart, pan, setCanvasPan, selectionBox, screenToCanvas, setLastMousePos]);
  
  const handleMouseUp = useCallback(() => {
    if (isDragging) { setIsDragging(false); setDragKeyId(null); }
    if (isPanning) setIsPanning(false);
    if (selectionBox) {
      const minX = Math.min(selectionBox.start.x, selectionBox.end.x);
      const maxX = Math.max(selectionBox.start.x, selectionBox.end.x);
      const minY = Math.min(selectionBox.start.y, selectionBox.end.y);
      const maxY = Math.max(selectionBox.start.y, selectionBox.end.y);
      const selectedIds = layout.keys.filter(k => k.x >= minX && k.x + k.width <= maxX && k.y >= minY && k.y + k.height <= maxY).map(k => k.id);
      if (selectedIds.length > 0) selectKeys(selectedIds);
      setSelectionBox(null);
    }
  }, [isDragging, isPanning, selectionBox, layout.keys, selectKeys]);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as Element).closest('#grid-layer')) {
      const pos = screenToCanvas(e.clientX, e.clientY);
      if (e.shiftKey) {
        setSelectionBox({ start: pos, end: pos });
      } else {
        clearSelection();
      }
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    } else if (e.button === 0 && e.ctrlKey && selection.keys.size > 0) {
      // Ctrl + drag = duplicate and drag (Visio behavior)
      e.preventDefault();
      e.stopPropagation();
      duplicateSelection();
      const newKeys = [...selection.keys];
      setDragKeyId(newKeys[0] || null);
      setDragStart({ x: e.clientX, y: e.clientY });
      setIsDragging(true);
    }
  };
  
  const gridLines: JSX.Element[] = [];
  const halfWidth = dimensions.width / 2 / zoom / unitSize;
  const halfHeight = dimensions.height / 2 / zoom / unitSize;
  const panX = Math.abs(pan.x / zoom / unitSize);
  const panY = Math.abs(pan.y / zoom / unitSize);
  const gridExtent = Math.ceil(Math.max(halfWidth + panX, halfHeight + panY, halfWidth + panY, halfHeight + panX)) + 10;
  
  if (grid.enabled) {
    for (let i = -gridExtent; i <= gridExtent; i++) {
      const pos = i * unitSize;
      
      if (grid.showMajor && i % 4 === 0) {
        gridLines.push(<line key={`v-major-${i}`} x1={pos} y1={-gridExtent * unitSize} x2={pos} y2={gridExtent * unitSize} stroke={grid.majorColor} strokeWidth={1 / zoom} opacity={grid.opacity} />);
        gridLines.push(<line key={`h-major-${i}`} x1={-gridExtent * unitSize} y1={pos} x2={gridExtent * unitSize} y2={pos} stroke={grid.majorColor} strokeWidth={1 / zoom} opacity={grid.opacity} />);
      }
      
      if (grid.showMinor && i % 4 !== 0) {
        gridLines.push(<line key={`v-minor-${i}`} x1={pos} y1={-gridExtent * unitSize} x2={pos} y2={gridExtent * unitSize} stroke={grid.color} strokeWidth={0.5 / zoom} opacity={grid.opacity * 0.5} />);
        gridLines.push(<line key={`h-minor-${i}`} x1={-gridExtent * unitSize} y1={pos} x2={gridExtent * unitSize} y2={pos} stroke={grid.color} strokeWidth={0.5 / zoom} opacity={grid.opacity * 0.5} />);
      }
    }
  }
  
  return (
    <div ref={containerRef} className="canvas-container" style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#f5f5f5' }}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} onWheel={handleWheel} onClick={handleCanvasClick} onMouseDown={handleMouseDown} style={{ cursor: isPanning ? 'grabbing' : 'default' }}>
        <KeyShapes />
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          <g id="grid-layer">{gridLines}</g>
          <g id="keys-layer">
            {layout.keys.filter(key => !selection.keys.has(key.id)).map(key => (
              <KeyElement key={key.id} keyData={key} isSelected={false} unitSize={unitSize} onSelect={handleKeySelect} onDragStart={handleDragStart} onDoubleClick={handleKeyDoubleClick} />
            ))}
          </g>
          <g id="selected-keys-layer">
            {layout.keys.filter(key => selection.keys.has(key.id)).map(key => (
              <KeyElement key={key.id} keyData={key} isSelected={true} unitSize={unitSize} onSelect={handleKeySelect} onDragStart={handleDragStart} onDoubleClick={handleKeyDoubleClick} />
            ))}
          </g>
          {selectionBox && (
            <rect x={Math.min(selectionBox.start.x, selectionBox.end.x) * unitSize} y={Math.min(selectionBox.start.y, selectionBox.end.y) * unitSize} width={Math.abs(selectionBox.end.x - selectionBox.start.x) * unitSize} height={Math.abs(selectionBox.end.y - selectionBox.start.y) * unitSize} fill="rgba(0, 102, 255, 0.1)" stroke="#0066ff" strokeWidth={1 / zoom} strokeDasharray={`${4 / zoom},${2 / zoom}`} rx="4" />
          )}
        </g>
      </svg>
      <div className="zoom-indicator" style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
        {Math.round(zoom * 100)}%
      </div>
      {lastMousePos && (
        <div className="mouse-position" style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace' }}>
          {lastMousePos.x.toFixed(3)}, {lastMousePos.y.toFixed(3)}
        </div>
      )}
    </div>
  );
};

export default Canvas;
