import { defineConfig, configDefaults } from 'vitest/config';

const coverageExcluded = ['src/types/*'];

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      all: true,
      reportsDirectory: './tests/unit/coverage',
      exclude: [...configDefaults.coverage.exclude, ...coverageExcluded],
    },
  },
});
