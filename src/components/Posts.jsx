import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CreatePost from "./CreatePost";
import MiniPhotos from "./MiniPhotos";
import MiniFriends from "./MiniFriends";
import DisplayUserPost from "./DisplayUserPost";
import { handleClickLink } from "./helper";

const Posts = (props) => {
  const {
    userID,
    users,
    postsLinkRef,
    friendsLinkRef,
    photosLinkRef,
    activeLink,
    setActiveLink,
  } = props;

  const user = users.find((user) => user.userID === userID);
  console.log(user);

  useEffect(() => {
    handleClickLink(
      { currentTarget: postsLinkRef.current },
      activeLink,
      setActiveLink
    );
  }, []);

  return (
    <Row className="w-100" style={{ height: "120vh" }}>
      <Col sm={5} className="mh-100 overflow-hidden">
        <MiniPhotos
          user={user}
          userID={userID}
          photosLinkRef={photosLinkRef}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          className="my-2"
        />
        <MiniFriends
          user={user}
          userID={userID}
          users={users}
          friendsLinkRef={friendsLinkRef}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          className="my-2"
        />
      </Col>
      <Col sm={7} className="mh-100 overflow-auto hide-scrollbar">
        <CreatePost user={user} userID={userID} className="mt-2" />
        {user.posts.map((postID, index) => (
          <DisplayUserPost
            key={index}
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
