import { describe, it, expect } from 'vitest'
import { useEditorStore } from '../store'

describe('useEditorStore selector stability', () => {
  it('individual selectors return stable references when unrelated state changes', () => {
    const state1 = useEditorStore.getState()
    const layoutRef1 = state1.layout

    state1.setCanvasPan({ x: 100, y: 0 })

    const state2 = useEditorStore.getState()
    const layoutRef2 = state2.layout

    // Full state (what useEditorStore() without selector returns) changes on every set()
    expect(state2).not.toBe(state1)

    // But individual selectors for unchanged properties return stable references
    expect(layoutRef2).toBe(layoutRef1)
  })
})
