const { defineConfig } = require("cypress");
require('dotenv').config();
module.exports = defineConfig({
  env: {...process.env },
  viewportWidth: 1688,
  viewportHeight: 768,
  defaultCommandTimeout: 30000,
  e2e: {
    experimentalStudio: true,
    baseUrl: "https://gaia.taikai.network:3000/",
    setupNodeEvents(on, config) {
    },
  },
});
