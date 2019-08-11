import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA-YP_P4kZV2bJRSzVG8T_K-ERqZxL9UGU",
    authDomain: "crwn-db-222dc.firebaseapp.com",
    databaseURL: "https://crwn-db-222dc.firebaseio.com",
    projectId: "crwn-db-222dc",
    storageBucket: "",
    messagingSenderId: "656516802272",
    appId: "1:656516802272:web:06a89d6540731ad0"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;