import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { Canvas } from '../components/Canvas';
import { useEditorStore } from '../store';

beforeEach(() => {
  useEditorStore.setState({
    layout: { id: '', name: '', author: '', createdAt: '', modifiedAt: '', unitSize: 1, keys: [], groups: [] },
    canvas: { pan: { x: 0, y: 0 }, zoom: 1, lastMousePos: null, canvasSize: null },
    grid: { enabled: true, snapEnabled: true, showMajor: true, showMinor: true, showPoints: false, majorSpacing: 1, minorSpacing: 0.25, color: '#e0e0e0', majorColor: '#c0c0c0', opacity: 1 },
    selection: { keys: new Set(), lastSelected: null, anchorKey: null },
    clipboard: [],
    history: [],
    future: [],
  });
});

describe('Canvas SVG defs - issue #9', () => {
  it('should not contain dead defs: selection-outline, rotation-handle, key-shadow', () => {
    const { container } = render(<Canvas />);
    expect(container.querySelector('#selection-outline')).toBeNull();
    expect(container.querySelector('#rotation-handle')).toBeNull();
    expect(container.querySelector('#key-shadow')).toBeNull();
  });

  it('should contain required shape defs: rect, rounded, isoEnter, block, barrel', () => {
    const { container } = render(<Canvas />);
    expect(container.querySelector('#key-shape-rect')).toBeTruthy();
    expect(container.querySelector('#key-shape-rounded')).toBeTruthy();
    expect(container.querySelector('#key-shape-isoEnter')).toBeTruthy();
    expect(container.querySelector('#key-shape-block')).toBeTruthy();
    expect(container.querySelector('#key-shape-barrel')).toBeTruthy();
  });
});
