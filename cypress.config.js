const { defineConfig } = require("cypress");
require('dotenv').config();
module.exports = defineConfig({
  env: {...process.env },
  video: true,
  projectId: "ddrkdv",
  viewportWidth: 1688,
  viewportHeight: 768,
  defaultCommandTimeout: 15000,
  e2e: {
    experimentalStudio: true,
    baseUrl: "https://gaia.taikai.network",
    setupNodeEvents(on, config) {
    },
  },
});
