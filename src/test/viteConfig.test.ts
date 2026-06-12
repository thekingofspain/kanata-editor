import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

describe('vite.config.ts', () => {
  it('should have resolve.tsconfigPaths enabled', () => {
    const configContent = readFileSync(resolve(__dirname, '../../vite.config.ts'), 'utf-8')
    expect(configContent).toContain('tsconfigPaths')
    expect(configContent).toContain('true')
  })
})
