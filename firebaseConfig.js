// firebaseConfig.js

const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: "AIzaSyAlAj5yNlDI_U-HAOzY0ffvyJMw48SDcLc",
    authDomain: "apirest-49a50.firebaseapp.com",
    projectId: "apirest-49a50",
    storageBucket: "apirest-49a50.appspot.com",
    messagingSenderId: "33472284702",
    appId: "1:33472284702:web:b6b5b7b6bd457d5803460f"
};

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: firebaseConfig.storageBucket,
  });
  
  const bucket = admin.storage().bucket();
  
  module.exports = bucket;


  