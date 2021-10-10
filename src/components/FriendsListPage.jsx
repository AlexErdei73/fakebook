import React from "react";
import ProfileLink from "./ProfileLink";
import Profile from "./Profile";
import { Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./FriendsListPage.css";

const FriendsListPage = (props) => {
  const { users, user, userID } = props;

  const FRIENDS_LIST_PAGE_PATH = "/friends/list";

  const location = useLocation();

  const isNoUser = FRIENDS_LIST_PAGE_PATH === location.pathname;

  return (
    <Row id="friends-list" className="overflow-hidden">
      <Col xs="auto" className="overflow-auto mh-100">
        <div id="col-1" className="m-2">
          {users.map((user, index) => {
            return (
              <Link
                key={index}
                to={`/${user.lastname}.${user.firstname}`}
                className="nav-link text-dark"
              >
                <ProfileLink
                  user={user}
                  fullname="true"
                  size="60"
                  bold="true"
                  className="pb-1"
                />
              </Link>
            );
          })}
        </div>
      </Col>
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
