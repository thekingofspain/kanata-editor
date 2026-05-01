import { useRef, useEffect, useState, useCallback } from 'react';
import { useEditorStore } from '../store';
import { Key, DEFAULT_UNIT_SIZE } from '../types';

const BASE_SCALE = DEFAULT_UNIT_SIZE;

const KeyShapes: React.FC = () => {
  return (
    <defs>
      <rect id="key-shape-rect" width="100%" height="100%" rx="0" />
      <rect id="key-shape-rounded" width="100%" height="100%" rx="2" />
      <path id="key-shape-isoEnter" d="M0,0 h1 v0.5 h0.25 v0.5 h-0.25 v0.5 h-0.5 v-0.5 h-0.25 v-0.5 h0.25 v-0.5 Z" />
      <rect id="key-shape-block" width="100%" height="100%" rx="0" stroke="#999" strokeWidth="0.5" />
      <path id="key-shape-barrel" d="M0,0.21 a0.21,0.21 0 0 1 0.21,-0.21 h0.58 a0.21,0.21 0 0 1 0.21,0.21 v0.58 a0.21,0.21 0 0 1 -0.21,0.21 h-0.58 a0.21,0.21 0 0 1 -0.21,-0.21 z" />
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
  isGrouped: boolean;
  onSelect: (id: string, e: React.MouseEvent) => void;
  onDragStart: (id: string, e: React.MouseEvent) => void;
  onDoubleClick: (id: string) => void;
}

const KEY_GAP = 0.08 / BASE_SCALE;
const STROKE_WIDTH = 1 / BASE_SCALE;
const SECONDARY_FONT_SIZE = 0.26;
const KEY_FONT_PRIMARY = '"Barlow Condensed", sans-serif';
const KEY_FONT_SECONDARY = '"Nunito Sans", sans-serif';

const CHAR_CATEGORIES = {
  modifier: /^(Enter|Tab|Esc|Delete|Shift|Ctrl|Alt|Win|Menu|Caps Lock|Backspace|Insert|Home|End|PgUp|PgDn|Up|Down|Left|Right|Num Lock|Scroll Lock|Pause Break|F1|F2|F3|F4|F5|F6|F7|F8|F9|F10|F11|F12)$/,
  letter: /^[A-Z]$/,
  digit: /^[0-9]$/,
  punctuation: /^[,.<>\/?;:'"[\]{}|\\`~!@#$%^&*()_=+-]$/,
};

const VISUAL_WEIGHT_ADJUST: Record<string, number> = {
  '/': 0.70,
  '\\': 0.70,
  '|': 0.70,
  '!': 0.80,
  'i': 0.85,
  'l': 0.85,
  'I': 0.80,
  'j': 0.85,
  't': 0.85,
  'f': 0.85,
  '{': 0.85,
  '}': 0.85,
  '[': 0.85,
  ']': 0.85,
  ',': 1.15,
  '.': 1.15,
  ':': 1.10,
  ';': 1.10,
  "'": 1.15,
  '"': 1.15,
  '-': 1.10,
  '_': 1.10,
  ' ': 1.0,
};

function getCharCategory(char: string): 'modifier' | 'letter' | 'digit' | 'punctuation' | 'other' {
  if (CHAR_CATEGORIES.modifier.test(char)) return 'modifier';
  if (CHAR_CATEGORIES.letter.test(char)) return 'letter';
  if (CHAR_CATEGORIES.digit.test(char)) return 'digit';
  if (CHAR_CATEGORIES.punctuation.test(char)) return 'punctuation';
  return 'other';
}

const FONT_SIZE_RATIOS: Record<'modifier' | 'letter' | 'digit' | 'punctuation' | 'other', number> = {
  modifier: 0.25,
  letter: 0.50,
  digit: 0.375,
  punctuation: 0.375,
  other: 0.40,
};

function getScaledFontSize(char: string, keyHeight: number, isPrimary: boolean): number {
  const category = getCharCategory(char);
  const baseRatio = FONT_SIZE_RATIOS[category];
  const targetHeight = keyHeight * baseRatio;
  
  const firstChar = char.charAt(0);
  const weightAdjust = VISUAL_WEIGHT_ADJUST[firstChar] || 1.0;
  
  const scaleFactor = isPrimary ? 0.80 : 1.0;
  const len = char.length;
  const minSize = isPrimary ? 0.26 : 0.21;
  
  if (len <= 1) {
    return Math.max(minSize, targetHeight * 0.85 * weightAdjust * scaleFactor);
  }
  if (len === 2) {
    return Math.max(minSize, targetHeight * 0.70 * weightAdjust * scaleFactor);
  }
  return Math.max(minSize, targetHeight * 0.60 * weightAdjust * scaleFactor);
}

function getVerticalPosition(isSecondary: boolean): number {
  return isSecondary ? 0.28 : 0.58;
}

const KeyElement: React.FC<KeyElementProps> = ({
  keyData,
  isSelected,
  isGrouped,
  onSelect,
  onDragStart,
  onDoubleClick
}) => {
  const width = keyData.width - KEY_GAP - STROKE_WIDTH;
  const height = keyData.height - KEY_GAP - STROKE_WIDTH;
  const centerX = width / 2;
  const centerY = height / 2;
  
  const transform = `translate(${keyData.x + KEY_GAP / 2 + STROKE_WIDTH / 2}, ${keyData.y + KEY_GAP / 2 + STROKE_WIDTH / 2}) rotate(${keyData.rotation}, ${centerX}, ${centerY})`;
  
  const { legend } = keyData;
  const hasSecondary = !!legend.secondary;
  
  const primaryChar = legend.primary || '';
  const secondaryChar = legend.secondary || '';
  
  const primaryFontSize = getScaledFontSize(primaryChar, height, true);
  const secondaryFontSize = hasSecondary ? getScaledFontSize(secondaryChar, height, false) : SECONDARY_FONT_SIZE;
  
  const primaryY = getVerticalPosition(false) * height;
  const secondaryY = hasSecondary ? getVerticalPosition(true) * height : height * 0.3;
  
  return (
    <g className={`key ${isSelected ? 'selected' : ''}`} data-key-id={keyData.id} transform={transform} onClick={(e) => onSelect(keyData.id, e)} onMouseDown={(e) => onDragStart(keyData.id, e)} onDoubleClick={() => onDoubleClick(keyData.id)}>
      <rect width={width} height={height} fill={keyData.color} rx={2 / BASE_SCALE} stroke={isSelected && isGrouped ? "#ff8800" : (isSelected ? "#0066ff" : "#000")} strokeWidth={1 / BASE_SCALE} strokeDasharray={isSelected && isGrouped ? "0.15, 0.08" : "none"} />
      
      {legend.primary && (
        hasSecondary ? (
          <>
            <text className="key-legend" x={width / 2} y={primaryY} fill={legend.primaryColor || '#000'} fontSize={primaryFontSize} textAnchor="middle" dominantBaseline="central" fontFamily={KEY_FONT_PRIMARY}>
              {legend.primary}
            </text>
            <text className="key-legend" x={width / 2} y={secondaryY} fill={legend.secondaryColor || '#000'} fontSize={secondaryFontSize} textAnchor="middle" dominantBaseline="central" fontFamily={KEY_FONT_SECONDARY}>
              {legend.secondary}
            </text>
          </>
        ) : (
          <text className="key-legend" x={width / 2} y={primaryY} fill={legend.primaryColor || '#000'} fontSize={primaryFontSize} textAnchor="middle" dominantBaseline="central" fontFamily={KEY_FONT_PRIMARY}>
            {legend.primary}
          </text>
        )
      )}
      
      {isSelected && (
        <rect x={0} y={0} width={width} height={height} fill="none" stroke={isGrouped ? "#ff8800" : "#0066ff"} strokeWidth={1 / BASE_SCALE} strokeDasharray={isGrouped ? "0.15, 0.08" : "none"} rx={2 / BASE_SCALE} />
      )}
    </g>
  );
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
  const [lastScreenPos, setLastScreenPos] = useState<{ x: number; y: number } | null>(null);
  
  const { layout, canvas, grid, selection, updateKey, selectKey, selectKeys, clearSelection, setCanvasPan, setCanvasZoom, setLastMousePos, setCanvasSize, removeKeys, duplicateSelection, undo, redo } = useEditorStore();
  const { pan, zoom } = canvas;
  
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
    const rect = svgRef.current?.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!rect || !containerRect) return { x: 0, y: 0 };
    const x = (screenX - containerRect.left - pan.x) / (BASE_SCALE * zoom);
    const y = (screenY - containerRect.top - pan.y) / (BASE_SCALE * zoom);
    return { x, y };
  }, [pan, zoom]);

  useEffect(() => {
    if (lastScreenPos) {
      const pos = screenToCanvas(lastScreenPos.x, lastScreenPos.y);
      setLastMousePos(pos);
    }
  }, [pan, lastScreenPos, screenToCanvas, setLastMousePos]);
  
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
      
      if ((e.key === 'z') && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      
      if ((e.key === 'y' && (e.ctrlKey || e.metaKey)) || ((e.key === 'z') && (e.ctrlKey || e.metaKey) && e.shiftKey)) {
        e.preventDefault();
        redo();
      }
      
      if (e.key === 'Escape') clearSelection();
      
      // Tab / Shift+Tab for selection navigation
      if (e.key === 'Tab' && layout.keys.length > 0) {
        e.preventDefault();
        const selectedIds = [...selection.keys];
        if (selectedIds.length === 0) {
          selectKey(layout.keys[0].id);
        } else {
          const lastSelected = selection.lastSelected;
          const currentIndex = lastSelected ? layout.keys.findIndex(k => k.id === lastSelected) : -1;
          let nextIndex: number;
          if (e.shiftKey) {
            nextIndex = currentIndex <= 0 ? layout.keys.length - 1 : currentIndex - 1;
          } else {
            nextIndex = currentIndex >= layout.keys.length - 1 ? 0 : currentIndex + 1;
          }
          selectKey(layout.keys[nextIndex].id);
        }
      }
      
      // Pan with arrow keys when nothing is selected
      if (selection.keys.size === 0) {
        const panSpeed = 50 * zoom;
        if (e.key === 'ArrowUp') { e.preventDefault(); setCanvasPan({ x: pan.x, y: pan.y - panSpeed }); }
        if (e.key === 'ArrowDown') { e.preventDefault(); setCanvasPan({ x: pan.x, y: pan.y + panSpeed }); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); setCanvasPan({ x: pan.x - panSpeed, y: pan.y }); }
        if (e.key === 'ArrowRight') { e.preventDefault(); setCanvasPan({ x: pan.x + panSpeed, y: pan.y }); }
      }
      
      if (selection.keys.size > 0) {
        const shiftNudge = e.shiftKey ? 0.25 : 1;
        
        if (e.key === 'ArrowUp') { 
          e.preventDefault(); 
          if (e.ctrlKey) {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key && key.height < 8) updateKey(id, { height: Math.min(8, key.height + 0.5) }); }); 
          } else if (e.altKey) {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { rotation: key.rotation + 15 }); }); 
          } else {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { y: key.y - (key.height * shiftNudge) }); }); 
          }
        }
        if (e.key === 'ArrowDown') { 
          e.preventDefault(); 
          if (e.ctrlKey) {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key && key.height > 0.25) updateKey(id, { height: Math.max(0.25, key.height - 0.5) }); }); 
          } else if (e.altKey) {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { rotation: key.rotation - 15 }); }); 
          } else {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { y: key.y + (key.height * shiftNudge) }); }); 
          }
        }
        if (e.key === 'ArrowLeft') { 
          e.preventDefault(); 
          if (e.ctrlKey) {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key && key.width > 0.25) updateKey(id, { width: Math.max(0.25, key.width - 0.5) }); }); 
          } else if (e.altKey) {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { rotation: key.rotation - 1 }); }); 
          } else {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { x: key.x - (key.width * shiftNudge) }); }); 
          }
        }
        if (e.key === 'ArrowRight') { 
          e.preventDefault(); 
          if (e.ctrlKey) {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key && key.width < 8) updateKey(id, { width: Math.min(8, key.width + 0.5) }); }); 
          } else if (e.altKey) {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { rotation: key.rotation + 1 }); }); 
          } else {
            [...selection.keys].forEach(id => { const key = layout.keys.find(k => k.id === id); if (key) updateKey(id, { x: key.x + (key.width * shiftNudge) }); }); 
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selection.keys, selection.lastSelected, layout.keys, removeKeys, selectKey, selectKeys, clearSelection, updateKey, setCanvasPan, pan, zoom, undo, redo]);
  
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
    e.stopPropagation();
    const clickedKey = layout.keys.find(k => k.id === keyId);
    if (!clickedKey) return;
    
    if (e.shiftKey) {
      const isSelected = selection.keys.has(keyId);
      if (isSelected) {
        const newKeys = new Set(selection.keys);
        newKeys.delete(keyId);
        selectKeys([...newKeys]);
      } else {
        selectKeys([...selection.keys, keyId]);
      }
    } else if (clickedKey.groupId) {
      // Clicking on a key in a group
      const groupKeyIds = layout.keys.filter(k => k.groupId === clickedKey.groupId).map(k => k.id);
      const allGroupKeysSelected = groupKeyIds.every(id => selection.keys.has(id));
      if (allGroupKeysSelected) {
        // All keys in group already selected - deselect the group
        const newKeys = new Set(selection.keys);
        groupKeyIds.forEach(id => newKeys.delete(id));
        selectKeys([...newKeys]);
      } else {
        // Select the whole group
        selectKeys(groupKeyIds);
      }
    } else if (selection.keys.has(keyId)) {
      // Clicking on an already selected ungrouped key - deselect it
      clearSelection();
    } else {
      selectKey(keyId);
    }
  };
  
  const handleKeyDoubleClick = (keyId: string) => {
    const key = layout.keys.find(k => k.id === keyId);
    if (!key) return;
    
    const currentText = key.legend.primary || '';
    const newPrimary = prompt('Enter primary label:', currentText) || '';
    const currentSecondary = key.legend.secondary || '';
    const newSecondary = prompt('Enter secondary label (optional):', currentSecondary) || '';
    
    if (newPrimary !== currentText || newSecondary !== currentSecondary) {
      updateKey(keyId, {
        legend: {
          ...key.legend,
          primary: newPrimary,
          secondary: newSecondary || undefined
        }
      });
    }
  };
  
  const handleDragStart = (keyId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selection.keys.has(keyId) && !e.shiftKey) {
      const clickedKey = layout.keys.find(k => k.id === keyId);
      if (clickedKey?.groupId) {
        const groupKeyIds = layout.keys.filter(k => k.groupId === clickedKey.groupId).map(k => k.id);
        selectKeys(groupKeyIds);
      } else if (clickedKey) {
        selectKey(keyId);
      }
    }
    
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
      const dx = (e.clientX - dragStart.x) / (BASE_SCALE * zoom);
      const dy = (e.clientY - dragStart.y) / (BASE_SCALE * zoom);
      
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
      const pos = screenToCanvas(e.clientX, e.clientY);
      setLastMousePos(pos);
    } else if (selectionBox) {
      const start = screenToCanvas(e.clientX, e.clientY);
      setSelectionBox(prev => prev ? { ...prev, end: start } : prev);
    } else {
      const pos = screenToCanvas(e.clientX, e.clientY);
      setLastMousePos(pos);
      setLastScreenPos({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, dragKeyId, dragStart, selection.keys, layout.keys, zoom, grid.snapEnabled, updateKey, isPanning, panStart, pan, setCanvasPan, selectionBox, screenToCanvas, setLastMousePos]);
  
  const handleMouseUp = useCallback(() => {
    if (isDragging) { setIsDragging(false); setDragKeyId(null); }
    if (isPanning) setIsPanning(false);
    if (selectionBox) {
      const minX = Math.min(selectionBox.start.x, selectionBox.end.x);
      const maxX = Math.max(selectionBox.start.x, selectionBox.end.x);
      const minY = Math.min(selectionBox.start.y, selectionBox.end.y);
      const maxY = Math.max(selectionBox.start.y, selectionBox.end.y);
      // Rectangle intersection: key intersects with selection box
      const selectedIds = layout.keys.filter(k => 
        k.x < maxX && k.x + k.width > minX && k.y < maxY && k.y + k.height > minY
      ).map(k => k.id);
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
    e.stopPropagation();
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
    const target = e.target as Element;
    const isOnKey = target.closest('.key') !== null;
    const isOnCanvas = e.target === svgRef.current || target.closest('#grid-layer') !== null;
    
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    } else if (e.button === 0 && e.ctrlKey && selection.keys.size > 0 && !isOnKey) {
      e.preventDefault();
      e.stopPropagation();
      duplicateSelection();
      const newKeys = [...selection.keys];
      setDragKeyId(newKeys[0] || null);
      setDragStart({ x: e.clientX, y: e.clientY });
      setIsDragging(true);
    } else if (e.button === 0 && isOnCanvas && !isOnKey) {
      e.preventDefault();
      const pos = screenToCanvas(e.clientX, e.clientY);
      setSelectionBox({ start: pos, end: pos });
    }
  };
  
  const gridLines: JSX.Element[] = [];
  const halfWidth = dimensions.width / 2 / (BASE_SCALE * zoom);
  const halfHeight = dimensions.height / 2 / (BASE_SCALE * zoom);
  const panX = Math.abs(pan.x / (BASE_SCALE * zoom));
  const panY = Math.abs(pan.y / (BASE_SCALE * zoom));
  const gridExtent = Math.ceil(Math.max(halfWidth + panX, halfHeight + panY, halfWidth + panY, halfHeight + panX)) + 10;
  
  if (grid.enabled) {
    for (let i = -gridExtent; i <= gridExtent; i++) {
      const pos = i;
      
      if (grid.showMajor && i % 4 === 0) {
        gridLines.push(<line key={`v-major-${i}`} x1={pos} y1={-gridExtent} x2={pos} y2={gridExtent} stroke={grid.majorColor} strokeWidth={1 / (BASE_SCALE * zoom)} opacity={grid.opacity} />);
        gridLines.push(<line key={`h-major-${i}`} x1={-gridExtent} y1={pos} x2={gridExtent} y2={pos} stroke={grid.majorColor} strokeWidth={1 / (BASE_SCALE * zoom)} opacity={grid.opacity} />);
      }
      
      if (grid.showMinor && i % 4 !== 0) {
        gridLines.push(<line key={`v-minor-${i}`} x1={pos} y1={-gridExtent} x2={pos} y2={gridExtent} stroke={grid.color} strokeWidth={0.5 / (BASE_SCALE * zoom)} opacity={grid.opacity * 0.5} />);
        gridLines.push(<line key={`h-minor-${i}`} x1={-gridExtent} y1={pos} x2={gridExtent} y2={pos} stroke={grid.color} strokeWidth={0.5 / (BASE_SCALE * zoom)} opacity={grid.opacity * 0.5} />);
      }
    }
  }
  
  return (
    <div ref={containerRef} className="canvas-container">
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} onWheel={handleWheel} onClick={handleCanvasClick} onMouseDown={handleMouseDown} className={isPanning ? 'panning' : ''}>
        <KeyShapes />
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${BASE_SCALE * zoom})`}>
          <g id="grid-layer">{gridLines}</g>
          <g id="keys-layer">
            {layout.keys.filter(key => !selection.keys.has(key.id)).map(key => (
              <KeyElement key={key.id} keyData={key} isSelected={false} isGrouped={!!key.groupId} onSelect={handleKeySelect} onDragStart={handleDragStart} onDoubleClick={handleKeyDoubleClick} />
            ))}
          </g>
          <g id="selected-keys-layer">
            {layout.keys.filter(key => selection.keys.has(key.id)).map(key => (
              <KeyElement key={key.id} keyData={key} isSelected={true} isGrouped={!!key.groupId} onSelect={handleKeySelect} onDragStart={handleDragStart} onDoubleClick={handleKeyDoubleClick} />
            ))}
          </g>
          {selectionBox && (
            <rect x={Math.min(selectionBox.start.x, selectionBox.end.x)} y={Math.min(selectionBox.start.y, selectionBox.end.y)} width={Math.abs(selectionBox.end.x - selectionBox.start.x)} height={Math.abs(selectionBox.end.y - selectionBox.start.y)} fill="rgba(0, 102, 255, 0.1)" stroke="#0066ff" strokeWidth={1 / (BASE_SCALE * zoom)} strokeDasharray={`${4 / (BASE_SCALE * zoom)},${2 / (BASE_SCALE * zoom)}`} />
          )}
        </g>
      </svg>
    </div>
  );
};

export default Canvas;
