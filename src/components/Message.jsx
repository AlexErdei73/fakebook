import React from "react";
import { Row } from "react-bootstrap";
import { StorageImage } from "reactfire";

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
      <div
        style={{
          fontSize: "12px",
          margin: "auto",
        }}
      >
        {message.timestamp && message.timestamp.toDate().toLocaleString()}
      </div>
      {message.isPhoto && (
        <div className="w-100 p-3">
          <StorageImage
            alt=""
            storagePath={message.photoURL}
            style={{
              display: "block",
              width: "50%",
              margin: "auto",
            }}
          />
        </div>
      )}
      <p style={message.sender === userID ? senderStyle : receiverStyle}>
        {message.text}
      </p>
    </Row>
  );
};

export default Message;
