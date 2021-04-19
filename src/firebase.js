import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCpWft8xHh-uzpQog7eDdq_3hBxhxW3Lw0",
    authDomain: "store-f9207.firebaseapp.com",
    projectId: "store-f9207",
    storageBucket: "store-f9207.appspot.com",
    messagingSenderId: "517744020630",
    appId: "1:517744020630:web:47ac131b8ecb879e1cc6b7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export {db,auth,provider};
  
  