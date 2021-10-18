import React from "react";
import Profile from "./Profile";
import FriendList from "./FriendList";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./FriendsListPage.css";

const FriendsListPage = (props) => {
  const { users, user, userID } = props;

  const FRIENDS_LIST_PAGE_PATH = "/friends/list";

  const location = useLocation();

  const isNoUser = FRIENDS_LIST_PAGE_PATH === location.pathname;

  return (
    <Row id="friends-list" className="overflow-hidden">
      <FriendList users={users} />
      <Col id="col-2" className="overflow-auto mh-100 hide-scrollbar">
        {isNoUser ? (
          "Select people's names to preview their profile."
        ) : (
          <div id="profile-container">
            <Profile user={user} userID={userID} users={users} />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default FriendsListPage;
