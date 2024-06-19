import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      include: ['src/app/**/*.ts', 'src/app/**/*.ts', 'src/lib/**/*.ts'], // Include only .ts files in the src directory
      exclude: ['/src/database/*'],
    },
  },
})
