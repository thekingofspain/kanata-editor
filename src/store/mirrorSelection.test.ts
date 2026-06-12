import { describe, it, expect, beforeEach } from 'vitest'
import { useEditorStore } from '../store'

describe('mirrorSelection', () => {
  beforeEach(() => {
    useEditorStore.getState().newLayout()
  })

  it('horizontal mirror flips X coordinates and keeps Y unchanged', () => {
    const store = useEditorStore.getState()
    const key1 = store.addKey(1, 1, 1, 1)
    const key2 = store.addKey(5, 3, 1, 2)

    const originalIds = new Set([key1.id, key2.id])
    store.selectKeys([key1.id, key2.id])

    store.mirrorSelection(true)

    const newKeys = useEditorStore.getState().layout.keys.filter(
      k => !originalIds.has(k.id)
    )

    expect(newKeys).toHaveLength(2)

    const kAtX5 = newKeys.find(k => k.x === 5)
    expect(kAtX5).toBeDefined()
    expect(kAtX5!.y).toBe(1)

    const kAtX1 = newKeys.find(k => k.x === 1)
    expect(kAtX1).toBeDefined()
    expect(kAtX1!.y).toBe(3)
  })

  it('vertical mirror flips Y coordinates and keeps X unchanged', () => {
    const store = useEditorStore.getState()
    const key1 = store.addKey(1, 1, 1, 1)
    const key2 = store.addKey(5, 3, 1, 2)

    const originalIds = new Set([key1.id, key2.id])
    store.selectKeys([key1.id, key2.id])

    store.mirrorSelection(false)

    const newKeys = useEditorStore.getState().layout.keys.filter(
      k => !originalIds.has(k.id)
    )

    expect(newKeys).toHaveLength(2)

    const kAtY4 = newKeys.find(k => k.y === 4)
    expect(kAtY4).toBeDefined()
    expect(kAtY4!.x).toBe(1)

    const kAtY1 = newKeys.find(k => k.y === 1)
    expect(kAtY1).toBeDefined()
    expect(kAtY1!.x).toBe(5)
  })
})
