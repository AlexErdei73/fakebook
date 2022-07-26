import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CreatePost from "./CreatePost";
import MiniPhotos from "./MiniPhotos";
import MiniFriends from "./MiniFriends";
import DisplayUserPost from "./DisplayUserPost";
import { handleClickLink } from "./helper";
import { useSelector } from "react-redux";

const Posts = (props) => {
  const {
    userID,
    postsLinkRef,
    friendsLinkRef,
    photosLinkRef,
    activeLink,
    setActiveLink,
  } = props;

  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.currentUser);
  const currentUserID = useSelector((state) => state.user.id);

  const isCurrentUser = userID === currentUserID;

  const user = users.find((user) => user.userID === userID);

  useEffect(() => {
    handleClickLink(
      { currentTarget: postsLinkRef.current },
      activeLink,
      setActiveLink
    );
  }, [activeLink, postsLinkRef, setActiveLink]);

  return (
    <Row className="w-100" style={{ height: "1000px" }}>
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
      <Col sm={7} className="mh-100 overflow-auto hide-scrollbar bg-200">
        <CreatePost
          user={currentUser}
          userID={currentUser.userID}
          firstname={user.firstname}
          isCurrentUser={isCurrentUser}
          className="mt-2"
        />
        {user.posts.map((postID, index) => {
          return (
            <DisplayUserPost
              key={index}
              postID={postID}
              userID={userID}
              users={users}
              className="mx-auto my-2"
            />
          );
        })}
      </Col>
    </Row>
  );
};

export default Posts;
