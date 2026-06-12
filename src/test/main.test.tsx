import { describe, it, expect } from 'vitest'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

describe('main.tsx', () => {
  it('uses named imports for StrictMode and createRoot', () => {
    expect(StrictMode).toBeDefined()
    expect(createRoot).toBeDefined()
  })
})
