import firebase from "firebase/app";
import "firebase/storage";
import firebaseConfig from "../firebaseConfig";

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export async function getImageURL(imagePath) {
  const imageRef = storage.ref(imagePath);
  const url = await imageRef.getDownloadURL();
  return url;
}
