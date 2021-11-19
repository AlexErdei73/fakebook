import React, { useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import { StorageImage, useStorage, useFirestore } from "reactfire";
import ProfileLink from "./ProfileLink";
import UploadPhoto from "./UploadPhoto";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiFillYoutube } from "react-icons/ai";
import * as fb from "firebase"; //this is only needed, because we want to use server timestamps
import "./PostModal.css";
import { handleTextareaChange, addPhoto, delPhoto } from "./helper";

const PostModal = (props) => {
  const {
    show,
    onClose,
    user,
    userID,
    setText,
    isYoutubeBtnPressed,
    placeholder,
  } = props;

  const WELCOME_TEXT = "For adding YouTube video copy link here ...";
  const INIT_POST = {
    userID: `${userID}`,
    text: "",
    isPhoto: false,
    photoURL: "",
    isYoutube: false,
    youtubeURL: "",
    likes: [],
  };
  const [post, setPost] = useState(INIT_POST);

  function handleChange(e) {
    const value = handleTextareaChange({
      e: e,
      state: post,
      setState: setPost,
    });
    setPostBtnEnabled(value);
  }

  function setPostBtnEnabled(value) {
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
    addPhoto({
      state: post,
      setState: setPost,
      file: file,
      userID: userID,
    });
    setBtnEnabled(true);
  }

  const storage = useStorage();

  function deletePhoto() {
    delPhoto({
      state: post,
      setState: setPost,
      user: user,
      userID: userID,
      storage: storage,
      sideEffect: setPostBtnAsSideEffect,
    });
  }

  function setPostBtnAsSideEffect() {
    if (post.text === "" && !post.isYoutube) setBtnEnabled(false);
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
    newPosts.unshift(postID);
    const refUser = firestore.collection("users").doc(userID);
    refUser.update({
      posts: newPosts,
    });
  }

  function addYoutubeVideo() {
    const url = post.text;
    const URL_PATTERN = "https://www.youtube.com/watch?v=";
    const patternLength = URL_PATTERN.length;
    if (!url.startsWith(URL_PATTERN)) return;
    const videoID = url.slice(patternLength);
    const youtubeURL = `https://www.youtube.com/embed/${videoID}`;
    const newPost = { ...post };
    newPost.isYoutube = true;
    newPost.youtubeURL = youtubeURL;
    newPost.text = "";
    setPost(newPost);
    setBtnEnabled(true);
  }

  function deleteYoutubeVideo() {
    const newPost = { ...post };
    newPost.isYoutube = false;
    newPost.youtubeURL = "";
    setPost(newPost);
    if (post.text === "" && !post.isPhoto) setBtnEnabled(false);
  }

  function getPlaceholder() {
    if (isYoutubeBtnPressed && !post.isYoutube) return WELCOME_TEXT;
    else return placeholder;
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
              placeholder={getPlaceholder()}
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
            {post.isYoutube && (
              <div className="mb-2" id="video-container">
                <iframe
                  src={post.youtubeURL}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                  allowfullscreen
                ></iframe>
                <div id="close-btn-container">
                  <CloseButton onClick={deleteYoutubeVideo} />
                </div>
              </div>
            )}
          </div>
          <div className="w-100 my-2" id="add-to-post">
            <b>Add to your post</b>
            <Button
              className="ml-2"
              variant="light"
              size="sm"
              id="add-photo-btn"
              onClick={addYoutubeVideo}
              disabled={post.isPhoto || post.isYoutube}
            >
              <AiFillYoutube size="26px" className="text-danger" />
            </Button>
            <Button
              className="ml-2"
              variant="light"
              size="sm"
              id="add-photo-btn"
              onClick={() => setShowUploadPhotoDlg(true)}
              disabled={post.isPhoto || post.isYoutube}
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
