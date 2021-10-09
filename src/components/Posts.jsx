import React from "react";
import { Row, Col } from "react-bootstrap";
import CreatePost from "./CreatePost";
import MiniPhotos from "./MiniPhotos";
import DisplayUserPost from "./DisplayUserPost";

const Posts = (props) => {
  const { userID, users } = props;

  const user = users.find((user) => user.userID === userID);

  return (
    <Row className="w-100 vh-100">
      <Col sm={5} className="mh-100 ">
        <MiniPhotos user={user} userID={userID} />
      </Col>
      <Col sm={7} className="mh-100 overflow-auto hide-scrollbar">
        <CreatePost user={user} userID={userID} />
        {user.posts.map((postID) => (
          <DisplayUserPost
            postID={postID}
            userID={userID}
            users={users}
            className="mx-auto my-2"
          />
        ))}
      </Col>
    </Row>
  );
};

export default Posts;
