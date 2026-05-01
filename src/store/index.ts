import { create } from 'zustand';
import { 
  Key, 
  KeyboardLayout, 
  CanvasState, 
  GridConfig, 
  SelectionState,
  KeyGroup,
  DEFAULT_KEY_COLOR
} from '../types';

const generateId = () => Math.random().toString(36).substring(2, 11);

interface EditorState {
  layout: KeyboardLayout;
  canvas: CanvasState;
  grid: GridConfig;
  selection: SelectionState;
  clipboard: Key[];
  history: KeyboardLayout[];
  future: KeyboardLayout[];
  
  // Actions
  addKey: (x: number, y: number, width?: number, height?: number) => Key;
  removeKeys: (keyIds: string[]) => void;
  updateKey: (keyId: string, updates: Partial<Key>, saveHistory?: boolean) => void;
  updateKeys: (updates: { id: string; updates: Partial<Key> }[]) => void;
  
  selectKey: (keyId: string, addToSelection?: boolean) => void;
  toggleKeySelection: (keyId: string) => void;
  selectKeys: (keyIds: string[]) => void;
  clearSelection: () => void;
  selectAll: () => void;
  
  setCanvasPan: (pan: { x: number; y: number }) => void;
  setCanvasZoom: (zoom: number) => void;
  setLastMousePos: (pos: { x: number; y: number } | null) => void;
  setCanvasSize: (size: { width: number; height: number } | null) => void;
  
  setGridEnabled: (enabled: boolean) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  
  copySelection: () => void;
  paste: () => void;
  cutSelection: () => void;
  duplicateSelection: () => void;
  mirrorSelection: (horizontal?: boolean) => void;
  
  groupKeys: (keyIds: string[], name?: string) => void;
  ungroupKeys: (groupId: string) => void;
  
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
  
  setLayoutName: (name: string) => void;
  setLayoutAuthor: (author: string) => void;
  
  loadLayout: (layout: KeyboardLayout) => void;
  newLayout: () => void;
}

const createEmptyLayout = (): KeyboardLayout => ({
  id: generateId(),
  name: 'Untitled Layout',
  author: '',
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
  unitSize: 1,
  keys: [],
  groups: []
});

const defaultGrid: GridConfig = {
  enabled: true,
  snapEnabled: true,
  showMajor: true,
  showMinor: true,
  showPoints: false,
  majorSpacing: 1,
  minorSpacing: 0.25,
  color: '#e0e0e0',
  majorColor: '#c0c0c0',
  opacity: 1
};

