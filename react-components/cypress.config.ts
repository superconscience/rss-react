import codeCoverageTask from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
  fixturesFolder: false,
  screenshotOnRunFailure: false,
  video: false,
});
