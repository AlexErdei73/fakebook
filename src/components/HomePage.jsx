import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import PostView from "./PostView";
import LeftNavbar from "./LeftNavbar";
import VideoView from "./VideoView";
import Contacts from "./Contacts";
import "./HomePage.css";
import { handleClickLink } from "./helper";

const HomePage = (props) => {
  const {
    user,
    userID,
    users,
    profileLink,
    className,
    isWatch,
    linkRef,
    activeLink,
    setActiveLink,
  } = props;

  const firestore = useFirestore();
  const postsRef = firestore.collection("posts");

  const { status, data: posts } = useFirestoreCollectionData(
    postsRef.orderBy("timestamp", "desc"),
    { idField: "postID" }
  );

  //we set the active link to the home link when it renders
  useEffect(() => {
    handleClickLink(
      { currentTarget: linkRef.current },
      activeLink,
      setActiveLink
    );
  }, [isWatch, linkRef, activeLink, setActiveLink]);

  if (status !== "success") return <div>...loading</div>;
  else
    return (
      <Row className={`${className} overflow-hidden vh-100`}>
        <Col className="mh-100 overflow-auto left-navbar-col">
          <LeftNavbar user={user} profileLink={profileLink} />
        </Col>
        <Col
          sm={9}
          md={isWatch ? 12 : 9}
          lg={isWatch ? 9 : 6}
          className="mh-100 overflow-auto hide-scrollbar"
        >
          {!isWatch && (
            <PostView user={user} userID={userID} posts={posts} users={users} />
          )}
          {isWatch && <VideoView users={users} posts={posts} userID={userID} />}
        </Col>
        {!isWatch && (
          <Col
            className="mh-100 overflow-auto contacts-col"
            style={{ position: "relative" }}
          >
            <Contacts users={users} user={user} userID={userID} />
          </Col>
        )}
      </Row>
    );
};

export default HomePage;
