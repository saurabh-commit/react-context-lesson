import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBS4ZVAZmmR_mcnAbr0y9QIG1PKCadcP4Y",
  authDomain: "crwn-db-e325f.firebaseapp.com",
  databaseURL: "https://crwn-db-e325f.firebaseio.com",
  projectId: "crwn-db-e325f",
  storageBucket: "crwn-db-e325f.appspot.com",
  messagingSenderId: "519910577700",
  appId: "1:519910577700:web:a303cdc9c4a79480926ab1",
  measurementId: "G-KPPZVEPZM2"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
