import React from "react";
import { Row } from "react-bootstrap";
import StorageImage from "./StorageImage";
import { useSelector } from "react-redux";

const Message = (props) => {
  const { message, ...rest } = props;

  const userID = useSelector((state) => state.user.id);

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
        {new Date(message.timestamp).toLocaleString()}
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
