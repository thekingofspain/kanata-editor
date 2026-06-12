import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

describe('dead code', () => {
  it('KeyElement.tsx should not exist as dead code', () => {
    const filePath = resolve(__dirname, '../components/KeyElement.tsx')
    expect(existsSync(filePath)).toBe(false)
  })
})
