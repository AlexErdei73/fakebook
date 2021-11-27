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
  const LG_WINDOW = 992;
  const MD_WINDOW = 768;

  const {
    dimension,
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
    //if (dimension.width < SM_WINDOW) return;
    handleClickLink(
      { currentTarget: linkRef.current },
      activeLink,
      setActiveLink
    );
  }, [isWatch]);

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
          md={isWatch ? 12 : 9}
          lg={isWatch ? 9 : 6}
          className="mh-100 overflow-auto hide-scrollbar"
        >
          {!isWatch && (
            <PostView user={user} userID={userID} posts={posts} users={users} />
          )}
          {isWatch && <VideoView users={users} posts={posts} userID={userID} />}
        </Col>
        {dimension.width > MD_WINDOW && !isWatch && (
          <Col
            className="mh-100 overflow-auto"
            style={{ position: "relative" }}
          >
            <Contacts users={users} user={user} userID={userID} />
          </Col>
        )}
      </Row>
    );
};

export default HomePage;
