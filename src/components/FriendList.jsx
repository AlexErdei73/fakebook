import React from "react";
import ProfileLink from "./ProfileLink";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FriendList = (props) => {
  const { users, variant } = props;

  const isModal = variant === "modal";

  return (
    <Col xs="auto" className="overflow-auto mh-100">
      <div id="col-1" className="m-2">
        {users.map((user, index) => {
          return (
            <Link
              key={index}
              to={`/${user.lastname}.${user.firstname}`}
              className={isModal ? "p-1 text-dark" : "nav-link text-dark"}
            >
              <ProfileLink
                user={user}
                fullname="true"
                size={isModal ? "40" : "60"}
                bold="true"
                className="pb-1"
              />
            </Link>
          );
        })}
      </div>
    </Col>
  );
};

export default FriendList;
