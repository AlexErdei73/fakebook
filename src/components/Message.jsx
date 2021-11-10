import React from "react";
import { Row } from "react-bootstrap";

const Message = (props) => {
  const { message, userID, ...rest } = props;

  const senderStyle = {
    width: "75%",
    backgroundColor: "dodgerblue",
    color: "white",
    padding: "16px",
    borderRadius: "16px",
  };

  const receiverStyle = {
    width: "75%",
    backgroundColor: "lightgray",
    color: "black",
    padding: "16px",
    borderRadius: "16px",
  };

  return (
    <Row
      {...rest}
      className={
        message.sender === userID
          ? "justify-content-end"
          : "justify-content-start"
      }
    >
      <span
        style={{
          fontSize: "12px",
          margin: "auto",
        }}
      >
        {message.timestamp && message.timestamp.toDate().toLocaleString()}
      </span>
      <p style={message.sender === userID ? senderStyle : receiverStyle}>
        {message.text}
      </p>
    </Row>
  );
};

export default Message;
