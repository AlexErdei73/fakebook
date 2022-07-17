import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";
import store from "../app/store";
import { signIn, signOut } from "../features/user/userSlice";
import { currentUserUpdated } from "../features/currentUser/currentUserSlice";
import { usersUpdated } from "../features/users/usersSlice";

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

const firestore = firebase.firestore();

const usersCollection = firestore.collection("users");

let userID;
let userDocRef;

export function subscribeCurrentUser() {
  userID = store.getState().user.id;
  userDocRef = usersCollection.doc(userID);
  return userDocRef.onSnapshot((doc) => {
    store.dispatch(currentUserUpdated(doc.data()));
  });
}

export function currentUserOnline() {
  userDocRef.update({ isOnline: true });
}

export function currentUserOffline() {
  return userDocRef.update({ isOnline: false });
}

export function subscribeUsers() {
  return usersCollection.onSnapshot((snapshot) => {
    const users = [];
    snapshot.forEach((user) => {
      const userData = user.data();
      userData.userID = user.id;
      users.push(userData);
    });
    store.dispatch(usersUpdated(users));
  });
}
