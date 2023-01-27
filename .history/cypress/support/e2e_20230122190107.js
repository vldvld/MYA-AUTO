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
import './commands.js'
require('cypress-plugin-tab')
// Alternatively you can use CommonJS syntax:
// require('./commands')

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {

//   project_id: "myassetsdev",
//   private_key_id: "b4ee00dd52a9cb67ddf0f3216e9b8b6434595371",
//   private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2Pjv5DtDrdf6G\nEU+zNZZ/nfpHd7T2GyfA83j7nltwQqP5ZTcJQof0GSQqI3npiBKDaLyKdO/nqS+F\nWUAfemJn+bm4EjbVxLJu8bfxDoEM+7R2Ph0KrAlih4+xbgnHX3n6ikuMJw0iyd6U\nuVlJ4QqTEI1Nb0R3cZckpuwoAg1CvmDb0RNOSls71uBIxjXEbAppn0ecKn372oTE\nKjrkWbX+WROtFQ51bCy57F2FpByn/TdGrjzXHLk5DG3Aldyvir9sJsHmN5D/bMh+\nYgIm43kAQxpXglA9K65Hl4rUAprhXhoWKcTkWGfFxj4hiwrrzm8uHbibj3R1jkgM\ndN0nlZ4nAgMBAAECggEAUCPq9JmG1txy+lrXfPu2PFVor4/dFJKZdzi5/ZBELogn\nmm7fdmN67KU3qY4jOMZdOctPieVlcC6OlqnKUG1do9KF0IO1+GhAfRgvpsIVjvOL\nBqpG1CAWGm15i3FTvIhoV/wDv9SWarNx/V3KfXoIT+ap9KDW712UtQnwdKF+Wlgm\nn11lpXE+oIJlxX7irdw6r/EpQXbPMf9pArvMN75qzb37gj/ko9sIDDdr8oc/M+lw\nyxxhf4oDA+rx7RACzvO5pVCVjjpbEvq3pC0BNLzXCi2njuEK+Mh22KqeRmqMMZV6\nc7xmXD9FxshWfh5QGgnEDBrb+LyE4chjVM1IMlSalQKBgQDgKQNs+3izll5Jl68Z\nRKnYkWcSr5/ATIeL8ETl4UtckmqRGJa/jApMdNg+1Eu4h72v3mFrKV2CIKsySDIL\nCM/LN5PJLsAhheS4u34pT2H+H73UgnmkWrnyQYc+8dVmJd1bYRiO8RBgFWhbEnTY\nJTNDZF6l+9//3sjdXBFJOAWuwwKBgQDQIQR0+eOX3RqxtJ2J66oCunMv8IjDWpXB\n/zS7adD+r6JohADSI/1xVFSsuvj7iHzHar3G9A4HLVyMSDtin+PipeQRo6UrsgdG\nzhKAPeukJY57curMtVQnQa+SQf0k63Sg3iklES4Qr9HGYYalCr9yrK/XpkbL3W12\nQv/ztuHkzQKBgFyc9Vpgp6TjOn+DWQfCk73zjTduMj2cIOCTW5PyulU79SWPmDD5\npgOivvlucv6BrsBry6ofxA+QecrjgzGF6XxXsQqM8zqmfDJK3LwqnR0GdkLHyYQ7\nK9pIcp1yAy4Z9NPdUO018gMQtTXzcS0gaYatgGFpqEmp/Slf8ZBjwg1LAoGBAJlY\n6m7Bu5YmG8f5OuXm1FHETKByymGdeaABSDoZ4hn1EGWPdQdf6xm4N9c4v8CctMs9\nc2yGX1ucaYcWpWKqSf6xmdQBTe5e8ouRxAHnHZrI7S0545RGuiVeeVz67+hm73yj\nk48zFEzJLnfLXah2vc5hPAJZCeqlUESFYw6Pneq1AoGANg7dyXuYNQ0M4vGnt/Ne\nl9pbKRI9Q8PfXLWKTeq0uHlCfIib012PxQzkzgyTWVcI5Uqi9e1/5Kwoga1YseTK\nC8hWIX0+tmev53kHsam5O5swCobdlC4isZIG48zXF4vpCfEYydaTwb8SlVeMKvdb\nM6HdMCQXc4aJhfjMR2VOQfk=\n-----END PRIVATE KEY-----\n",
//   client_email: "firebase-adminsdk-66tsh@myassetsdev.iam.gserviceaccount.com",
//   client_id: "113158721983833378493",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-66tsh%40myassetsdev.iam.gserviceaccount.com"
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

