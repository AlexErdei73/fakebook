import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/app-check";
import firebaseConfig from "../firebaseConfig";
import store from "../app/store";
import {
  signIn,
  signOut,
  errorOccured,
  loadingFinished,
  loadingStarted,
} from "../features/user/userSlice";
import { currentUserUpdated } from "../features/currentUser/currentUserSlice";
import { usersUpdated } from "../features/users/usersSlice";
import { postsUpdated } from "../features/posts/postsSlice";
import { incomingMessagesUpdated } from "../features/incomingMessages/incomingMessagesSlice";
import { outgoingMessagesUpdated } from "../features/outgoingMessages/outgoingMessagesSlice";

// URL of my website.
const FAKEBOOK_URL = { url: "https://alexerdei73.github.io/fakebook/" };

firebase.initializeApp(firebaseConfig);

const appCheck = firebase.appCheck();
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
appCheck.activate(
  "6LfCG9UhAAAAAL8vSI4Hbustx8baJEDMA0Sz1zD2",

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  true
);

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
    store.dispatch(loadingFinished());
  });
}

const firestore = firebase.firestore();

const usersCollection = firestore.collection("users");

//The following global variables get values, when the UserAccount component renders and runs
//subscribeCurrentUser. After that we use them globally in the following functions.
let userID;
let userDocRef;

export function subscribeCurrentUser() {
  userID = store.getState().user.id; //These are the
  userDocRef = usersCollection.doc(userID); //global values
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
  store.dispatch(loadingStarted());
  await currentUserOffline();
  await auth.signOut();
  store.dispatch(loadingFinished());
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
  const EMAIL_VERIFICATION_ERROR =
    "Please verify your email before to continue";
  const NO_ERROR = "";
  try {
    const result = await auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
    // email has been verified?
    if (!result.user.emailVerified) {
      auth.signOut();
      store.dispatch(errorOccured(EMAIL_VERIFICATION_ERROR));
    } else {
      store.dispatch(errorOccured(NO_ERROR));
    }
  } catch (error) {
    // Update the error
    store.dispatch(errorOccured(error.message));
  } finally {
    store.dispatch(loadingFinished());
  }
}

export function sendPasswordReminder(email) {
  return auth.sendPasswordResetEmail(email);
}

export async function upload(post) {
  const refPosts = firestore.collection("posts");
  const docRef = await refPosts.add({
    ...post,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
  //We need to remove the timestamp, because it is stored in serializable format in the redux-store
  //so we can't write it back to firestore
  const { timestamp, ...restPost } = post;
  postRef.update(restPost);
}

export function addFileToStorage(file) {
  const ref = storage.ref(userID).child(file.name);
  return ref.put(file);
}

export function updateProfile(profile) {
  console.log(userDocRef);
  console.log(profile);
  return userDocRef.update(profile);
}

const refMessages = firestore.collection("messages");

export function uploadMessage(msg) {
  return refMessages.add({
    ...msg,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export function updateToBeRead(messageID) {
  return refMessages.doc(messageID).update({ isRead: true });
}
