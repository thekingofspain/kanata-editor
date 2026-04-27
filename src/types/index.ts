export type KeyShape = 'rect' | 'rounded' | 'isoEnter' | 'block' | 'barrel';

export interface LegendItem {
  primary: string;
  primaryColor?: string;
  secondary?: string;
  secondaryColor?: string;
}

export interface HardwareMetadata {
  row?: number;
  col?: number;
  layer?: number;
}

export interface Behavior {
  type: string;
  params?: Record<string, unknown>;
}

export interface FunctionMetadata {
  keycode?: string;
  behaviors?: Behavior[];
}

export interface Key {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  shape: KeyShape;
  color: string;
  hardware: HardwareMetadata;
  function: FunctionMetadata;
  legend: LegendItem;
}

export interface KeyGroup {
  id: string;
  name: string;
  keys: (string | KeyGroup)[];
}

export interface KeyboardLayout {
  id: string;
  name: string;
  author: string;
  createdAt: string;
  modifiedAt: string;
  unitSize: number;
  keys: Key[];
  groups: KeyGroup[];
  matrix?: {
    rows: number;
    cols: number;
  };
}

export interface CanvasState {
  pan: { x: number; y: number };
  zoom: number;
  lastMousePos: { x: number; y: number } | null;
  canvasSize: { width: number; height: number } | null;
}

export interface GridConfig {
  enabled: boolean;
  snapEnabled: boolean;
  showMajor: boolean;
  showMinor: boolean;
  showPoints: boolean;
  majorSpacing: number;
  minorSpacing: number;
  color: string;
  majorColor: string;
  opacity: number;
}

export interface SelectionState {
  keys: Set<string>;
  lastSelected: string | null;
  anchorKey: string | null;
}

export const STANDARD_KEY_SIZES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.75, 3, 4, 5, 5.5, 6, 6.25, 6.5, 7] as const;

export const DEFAULT_UNIT_SIZE = 19.05;

export const DEFAULT_KEY_COLOR = '#ffffff';

export const KEY_SHAPES: KeyShape[] = ['rect', 'rounded', 'isoEnter', 'block', 'barrel'];

export { KEYBOARD_PRESETS, loadPreset } from './presets';
export type { KeyboardPreset, ParsedKeyboard } from './presets';