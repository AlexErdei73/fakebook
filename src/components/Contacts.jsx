import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CloseButton,
  Nav,
  OverlayTrigger,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { StorageImage, useStorage, useFirestore } from "reactfire";
import ProfileLink from "./ProfileLink";
import { FiEdit } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import StyledTextarea from "./StyledTextarea";
import UploadPhoto from "./UploadPhoto";
import Conversation from "./Conversation";
import {
  addPhoto,
  handleTextareaChange,
  delPhoto,
  handleKeyPress,
} from "./helper";
import * as fb from "firebase"; //this is only needed, because we want to use server timestamps

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
    let id;
    if (user) id = user.userID;
    else id = "";
    const newMessage = { ...message };
    newMessage.recipient = id;
    setMessage(newMessage);
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

  const convRowRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState("");

  function saveMessage() {
    uploadMessage(message);
  }

  useEffect(() => {
    if (convRowRef.current) convRowRef.current.scrollTop = scrollHeight;
  }, [scrollHeight]);

  const firestore = useFirestore();

  function uploadMessage(msg) {
    const refMessages = firestore.collection("messages");
    refMessages
      .add({
        ...msg,
        timestamp: fb.default.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setMessage(INIT_MESSAGE);
        setScrollHeight(convRowRef.current.scrollHeight);
      });
  }

  //We open the overlay card programmatically again, otherwise the user is unable to send
  //more than one message.
  useEffect(() => {
    if (!recipient) return; //When the user has not sent anything yet, we return.
    //We only do this if we set back the INIT_MESSAGE after previous message had sent.
    if (showOverlay && message.recipient === "") handleClick(recipient);
  }, [message]);

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
      {users.map((user, index) =>
        user.userID === userID ? (
          <></>
        ) : (
          <div
            key={index}
            className="navitem text-dark flex-row justify-content-center p-2"
            onClick={() => handleClick(user)}
          >
            <ProfileLink size="26" fullname="true" bold="false" user={user} />
          </div>
        )
      )}
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
              {recipient && (
                <Row className="mh-100 overflow-auto" ref={convRowRef}>
                  <Conversation sender={userID} recipient={recipient.userID} />
                </Row>
              )}
            </Card.Body>
            {recipient && (
              <Card.Footer className="mt-3">
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
                      onKeyPress={(e) => handleKeyPress(e, saveMessage)}
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
            )}

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
