import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";
import store from "../app/store";
import { signIn, signOut } from "../features/user/userSlice";
import { currentUserUpdated } from "../features/currentUser/currentUserSlice";
import { usersUpdated } from "../features/users/usersSlice";
import { postsUpdated } from "../features/posts/postsSlice";
import { incomingMessagesUpdated } from "../features/incomingMessages/incomingMessagesSlice";
import { outgoingMessagesUpdated } from "../features/outgoingMessages/outgoingMessagesSlice";

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

export async function signUserOut() {
  await currentUserOffline();
  auth.signOut();
}

export function subscribePosts() {
  const postsCollection = firestore.collection("posts");
  return postsCollection.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    const posts = [];
    snapshot.forEach((post) => {
      const postData = post.data();
      const dateString = post.data().timestamp.toDate().toLocaleString();
      postData.timestamp = dateString;
      postData.postID = post.id;
      posts.push(postData);
    });
    store.dispatch(postsUpdated(posts));
  });
}

export function subscribeMessages(typeOfMessages) {
  let typeOfUser;
  let actionCreator;
  if (typeOfMessages === "incoming") {
    typeOfUser = "recipient";
    actionCreator = incomingMessagesUpdated;
  } else {
    typeOfUser = "sender";
    actionCreator = outgoingMessagesUpdated;
  }
  const messagesCollection = firestore
    .collection("messages")
    .where(typeOfUser, "==", userID);
  return messagesCollection.onSnapshot((snapshot) => {
    const messages = [];
    snapshot.forEach((message) => {
      const messageData = message.data();
      const dateString = message.data().timestamp.toDate().toLocaleString();
      messageData.timestamp = dateString;
      messageData.id = message.id;
      messages.push(messageData);
    });
    store.dispatch(actionCreator(messages));
  });
}
