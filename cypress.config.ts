import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
  },
  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },

  video: true,
  screenshotOnRunFailure: true,
});
