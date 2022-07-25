import React from "react";
import ProfileLink from "./ProfileLink";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FriendList = (props) => {
  const { variant } = props;

  const users = useSelector((state) => state.users);

  const isModal = variant === "modal";

  return (
    <Col xs="auto" className="overflow-auto mh-100">
      <div id="col-1" className="m-2">
        {users.map((user, index) => {
          let profileLink = `/fakebook/${user.lastname}.${user.firstname}`;
          if (user.index && user.index > 0)
            profileLink = profileLink + `.${user.index}`;
          return (
            <Link
              key={index}
              to={profileLink}
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
