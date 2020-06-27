import firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAMxAXTz_OTqTYt5lm7TGAjUhTXt6nVVG4",
    authDomain: "blog-e25f9.firebaseapp.com",
    databaseURL: "https://blog-e25f9.firebaseio.com",
    projectId: "blog-e25f9",
    storageBucket: "blog-e25f9.appspot.com",
    messagingSenderId: "516248783753",
    appId: "1:516248783753:web:9e130c948a4f0a70eeaf58",
    measurementId: "G-8202WKJJTX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;
