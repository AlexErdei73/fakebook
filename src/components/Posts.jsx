import React from "react";
import { Row, Col } from "react-bootstrap";
import { useFirestore, useFirestoreDocData } from "reactfire";
import DisplayPost from "./DisplayPost";

const Posts = (props) => {
  const { userID, users } = props;

  const user = users.find((user) => user.userID === userID);

  const firestore = useFirestore();
  const postsRef = firestore.collection("posts");

  const INIT_POST = {
    userID: `${userID}`,
    text: "",
    isPhoto: false,
    photoURL: "",
  };

  const posts = user.posts.map((postID) => {
    const docRef = postsRef.doc(postID);
    return useFirestoreDocData(docRef, {
      initialData: INIT_POST,
    }).data;
  });

  return (
    <Row className="w-100 mh-100">
      <Col sm={4} className="bg-dark mh-100 ">
        col - 1
        <div
          style={{
            background: "white",
            widtgh: "50%",
            height: "800px",
            margin: "auto",
          }}
        ></div>
      </Col>
      <Col sm={8} className="bg-info mh-100 overflow-auto">
        col - 2
        {posts.map((post) => (
          <DisplayPost post={post} users={users} />
        ))}
      </Col>
    </Row>
  );
};

export default Posts;
