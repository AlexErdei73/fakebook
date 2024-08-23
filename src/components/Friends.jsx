import React, { useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import FriendCard from "./FriendCard";
import { handleClickLink } from "./helper";
import { useSelector } from "react-redux";

const Friends = (props) => {
  const { url } = useRouteMatch();

  const { linkHandling } = props;
  const { linkRefs, linkState } = linkHandling;
  const [activeLink, setActiveLink] = linkState;
  const friendsLinkRef = linkRefs.friends;


  const users = useSelector((state) => state.users);

  useEffect(() => {
    handleClickLink(
      { currentTarget: friendsLinkRef.current },
      activeLink,
      setActiveLink
    );
  }, [activeLink, friendsLinkRef, setActiveLink]);

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
