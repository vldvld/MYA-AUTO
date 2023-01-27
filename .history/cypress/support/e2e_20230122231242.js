import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  // Your config from Firebase Console
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });