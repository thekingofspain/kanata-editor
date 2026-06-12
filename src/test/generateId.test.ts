import { describe, it, expect, beforeEach } from 'vitest'
import { useEditorStore } from '../store'

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('generateId', () => {
  beforeEach(() => {
    useEditorStore.setState({
      layout: {
        id: '',
        name: 'test',
        author: '',
        createdAt: '',
        modifiedAt: '',
        unitSize: 1,
        keys: [],
        groups: []
      },
      history: [],
      future: []
    })
  })

  it('should generate UUID v4 compatible IDs', () => {
    const key = useEditorStore.getState().addKey(0, 0)
    expect(key.id).toMatch(UUID_V4_REGEX)
  })

  it('should generate unique IDs on each call', () => {
    const key1 = useEditorStore.getState().addKey(0, 0)
    const key2 = useEditorStore.getState().addKey(1, 0)
    expect(key1.id).not.toBe(key2.id)
  })
})
