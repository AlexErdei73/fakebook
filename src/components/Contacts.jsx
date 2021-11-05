import React, { useState, useEffect } from "react";
import {
  Card,
  CloseButton,
  Nav,
  OverlayTrigger,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { StorageImage, useStorage } from "reactfire";
import ProfileLink from "./ProfileLink";
import { FiEdit } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import StyledTextarea from "./StyledTextarea";
import UploadPhoto from "./UploadPhoto";
import { addPhoto, handleTextareaChange, delPhoto } from "./helper";

const Contacts = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [showPhotoDlg, setShowPhotoDlg] = useState(null);

  const { user, userID, users } = props;

  const WELCOME_TEXT = "Aa";
  const INIT_MESSAGE = {
    sender: `${userID}`,
    recipient: "",
    text: "",
    isPhoto: false,
    photoURL: "",
    isRead: false,
  };
  const [message, setMessage] = useState(INIT_MESSAGE);

  function handleClick(user) {
    setShowOverlay(true);
    setRecipient(user);
  }

  function handleClose() {
    setShowOverlay(false);
    setRecipient(null);
  }

  function handleChange(e) {
    handleTextareaChange({
      e: e,
      state: message,
      setState: setMessage,
    });
  }

  function addPhotoToMessage(file) {
    addPhoto({
      state: message,
      setState: setMessage,
      file: file,
      userID: userID,
    });
  }

  const storage = useStorage();

  function deletePhoto() {
    delPhoto({
      state: message,
      setState: setMessage,
      user: user,
      userID: userID,
      storage: storage,
    });
  }

  function handleKeyPress(e) {
    if (e.shiftKey) return;
    const code = e.code;
    if (code !== "Enter") return;
    e.preventDefault();
    saveMessage();
  }

  function saveMessage() {
    const newMessage = { ...message };
    //... here we do whatever need to be done before saving to firebase
    updateMessage(newMessage);
    setMessage(INIT_MESSAGE);
  }

  function updateMessage(msg) {
    console.log("message: ", msg);
  }

  useEffect(() => {
    console.log(message);
  }, [message.isPhoto]);

  return (
    <Nav
      className="flex-column"
      style={{
        height: "100%",
        position: "relative",
        margitTop: "50px",
      }}
    >
      <h5 className="text-muted ml-3">
        <b>Contacts</b>
      </h5>
      {users.map((user, index) => (
        <div
          key={index}
          className="navitem text-dark flex-row justify-content-center p-2"
          onClick={() => handleClick(user)}
        >
          <ProfileLink size="26" fullname="true" bold="false" user={user} />
        </div>
      ))}
      <OverlayTrigger
        placement="left-start"
        show={showOverlay}
        overlay={
          <Card
            style={{
              width: "350px",
              height: "450px",
              background: "white",
              fontSize: "1.2rem",
            }}
          >
            <Card.Body>
              <Card.Title>
                {recipient && (
                  <ProfileLink
                    size="26"
                    fullname="true"
                    bold="true"
                    user={recipient}
                  />
                )}
                <div id="close-btn-container">
                  <CloseButton onClick={handleClose} className="text-primary" />
                </div>
              </Card.Title>
            </Card.Body>
            <Card.Footer>
              <Row>
                {message.text === "" && (
                  <Col xs={2}>
                    <Button
                      variant="light"
                      size="sm"
                      id="add-photo-btn"
                      onClick={() => setShowPhotoDlg(true)}
                    >
                      <HiOutlinePhotograph
                        size="21px"
                        className="text-primary"
                      />
                    </Button>
                  </Col>
                )}
                <Col
                  xs={message.text === "" ? 8 : 10}
                  className="align-self-center"
                  style={{
                    background: "#e9ecef",
                    borderRadius: "18px",
                  }}
                >
                  {message.isPhoto && (
                    <div id="comment-img-container">
                      <StorageImage
                        alt=""
                        storagePath={`/${message.photoURL}`}
                        id="img-to-comment"
                      />
                      <div id="close-btn-container">
                        <CloseButton onClick={deletePhoto} />
                      </div>
                    </div>
                  )}
                  <StyledTextarea
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    welcomeText={WELCOME_TEXT}
                    value={message.text}
                    className="w-100 mt-2"
                  />
                </Col>
                <Col xs={2}>
                  <Button variant="light" size="sm" id="add-photo-btn">
                    <MdSend size="23px" className="text-primary" />
                  </Button>
                </Col>
              </Row>
            </Card.Footer>

            <UploadPhoto
              show={showPhotoDlg}
              setShow={setShowPhotoDlg}
              updateDatabase={addPhotoToMessage}
              userID={user.userID}
            />
          </Card>
        }
      >
        <div
          style={{
            position: "absolute",
            background: "white",
            padding: "12px",
            borderRadius: "50%",
            bottom: "20px",
            right: "26px",
            boxShadow: "0px 5px 5px 0px lightgray",
          }}
          onClick={() => handleClick(null)}
        >
          <FiEdit size="22px" />
        </div>
      </OverlayTrigger>
    </Nav>
  );
};

export default Contacts;
