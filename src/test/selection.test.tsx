import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Canvas } from '../components/Canvas'
import { useEditorStore } from '../store'

class ResizeObserverMock {
  observe() { return null }
  unobserve() { return null }
  disconnect() { return null }
}
window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

describe('Canvas selection box behavior', () => {
  beforeEach(() => {
    useEditorStore.getState().newLayout()
  })

  afterEach(() => {
    cleanup()
  })

  it('should clear selection when selection box intersects no keys', () => {
    const { container } = render(<Canvas />)

    const key = useEditorStore.getState().addKey(0, 0, 1, 1)
    useEditorStore.getState().selectKey(key.id)
    expect(useEditorStore.getState().selection.keys.size).toBe(1)

    const svg = container.querySelector('svg')!
    expect(svg).toBeTruthy()

    // Start a selection box far from the key at (0,0)
    fireEvent(svg, new MouseEvent('mousedown', {
      clientX: 200,
      clientY: 200,
      button: 0,
      bubbles: true,
    }))

    // Extend selection box
    fireEvent(window, new MouseEvent('mousemove', {
      clientX: 300,
      clientY: 300,
      button: 0,
      bubbles: true,
    }))

    // Complete selection - this triggers handleMouseUp
    fireEvent(window, new MouseEvent('mouseup', {
      bubbles: true,
    }))

    expect(useEditorStore.getState().selection.keys.size).toBe(0)
  })
})
