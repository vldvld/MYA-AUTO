// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands.js'
// require('cypress-plugin-tab')
// // Alternatively you can use CommonJS syntax:
// // require('./commands')

// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';
// import { attachCustomCommands } from 'cypress-firebase';

// const fbConfig = {
//     apiKey: "AIzaSyATliT28o6HJdmQF9wOLhjxNw9PWUN-xTI",
//     authDomain: "myassetstest.firebaseapp.com",
//     projectId: "myassetstest",
//     storageBucket: "myassetstest.appspot.com",
//     messagingSenderId: "814204140209",
//     appId: "1:814204140209:web:b4cbdc1cdf3300a1f20090",
//     measurementId: "G-DPHDXHGF1X"
// }

// firebase.initializeApp(fbConfig);

// attachCustomCommands({ Cypress, cy, firebase });

/////

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
    apiKey: "AIzaSyATliT28o6HJdmQF9wOLhjxNw9PWUN-xTI",
    authDomain: "myassetstest.firebaseapp.com",
    projectId: "myassetstest",
    storageBucket: "myassetstest.appspot.com",
    messagingSenderId: "814204140209",
    appId: "1:814204140209:web:b4cbdc1cdf3300a1f20090",
    measurementId: "G-DPHDXHGF1X"
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });