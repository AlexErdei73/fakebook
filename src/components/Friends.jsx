import React, { useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import FriendCard from "./FriendCard";
import { handleClickLink } from "./helper";

const Friends = (props) => {
  const { url } = useRouteMatch();

  const { users, friendsLinkRef, activeLink, setActiveLink } = props;

  useEffect(() => {
    handleClickLink(
      { currentTarget: friendsLinkRef.current },
      activeLink,
      setActiveLink
    );
  }, []);

  //copyUsers never undefined to avoid error
  let copyUsers;
  if (!users) copyUsers = [];
  else copyUsers = users;

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link to={url} className="text-body">
            <b>Friends</b>
          </Link>
        </Card.Title>

        <Row>
          {copyUsers.map((user, index) => (
            <FriendCard user={user} key={index} />
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Friends;
