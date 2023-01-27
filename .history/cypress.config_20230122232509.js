// import admin from 'firebase-admin';
// import { defineConfig } from 'cypress';
// import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

// export default defineConfig({
//   e2e: {
//     baseUrl: 'https://myassetstest.firebaseapp.com/',
//     // NOTE: Add "supportFile" setting if separate location is used
//     setupNodeEvents(on, config) {
//       // e2e testing node events setup code
//       return cypressFirebasePlugin(on, config, admin);
//       // NOTE: If not setting GCLOUD_PROJECT env variable, project can be set like so:
//       // return cypressFirebasePlugin(on, config, admin, { projectId: 'some-project' });
//     },
//   },
// });
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


const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://myassetstest.firebaseapp.com/',
  },
})