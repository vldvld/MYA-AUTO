const { defineConfig } = require('cypress');
const cypressFirebasePlugin = require('cypress-firebase').plugin;
const admin = require('firebase-admin');



module.exports = defineConfig({
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
      return cypressFirebasePlugin(on, config, admin)
    },
    baseUrl: 'https://myassetstest.firebaseapp.com/',
  },
})