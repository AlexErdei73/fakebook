import React from "react";
import { Col } from "react-bootstrap";
import Message from "./Message";

const DisplayConversation = (props) => {
  const { conversation, userID } = props;

  return (
    <Col>
      {conversation.map((msg, index) => (
        <Message key={index} message={msg} userID={userID} />
      ))}
    </Col>
  );
};

export default DisplayConversation;
