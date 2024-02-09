const { defineConfig } = require("cypress");
require('dotenv').config();
module.exports = defineConfig({
  env: {...process.env },
  projectId: "ddrkdv",
  viewportWidth: 1688,
  viewportHeight: 768,
  defaultCommandTimeout: 15000,
  e2e: {
    experimentalStudio: true,
    baseUrl: "https://eden.taikai.network",
    setupNodeEvents(on, config) {
    },
  },
});
