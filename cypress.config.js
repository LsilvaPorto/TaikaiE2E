const { defineConfig } = require("cypress");
require('dotenv').config();
module.exports = defineConfig({
  env: {...process.env },
  defaultCommandTimeout: 30000,
  e2e: {
    experimentalStudio: true,
    baseUrl: "https://gaia.taikai.network:3000/",
    setupNodeEvents(on, config) {
    },
  },
});
