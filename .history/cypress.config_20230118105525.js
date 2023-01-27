const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'anvaop',
  chromeWebSecurity: false,
  defaultCommandTimeout: 4000,
  video: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  compilerOptions: {
    types: ['cypress', 'cypress-file-upload'],
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://app.myassets.com/',
  },
})
