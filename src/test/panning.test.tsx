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

describe('Canvas panning cursor', () => {
  it('applies panning class to container div, not svg, when middle-button dragging', () => {
    const { container } = render(<Canvas />);

    const canvasContainer = container.querySelector('.canvas-container') as HTMLElement;
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(canvasContainer).toBeTruthy();
    expect(svg).toBeTruthy();

    fireEvent.mouseDown(svg, { button: 1, clientX: 100, clientY: 100 });
    fireEvent.mouseMove(window, { clientX: 150, clientY: 120 });

    expect(canvasContainer.classList.contains('panning')).toBe(true);

    fireEvent.mouseUp(window);
    expect(canvasContainer.classList.contains('panning')).toBe(false);
  });
});
