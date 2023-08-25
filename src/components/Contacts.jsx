import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Card,
  CloseButton,
  Nav,
  OverlayTrigger,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import StorageImage from "./StorageImage";
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
import "./Contacts.css";
import { useSelector } from "react-redux";
import {
  subscribeMessages,
  updateToBeRead,
  uploadMessage,
} from "../backend/backend";

const Contacts = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [showPhotoDlg, setShowPhotoDlg] = useState(null);

  const user = useSelector((state) => state.currentUser);
  const userID = useSelector((state) => state.user.id);
  const users = useSelector((state) => state.users);

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
    if (!user && recipient) return;
    if (recipient && user.userID !== recipient.userID) return;
    setShowOverlay(true);
    let id;
    if (user) id = user.userID;
    else id = "";
    const newMessage = { ...message };
    newMessage.recipient = id;
    setMessage(newMessage);
    setRecipient(user);
  }

  const handleClickCallback = useCallback(handleClick, [user]);

  async function handleClose() {
    await updateReadStatusOfMessages(recipient);
    removeSender();
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

  function deletePhoto() {
    delPhoto({
      state: message,
      setState: setMessage,
      user: user,
      userID: userID,
    });
  }

  const convRowRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState("");

  function saveMessage() {
    uploadMessage(message).then(() => {
      setMessage(INIT_MESSAGE);
      setScrollHeight(convRowRef.current.scrollHeight);
    });
  }

  useEffect(() => {
    if (convRowRef.current) convRowRef.current.scrollTop = scrollHeight;
  }, [scrollHeight]);

  useEffect(() => {
    const unsubscribeIncomingMsg = subscribeMessages("incoming");
    const unsubscribeOutgoingMsg = subscribeMessages("outgoing");
    return () => {
      unsubscribeIncomingMsg();
      unsubscribeOutgoingMsg();
    };
  }, []);

  const [senders, setSenders] = useState([]);

  const incomingMessages = useSelector((state) => state.incomingMessages);
  const unread = incomingMessages.filter((message) => !message.isRead);

  useEffect(() => {
    const sendersWithUnreadMsg = [];
    unread.forEach((msg) => {
      const sender = msg.sender;
      if (sendersWithUnreadMsg.indexOf(sender) === -1)
        sendersWithUnreadMsg.push(sender);
    });
    if (senders.length !== sendersWithUnreadMsg.length)
      setSenders(sendersWithUnreadMsg);
  }, [senders, unread]);

  useEffect(() => {
    if (senders.length === 0) return;
    const last = senders.length - 1;
    const sender = senders[last];
    handleClickCallback(users.find((usr) => usr.userID === sender));
  }, [senders, users, handleClickCallback]);

  function updateReadStatusOfMessages(sender) {
    const messagesToUpdate = unread.filter(
      (msg) => msg.sender === sender.userID
    );
    const updates = [];
    messagesToUpdate.forEach((msg) => {
      const messageID = msg.id;
      updates.push(updateToBeRead(messageID));
    });
    return Promise.all(updates);
  }

  function removeSender() {
    const newSenders = [...senders];
    newSenders.pop();
    setSenders(newSenders);
  }

  //We open the overlay card programmatically again, otherwise the user is unable to send
  //more than one message.
  if (recipient)
    if (showOverlay && message.recipient === "")
      //We only do this if we set back the INIT_MESSAGE after previous message had sent.
      handleClick(recipient);
  return (
    <>
      <Nav className="flex-column">
        <h5 className="text-muted ml-3">
          <b>Contacts</b>
        </h5>
        {users.map((user, index) =>
          user.userID === userID ? (
            <div key={index}></div>
          ) : (
            <button
              type="button"
              key={index}
              className="navitem text-dark flex-row justify-content-center p-2 mb-1 nav-btn bg-200"
              onClick={() => handleClick(user)}
            >
              <ProfileLink size="26" fullname="true" bold="false" user={user} />
            </button>
          )
        )}
      </Nav>

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
              maxHeight: `${window.innerHeight - 70}px`,
            }}
          >
            <Card.Body className="overflow-none">
              <Card.Title>
                {!recipient && (
                  <>
                    <h6>New Message</h6>
                    <h6>To:</h6>
                  </>
                )}
                {recipient && (
                  <ProfileLink
                    size="26"
                    fullname="true"
                    bold="true"
                    user={recipient}
                  />
                )}
                <div className="close-btn-container">
                  <CloseButton onClick={handleClose} className="text-primary" />
                </div>
              </Card.Title>
              <hr />
              {recipient && (
                <Row
                  className="mh-100 overflow-auto flex-column-reverse"
                  ref={convRowRef}
                >
                  <Conversation sender={userID} recipient={recipient.userID} />
                </Row>
              )}
              {!recipient && (
                <Col className="h-75 overflow-auto">
                  {users.map((user, index) =>
                    user.userID === userID ? (
                      <div key={index}></div>
                    ) : (
                      <button
                        type="button"
                        key={index}
                        className="flex-row text-dark justify-content-start p-2 container-choose-to nav-btn w-100 mb-1 white"
                        onClick={() => handleClick(user)}
                      >
                        <ProfileLink
                          size="36"
                          fullname="true"
                          bold="false"
                          user={user}
                        />
                      </button>
                    )
                  )}
                </Col>
              )}
            </Card.Body>
            {recipient && (
              <Card.Footer className="mt-5">
                <Row>
                  {message.text === "" && (
                    <Col xs={2}>
                      <Button
                        variant="light"
                        size="sm"
                        className="add-photo-btn"
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
                      <div className="comment-img-container">
                        <StorageImage
                          alt=""
                          storagePath={`/${message.photoURL}`}
                          className="img-to-comment"
                        />
                        <div className="close-btn-container">
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
                    <Button
                      variant="light"
                      size="sm"
                      className="add-photo-btn"
                      onClick={() => {
                        if (message.text !== "" || message.isPhoto)
                          saveMessage();
                      }}
                    >
                      <MdSend size="23px" className="text-primary" />
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            )}

            <UploadPhoto
              show={showPhotoDlg}
              setShow={setShowPhotoDlg}
              updatePost={addPhotoToMessage}
              userID={userID}
            />
          </Card>
        }
      >
        <button
          type="button"
          /*style={{
            position: "fixed",
            background: "white",
            padding: "12px",
            borderRadius: "50%",
            bottom: "20px",
            right: "calc((100vw - 100em) / 2 + 20px)",
            boxShadow: "0px 5px 5px 0px lightgray",
            border: "none",
          }}*/
          className="msg-btn"
          onClick={() => handleClick(null)}
          aria-label="Message"
        >
          <FiEdit size="22px" aria-hidden="true" />
        </button>
      </OverlayTrigger>
    </>
  );
};

export default Contacts;
