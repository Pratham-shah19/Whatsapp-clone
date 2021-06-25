import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDfy-SEhhVVVoYXfs4aazmfn1JVf8_-vwg",
    authDomain: "whatsapp-clone-84325.firebaseapp.com",
    projectId: "whatsapp-clone-84325",
    storageBucket: "whatsapp-clone-84325.appspot.com",
    messagingSenderId: "532030016347",
    appId: "1:532030016347:web:896d97950cb4a11f6c287e",
    measurementId: "G-3XN5M56110"
  };

  const firebaseapp= firebase.initializeApp(firebaseConfig);
  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;