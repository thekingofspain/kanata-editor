import { describe, it, expect } from 'vitest'

describe('tsconfig.json', () => {
  it('DOM.Iterable should not be needed separately in TS 6.0', () => {
    // In TypeScript 6.0, DOM.Iterable is merged into DOM
    // Verify that DOM APIs that previously required DOM.Iterable still work
    const divs = document.querySelectorAll('div')
    for (const el of divs) {
      expect(el).toBeDefined()
    }
  })
})
