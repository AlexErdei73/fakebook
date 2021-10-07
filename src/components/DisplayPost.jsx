import React from "react";
import { Card } from "react-bootstrap";
import { StorageImage } from "reactfire";
import ProfileLink from "./ProfileLink";

const DisplayPost = (props) => {
  const { post, users } = props;

  const user = users.find((user) => user.userID === post.userID);

  return (
    <Card className="w-75 mx-auto p-0 my-2">
      <Card.Header>
        <ProfileLink user={user} size="40" fullname="true" bold="true" />
        <span
          style={{
            fontSize: "12px",
          }}
        >
          {post.timestamp && post.timestamp.toDate().toLocaleString()}
        </span>
      </Card.Header>
      <Card.Body>
        <Card.Text>{post.text}</Card.Text>
        {post.isPhoto && (
          <StorageImage alt="" storagePath={post.photoURL} className="w-100" />
        )}
      </Card.Body>
    </Card>
  );
};

export default DisplayPost;
