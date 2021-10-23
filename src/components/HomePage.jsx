import React from "react";
import { Row, Col } from "react-bootstrap";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import PostView from "./PostView";
import LeftNavbar from "./LeftNavbar";
import "./HomePage.css";

const HomePage = (props) => {
  const LG_WINDOW = 992;
  const MD_WINDOW = 768;

  const { dimension, user, userID, users, profileLink, className } = props;

  const firestore = useFirestore();
  const postsRef = firestore.collection("posts");

  const { status, data: posts } = useFirestoreCollectionData(
    postsRef.orderBy("timestamp"),
    { idField: "postID" }
  );

  if (status !== "success") return <div>...loading</div>;
  else
    return (
      <Row className={`${className} overflow-hidden vh-100`}>
        {dimension.width > LG_WINDOW && (
          <Col className="mh-100 overflow-auto">
            <LeftNavbar user={user} profileLink={profileLink} />
          </Col>
        )}
        <Col
          sm={12}
          md={9}
          lg={6}
          className="mh-100 overflow-auto hide-scrollbar"
        >
          window size: {dimension.width} x {dimension.height}
          <PostView user={user} userID={userID} posts={posts} users={users} />
        </Col>
        {dimension.width > MD_WINDOW && (
          <Col className="bg-dark text-light mh-100 overflow-auto">col - 3</Col>
        )}
      </Row>
    );
};

export default HomePage;
