import React, { useEffect } from "react";
import Profile from "./Profile";
import FriendList from "./FriendList";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./FriendsListPage.css";
import imgFriends from "../images/friends.jpg";
import { handleClickLink } from "./helper";

const FriendsListPage = (props) => {
  const { users, user, userID, linkRef, activeLink, setActiveLink } = props;

  const FRIENDS_LIST_PAGE_PATH = "/friends/list";

  const location = useLocation();

  const isNoUser = FRIENDS_LIST_PAGE_PATH === location.pathname;

  //we set the active link to the friends link when it renders
  useEffect(() => {
    handleClickLink(
      { currentTarget: linkRef.current },
      activeLink,
      setActiveLink
    );
  }, []);

  return (
    <Row id="friends-list" className="overflow-hidden">
      <FriendList users={users} />
      <Col id="col-2" className="overflow-auto mh-100 hide-scrollbar">
        {isNoUser ? (
          <div className="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
            <img
              width="200px"
              src={imgFriends}
              alt="cartoon of fakebook friends"
              className="p-4"
            />
            <h5 className="text-muted">
              <b>Select people's names to preview their profile.</b>
            </h5>
          </div>
        ) : (
          <div id="profile-container">
            <Profile
              user={user}
              userID={userID}
              users={users}
              linkRef={linkRef}
              activeMainLink={activeLink}
              setActiveMainLink={setActiveLink}
            />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default FriendsListPage;
