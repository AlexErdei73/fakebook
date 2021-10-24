import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import PostView from "./PostView";
import LeftNavbar from "./LeftNavbar";
import VideoView from "./VideoView";
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
    postsRef.orderBy("timestamp"),
    { idField: "postID" }
  );

  console.log("props.activeLink :", activeLink);

  //we set the active link to the friends link when it renders
  useEffect(() => {
    console.log("activeLink: ", activeLink);
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
          window size: {dimension.width} x {dimension.height}
          {!isWatch && (
            <PostView user={user} userID={userID} posts={posts} users={users} />
          )}
          {isWatch && <VideoView users={users} posts={posts} userID={userID} />}
        </Col>
        {dimension.width > MD_WINDOW && !isWatch && (
          <Col className="bg-dark text-light mh-100 overflow-auto">col - 3</Col>
        )}
      </Row>
    );
};

export default HomePage;
