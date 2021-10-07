import React from "react";
import { Row, Col } from "react-bootstrap";
import { useFirestore, useFirestoreDocData } from "reactfire";
import DisplayPost from "./DisplayPost";
import CreatePost from "./CreatePost";
import MiniPhotos from "./MiniPhotos";

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
    <Row className="w-100 vh-100">
      <Col sm={5} className="mh-100 ">
        <MiniPhotos user={user} userID={userID} />
      </Col>
      <Col sm={7} className="mh-100 overflow-auto hide-scrollbar">
        <CreatePost user={user} userID={userID} />
        {posts.map((post) => (
          <DisplayPost post={post} users={users} className="mx-auto my-2" />
        ))}
      </Col>
    </Row>
  );
};

export default Posts;
