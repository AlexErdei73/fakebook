import React, { useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import { StorageImage, useStorage, useFirestore } from "reactfire";
import ProfileLink from "./ProfileLink";
import UploadPhoto from "./UploadPhoto";
import { HiOutlinePhotograph } from "react-icons/hi";
import * as fb from "firebase"; //this is only needed, because we want to use server timestamps
import "./PostModal.css";

const PostModal = (props) => {
  const { show, onClose, user, userID, setText } = props;

  const WELCOME_TEXT = `What's on your mind, ${user.firstname}?`;
  const INIT_POST = {
    userID: `${userID}`,
    text: "",
    isPhoto: false,
    photoURL: "",
  };
  const [post, setPost] = useState(INIT_POST);

  function handleChange(e) {
    let value = e.target.value;
    const newPost = { ...post };
    newPost.text = value;
    setPost(newPost);
    if (value === "") setBtnEnabled(false);
    else setBtnEnabled(true);
    setText(value);
  }

  const [isBtnEnabled, setBtnEnabled] = useState(false);
  let variant, disabled;
  if (isBtnEnabled) {
    variant = "primary";
    disabled = false;
  } else {
    variant = "secondary";
    disabled = true;
  }

  const [showUploadPhotoDlg, setShowUploadPhotoDlg] = useState(false);

  function addPhotoToPost(file) {
    const newPost = { ...post };
    newPost.isPhoto = true;
    newPost.photoURL = `${userID}/${file.name}`;
    setPost(newPost);
    setBtnEnabled(true);
  }

  const storage = useStorage();

  function deletePhoto() {
    const photoURL = post.photoURL;
    const ref = storage.ref().child(photoURL);
    ref.delete().then(() => {
      const newPost = { ...post };
      newPost.isPhoto = false;
      newPost.photoURL = "";
      setPost(newPost);
      if (post.text === "") setBtnEnabled(false);
    });
  }

  const firestore = useFirestore();

  function uploadPost() {
    const refPosts = firestore.collection("posts");
    refPosts
      .add({
        ...post,
        timestamp: fb.default.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        const postID = docRef.id;
        updateUserPosts(postID);
        setPost(INIT_POST);
        setText("");
        onClose();
      });
  }

  function updateUserPosts(postID) {
    let newPosts;
    if (user.posts) newPosts = [...user.posts];
    else newPosts = [];
    newPosts.push(postID);
    const refUser = firestore.collection("users").doc(userID);
    refUser.update({
      posts: newPosts,
    });
  }

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <div className="w-100 d-flex justify-content-center">
            <Modal.Title>
              <b>Create Post</b>
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <ProfileLink user={user} size="45" fullname="true" bold="true" />
          <div className="mt-2" id="scrolling-container">
            <textarea
              type="text"
              onChange={handleChange}
              className="w-100 mt-2"
              placeholder={WELCOME_TEXT}
              rows="3"
              id="textarea"
              value={post.text}
            ></textarea>
            {post.isPhoto && (
              <div className="mb-2" id="img-container">
                <StorageImage
                  alt=""
                  storagePath={`/${post.photoURL}`}
                  className="w-100"
                  id="img-to-post"
                />
                <div id="close-btn-container">
                  <CloseButton onClick={deletePhoto} />
                </div>
              </div>
            )}
          </div>
          <div className="w-100 my-2" id="add-to-post">
            <b>Add to your post</b>
            <Button
              className="ml-5"
              variant="light"
              size="sm"
              id="add-photo-btn"
              onClick={() => setShowUploadPhotoDlg(true)}
              disabled={post.isPhoto}
            >
              <HiOutlinePhotograph size="26px" className="text-success" />
            </Button>
          </div>
          <Button
            variant={variant}
            className="w-100 mt-3"
            disabled={disabled}
            onClick={uploadPost}
          >
            <b>Post</b>
          </Button>
        </Modal.Body>
      </Modal>
      <UploadPhoto
        show={showUploadPhotoDlg}
        setShow={setShowUploadPhotoDlg}
        updateDatabase={addPhotoToPost}
        userID={userID}
      />
    </>
  );
};

export default PostModal;
