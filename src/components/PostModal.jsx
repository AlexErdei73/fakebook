import React, { useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import { StorageImage, useStorage } from "reactfire";
import ProfileLink from "./ProfileLink";
import UploadPhoto from "./UploadPhoto";
import { HiOutlinePhotograph } from "react-icons/hi";

const PostModal = (props) => {
  const { show, onClose, user, userID, setText } = props;

  const WELCOME_TEXT = `What's on your mind, ${user.firstname}?`;
  const [post, setPost] = useState({
    userID: `${userID}`,
    text: "",
    isPhoto: false,
    photoURL: "",
  });

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
          <div
            className="mt-2"
            style={{
              width: "102.5%",
              maxHeight: "250px",
              overflowY: "scroll",
            }}
          >
            <textarea
              type="text"
              onChange={handleChange}
              className="w-100 mt-2"
              placeholder={WELCOME_TEXT}
              rows="3"
              style={{
                outline: "none",
                border: "none",
                resize: "none",
                overflowY: "hidden",
              }}
              value={post.text}
            ></textarea>
            {post.isPhoto && (
              <div
                className="mb-2"
                style={{
                  width: "100%",
                  border: "2px solid lightgray",
                  borderRadius: "10px",
                  padding: "10px",
                  position: "relative",
                }}
              >
                <StorageImage
                  alt=""
                  storagePath={`/${post.photoURL}`}
                  className="w-100"
                  style={{
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "white",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  <CloseButton onClick={deletePhoto} />
                </div>
              </div>
            )}
          </div>
          <div
            className="w-100 my-2"
            style={{
              border: "2px solid lightgray",
              borderRadius: "10px",
              padding: "16px",
              fontSize: "14px",
            }}
          >
            {" "}
            <b>Add to your post</b>
            <Button
              className="ml-5"
              variant="light"
              size="sm"
              style={{
                borderRadius: "50%",
                border: "none",
              }}
              onClick={() => setShowUploadPhotoDlg(true)}
              disabled={post.isPhoto}
            >
              <HiOutlinePhotograph size="26px" className="text-success" />
            </Button>
          </div>
          <Button variant={variant} className="w-100 mt-3" disabled={disabled}>
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
