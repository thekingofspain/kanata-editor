import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
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

describe('Canvas keyboard handler - issue #6', () => {
  it('pressing Delete removes selected keys', () => {
    render(<Canvas />);

    const key = useEditorStore.getState().addKey(0, 0);
    useEditorStore.getState().selectKey(key.id);

    expect(useEditorStore.getState().layout.keys).toHaveLength(1);
    expect(useEditorStore.getState().selection.keys.has(key.id)).toBe(true);

    fireEvent.keyDown(window, { key: 'Delete' });

    expect(useEditorStore.getState().layout.keys).toHaveLength(0);
    expect(useEditorStore.getState().selection.keys.size).toBe(0);
  });

  it('pressing Backspace removes selected keys', () => {
    render(<Canvas />);

    const key = useEditorStore.getState().addKey(0, 0);
    useEditorStore.getState().selectKey(key.id);

    expect(useEditorStore.getState().layout.keys).toHaveLength(1);

    fireEvent.keyDown(window, { key: 'Backspace' });

    expect(useEditorStore.getState().layout.keys).toHaveLength(0);
  });

  it('pressing Escape clears selection', () => {
    render(<Canvas />);

    const key = useEditorStore.getState().addKey(0, 0);
    useEditorStore.getState().selectKey(key.id);

    expect(useEditorStore.getState().selection.keys.size).toBe(1);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(useEditorStore.getState().selection.keys.size).toBe(0);
  });

  it('Ctrl+A selects all keys', () => {
    render(<Canvas />);

    useEditorStore.getState().addKey(0, 0);
    useEditorStore.getState().addKey(1, 0);

    expect(useEditorStore.getState().selection.keys.size).toBe(0);

    fireEvent.keyDown(window, { key: 'a', ctrlKey: true });

    expect(useEditorStore.getState().selection.keys.size).toBe(2);
  });

  it('reads latest state from refs after state changes', () => {
    render(<Canvas />);

    useEditorStore.getState().addKey(0, 0);
    const key2 = useEditorStore.getState().addKey(1, 0);

    useEditorStore.getState().selectKey(key2.id);

    fireEvent.keyDown(window, { key: 'Delete' });

    expect(useEditorStore.getState().layout.keys).toHaveLength(1);
    expect(useEditorStore.getState().layout.keys[0].id).not.toBe(key2.id);
  });
});
