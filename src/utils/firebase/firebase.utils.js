import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAxvhO0ThvuEYSsxGYXqBJBbZmuQn1f-V0",
    authDomain: "crwn-clothing-db-f9786.firebaseapp.com",
    projectId: "crwn-clothing-db-f9786",
    storageBucket: "crwn-clothing-db-f9786.appspot.com",
    messagingSenderId: "373744786522",
    appId: "1:373744786522:web:0f00505a989816f0354c63"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users', userAuth.uid);
      console.log(userDocRef);

      const userSnapShot = await getDoc(userDocRef);
      console.log(userSnapShot);

      if(!userSnapShot.exists()){
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt
              });
          }catch (error){
              console.log('error creating the user', error.message);
          }
      }
      return userDocRef;
  }