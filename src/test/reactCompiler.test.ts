import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

describe('React Compiler', () => {
  it('babel.config.js should not exist (moved to vite config)', () => {
    expect(() => readFileSync(resolve(__dirname, '../../babel.config.js'), 'utf-8')).toThrow()
  })

  it('vite.config.ts should use reactCompilerPreset from @vitejs/plugin-react', () => {
    const configContent = readFileSync(resolve(__dirname, '../../vite.config.ts'), 'utf-8')
    expect(configContent).toContain('reactCompilerPreset')
  })

  it('vite.config.ts should use @rolldown/plugin-babel', () => {
    const configContent = readFileSync(resolve(__dirname, '../../vite.config.ts'), 'utf-8')
    expect(configContent).toContain('@rolldown/plugin-babel')
  })
})