export const useEditorStore = create<EditorState>((set, get) => ({
  layout: createEmptyLayout(),
  canvas: { pan: { x: 0, y: 0 }, zoom: 1, lastMousePos: null, canvasSize: null },
  grid: defaultGrid,
  selection: { keys: new Set(), lastSelected: null, anchorKey: null },
  clipboard: [],
  history: [],
  future: [],
  
  addKey: (x, y, width = 1, height = 1) => {
    const state = get();
    state.saveToHistory();
    const newKey: Key = {
      id: generateId(),
      x,
      y,
      width,
      height,
      rotation: 0,
      shape: 'rect',
      color: DEFAULT_KEY_COLOR,
      hardware: {},
      function: {},
      legend: { primary: '', primaryColor: '#000000' }
    };
    
    set({
      layout: {
        ...state.layout,
        keys: [...state.layout.keys, newKey],
        modifiedAt: new Date().toISOString()
      }
    });
    
    return newKey;
  },
  
  removeKeys: (keyIds) => {
    const state = get();
    state.saveToHistory();
    set({
      layout: {
        ...state.layout,
        keys: state.layout.keys.filter(k => !keyIds.includes(k.id)),
        modifiedAt: new Date().toISOString()
      },
      selection: {
        keys: new Set([...state.selection.keys].filter(id => !keyIds.includes(id))),
        lastSelected: null,
        anchorKey: null
      }
    });
  },
  
  updateKey: (keyId, updates, saveHistory = true) => {
    const state = get();
    if (saveHistory) {
      state.saveToHistory();
    }
    set({
      layout: {
        ...state.layout,
        keys: state.layout.keys.map(k => 
          k.id === keyId ? { ...k, ...updates } : k
        ),
        modifiedAt: new Date().toISOString()
      }
    });
  },
  
  updateKeys: (updates) => {
    const state = get();
    state.saveToHistory();
    set({
      layout: {
        ...state.layout,
        keys: state.layout.keys.map(k => {
          const update = updates.find(u => u.id === k.id);
          return update ? { ...k, ...update.updates } : k;
        }),
        modifiedAt: new Date().toISOString()
      }
    });
  },
  
  selectKey: (keyId, addToSelection = false) => {
    const state = get();
    if (addToSelection) {
      const newKeys = new Set(state.selection.keys);
      newKeys.add(keyId);
      set({
        selection: {
          keys: newKeys,
          lastSelected: keyId,
          anchorKey: state.selection.anchorKey || keyId
        }
      });
    } else {
      set({
        selection: {
          keys: new Set([keyId]),
          lastSelected: keyId,
          anchorKey: keyId
        }
      });
    }
  },
  
  toggleKeySelection: (keyId) => {
    const state = get();
    const newKeys = new Set(state.selection.keys);
    if (newKeys.has(keyId)) {
      newKeys.delete(keyId);
    } else {
      newKeys.add(keyId);
    }
    set({
      selection: {
        keys: newKeys,
        lastSelected: keyId,
        anchorKey: state.selection.anchorKey || keyId
      }
    });
  },
  
  selectKeys: (keyIds) => {
    set({
      selection: {
        keys: new Set(keyIds),
        lastSelected: keyIds[0] || null,
        anchorKey: keyIds[0] || null
      }
    });
  },
  
  clearSelection: () => {
    set({
      selection: { keys: new Set(), lastSelected: null, anchorKey: null }
    });
  },
  
  selectAll: () => {
    const state = get();
    set({
      selection: {
        keys: new Set(state.layout.keys.map(k => k.id)),
        lastSelected: state.layout.keys[0]?.id || null,
        anchorKey: state.layout.keys[0]?.id || null
      }
    });
  },
  
  setCanvasPan: (pan) => {
    set(state => ({ canvas: { ...state.canvas, pan } }));
  },
  
  setCanvasZoom: (zoom) => {
    const clampedZoom = Math.max(0.25, Math.min(4, zoom));
    set(state => ({ canvas: { ...state.canvas, zoom: clampedZoom } }));
  },
  
  setLastMousePos: (pos) => {
    set(state => ({ canvas: { ...state.canvas, lastMousePos: pos } }));
  },
  
  setCanvasSize: (size) => {
    set(state => ({ canvas: { ...state.canvas, canvasSize: size } }));
  },
  
  setGridEnabled: (enabled) => {
    set(state => ({ grid: { ...state.grid, enabled } }));
  },
  
  toggleGrid: () => {
    set(state => ({ grid: { ...state.grid, enabled: !state.grid.enabled } }));
  },
  
  toggleSnap: () => {
    set(state => ({ grid: { ...state.grid, snapEnabled: !state.grid.snapEnabled } }));
  },
  
  copySelection: () => {
    const state = get();
    const selectedKeys = state.layout.keys.filter(
      k => state.selection.keys.has(k.id)
    );
    set({ clipboard: selectedKeys });
  },
  
  paste: () => {
    const state = get();
    if (state.clipboard.length === 0) return;
    
    state.saveToHistory();
    
    const newKeys = state.clipboard.map(k => ({
      ...k,
      id: generateId(),
      x: k.x + 0.5,
      y: k.y + 0.5
    }));
    
    set({
      layout: {
        ...state.layout,
        keys: [...state.layout.keys, ...newKeys],
        modifiedAt: new Date().toISOString()
      },
      selection: {
        keys: new Set(newKeys.map(k => k.id)),
        lastSelected: newKeys[0]?.id || null,
        anchorKey: newKeys[0]?.id || null
      }
    });
  },
  
  cutSelection: () => {
    const state = get();
    const selectedKeys = state.layout.keys.filter(
      k => state.selection.keys.has(k.id)
    );
    set({ clipboard: selectedKeys });
    state.removeKeys([...state.selection.keys]);
  },
  
  duplicateSelection: () => {
    const state = get();
    state.saveToHistory();
    const selectedKeys = state.layout.keys.filter(
      k => state.selection.keys.has(k.id)
    );
    
    const newKeys = selectedKeys.map(k => ({
      ...k,
      id: generateId(),
      x: k.x + 0.5,
      y: k.y + 0.5
    }));
    
    set({
      layout: {
        ...state.layout,
        keys: [...state.layout.keys, ...newKeys],
        modifiedAt: new Date().toISOString()
      },
      selection: {
        keys: new Set(newKeys.map(k => k.id)),
        lastSelected: newKeys[0]?.id || null,
        anchorKey: newKeys[0]?.id || null
      }
    });
  },
  
  mirrorSelection: (horizontal = false) => {
    const state = get();
    const selectedKeys = state.layout.keys.filter(
      k => state.selection.keys.has(k.id)
    );
    
    if (selectedKeys.length === 0) return;
    
    state.saveToHistory();
    
    const bounds = selectedKeys.reduce((acc, k) => ({
      minX: Math.min(acc.minX, k.x),
      minY: Math.min(acc.minY, k.y),
      maxX: Math.max(acc.maxX, k.x + k.width),
      maxY: Math.max(acc.maxY, k.y + k.height)
    }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
    
    const centerX = (bounds.minX + bounds.maxX) / 2;
    
    const newKeys = selectedKeys.map(k => ({
      ...k,
      id: generateId(),
      x: horizontal ? k.x : centerX * 2 - k.x - k.width,
      rotation: (k.rotation + 180) % 360
    }));
    
    set({
      layout: {
        ...state.layout,
        keys: [...state.layout.keys, ...newKeys],
        modifiedAt: new Date().toISOString()
      },
      selection: {
        keys: new Set(newKeys.map(k => k.id)),
        lastSelected: newKeys[0]?.id || null,
        anchorKey: newKeys[0]?.id || null
      }
    });
  },
  
  groupKeys: (keyIds, name = 'Group') => {
    const state = get();
    state.saveToHistory();
    const groupId = generateId();
    const newGroup: KeyGroup = {
      id: groupId,
      name,
      keys: keyIds
    };
    
    set({
      layout: {
        ...state.layout,
        keys: state.layout.keys.map(k => 
          keyIds.includes(k.id) ? { ...k, groupId } : k
        ),
        groups: [...state.layout.groups, newGroup],
        modifiedAt: new Date().toISOString()
      }
    });
  },
  
  ungroupKeys: (groupId) => {
    const state = get();
    state.saveToHistory();
    const group = state.layout.groups.find(g => g.id === groupId);
    const keyIds = group ? group.keys : [];
    set({
      layout: {
        ...state.layout,
        keys: state.layout.keys.map(k => 
          keyIds.includes(k.id) ? { ...k, groupId: undefined } : k
        ),
        groups: state.layout.groups.filter(g => g.id !== groupId),
        modifiedAt: new Date().toISOString()
      }
    });
  },
  
  undo: () => {
    const state = get();
    if (state.history.length === 0) return;
    
    const currentLayout = JSON.parse(JSON.stringify(state.layout));
    const lastState = state.history[state.history.length - 1];
    
    set({
      layout: lastState,
      history: state.history.slice(0, -1),
      future: [...state.future, currentLayout]
    });
  },
  
  redo: () => {
    const state = get();
    if (state.future.length === 0) return;
    
    const currentLayout = JSON.parse(JSON.stringify(state.layout));
    const nextState = state.future[state.future.length - 1];
    
    set({
      layout: nextState,
      history: [...state.history, currentLayout],
      future: state.future.slice(0, -1)
    });
  },
  
  saveToHistory: () => {
    const state = get();
    const currentLayout = JSON.parse(JSON.stringify(state.layout));
    const newHistory = [...state.history, currentLayout];
    
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    set({
      history: newHistory,
      future: []
    });
  },
  
  setLayoutName: (name) => {
    set(state => ({
      layout: { ...state.layout, name, modifiedAt: new Date().toISOString() }
    }));
  },
  
  setLayoutAuthor: (author) => {
    set(state => ({
      layout: { ...state.layout, author, modifiedAt: new Date().toISOString() }
    }));
  },
  
  loadLayout: (layout) => {
    set({
      layout,
      selection: { keys: new Set(), lastSelected: null, anchorKey: null },
      history: [],
      future: []
    });
  },
  
  newLayout: () => {
    set({
      layout: createEmptyLayout(),
      selection: { keys: new Set(), lastSelected: null, anchorKey: null },
      history: [],
      future: []
    });
  }
}));