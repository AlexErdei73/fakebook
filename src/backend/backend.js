import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";
import store from "../app/store";
import { signIn, signOut } from "../features/user/userSlice";

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export async function getImageURL(imagePath) {
  const imageRef = storage.ref(imagePath);
  const url = await imageRef.getDownloadURL();
  return url;
}

const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  if (user) {
    const id = user.uid;
    const isEmailVerified = user.emailVerified;
    const displayName = user.displayName;
    store.dispatch(signIn({ id, displayName, isEmailVerified }));
  } else {
    store.dispatch(signOut());
  }
});
