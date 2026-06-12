import '@testing-library/jest-dom'

(globalThis as any).ResizeObserver = (globalThis as any).ResizeObserver || class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
