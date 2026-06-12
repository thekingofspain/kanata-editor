import { describe, it, expect, beforeEach } from 'vitest'
import { useEditorStore } from '../store'

describe('duplicateSelection stale closure fix', () => {
  beforeEach(() => {
    useEditorStore.getState().newLayout()
  })

  it('after duplicateSelection, store selection keys should be the new clone IDs, not the original ones', () => {
    const store = useEditorStore.getState()

    store.addKey(0, 0, 1, 1)
    store.addKey(1, 0, 1, 1)

    const allKeys = useEditorStore.getState().layout.keys
    const keyIds = allKeys.map(k => k.id)
    expect(keyIds).toHaveLength(2)

    store.selectKeys(keyIds)

    const oldSelectionKeys = new Set(useEditorStore.getState().selection.keys)

    store.duplicateSelection()

    const newSelectionKeys = useEditorStore.getState().selection.keys

    expect(newSelectionKeys.size).toBe(2)

    for (const id of newSelectionKeys) {
      expect(oldSelectionKeys.has(id)).toBe(false)
    }

    const layoutKeys = useEditorStore.getState().layout.keys
    expect(layoutKeys).toHaveLength(4)
  })
})
