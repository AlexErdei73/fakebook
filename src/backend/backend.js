import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";
import store from "../app/store";
import {
  signIn,
  signOut,
  errorOccured,
  loadingFinished,
} from "../features/user/userSlice";
import { currentUserUpdated } from "../features/currentUser/currentUserSlice";
import { usersUpdated } from "../features/users/usersSlice";
import { postsUpdated } from "../features/posts/postsSlice";
import { incomingMessagesUpdated } from "../features/incomingMessages/incomingMessagesSlice";
import { outgoingMessagesUpdated } from "../features/outgoingMessages/outgoingMessagesSlice";
import * as fb from "firebase"; //this is only needed, because we want to use server timestamps

// URL of my website.
const FAKEBOOK_URL = { url: "https://alexerdei73.github.io/fakebook/" };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export async function getImageURL(imagePath) {
  const imageRef = storage.ref(imagePath);
  const url = await imageRef.getDownloadURL();
  return url;
}

const auth = firebase.auth();

export function subscribeAuth() {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      const id = user.uid;
      const isEmailVerified = user.emailVerified;
      const displayName = user.displayName;
      store.dispatch(signIn({ id, displayName, isEmailVerified }));
    } else {
      store.dispatch(signOut());
    }
  });
}

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
      const timestamp = postData.timestamp;
      let dateString = "";
      if (timestamp) dateString = timestamp.toDate().toLocaleString();
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
      const timestamp = message.data().timestamp;
      let dateString;
      if (timestamp) dateString = timestamp.toDate().toISOString();
      else dateString = "";
      messageData.timestamp = dateString;
      messageData.id = message.id;
      if (dateString !== "") messages.push(messageData);
    });
    store.dispatch(actionCreator(messages));
  });
}

export async function createUserAccount(user) {
  try {
    const result = await auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    // Update the nickname
    await result.user.updateProfile({
      displayName: `${user.firstname} ${user.lastname}`,
    });
    // get the index of the new user with the same username
    const querySnapshot = await firestore
      .collection("users")
      .where("firstname", "==", user.firstname)
      .where("lastname", "==", user.lastname)
      .get();
    const index = querySnapshot.size;
    // Create firestore document
    await firestore.collection("users").doc(result.user.uid).set({
      firstname: user.firstname,
      lastname: user.lastname,
      profilePictureURL: "fakebook-avatar.jpeg",
      backgroundPictureURL: "background-server.jpg",
      photos: [],
      posts: [],
      isOnline: false,
      index: index,
    });
    // Sign out the user
    await firebase.auth().signOut();
    // Send Email Verification and redirect to my website.
    await result.user.sendEmailVerification(FAKEBOOK_URL);
    console.log("Verification email has been sent.");
  } catch (error) {
    // Update the error
    store.dispatch(errorOccured(error.message));
    console.log(error.message);
  }
}

export async function signInUser(user) {
  try {
    const result = await auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
    // email has been verified?
    if (!result.user.emailVerified) {
      auth.signOut();
      store.dispatch(
        errorOccured("Please verify your email before to continue")
      );
    } else {
      store.dispatch(errorOccured(""));
      store.dispatch(loadingFinished());
    }
  } catch (error) {
    // Update the error
    store.dispatch(errorOccured(error.message));
  }
}

export function sendPasswordReminder(email) {
  return auth.sendPasswordResetEmail(email);
}

export async function upload(post) {
  const refPosts = firestore.collection("posts");
  const docRef = await refPosts.add({
    ...post,
    timestamp: fb.default.firestore.FieldValue.serverTimestamp(),
  });
  const postID = docRef.id;
  updateUserPosts(postID);
  return docRef;
}

function updateUserPosts(postID) {
  const user = store.getState().currentUser;
  let newPosts;
  if (user.posts) newPosts = [...user.posts];
  else newPosts = [];
  newPosts.unshift(postID);
  userDocRef.update({
    posts: newPosts,
  });
}

export function updatePost(post, postID) {
  const postRef = firestore.collection("posts").doc(postID);
  postRef.update(post);
}

export function addFileToStorage(file) {
  const ref = storage.ref(userID).child(file.name);
  return ref.put(file);
}
