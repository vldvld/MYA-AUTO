const { defineConfig } = require('cypress')
const tasks = require('cypress-firebase/lib/tasks')
const cypressFirebasePlugin = require('cypress-firebase').plugin
const admin = require('firebase-admin')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // supportFile: false,
    supportFile: 'cypress/support/e2e/index.js',
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin)
      // e2e testing node events setup code
    },
  },
  // component: {
  //   setupNodeEvents(on, config) {
  //     // component testing node events setup code
  //   },
  // },
})
// module.exports = defineConfig({
//   chromeWebSecurity: false,
//   defaultCommandTimeout: 4000,
//   video: false,
//   viewportWidth: 1440,
//   viewportHeight: 900,
//   compilerOptions: {
//     types: ['cypress', 'cypress-file-upload'],
//   },
//   e2e: {
//     // We've imported your old cypress plugins here.
//     // You may want to clean this up later by importing these.
//     setupNodeEvents(on, config) {
//       return require('./cypress/plugins/index.js')(on, config)
//       return cypressFirebasePlugin(on, config, admin)
//     },
//     baseUrl: 'https://myassetstest.firebaseapp.com/',
//   },
// })