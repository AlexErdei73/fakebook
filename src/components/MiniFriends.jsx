import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { handleClickLink } from "./helper";
import ResponsiveImage from "./ResponsiveImage";

const MiniFriends = (props) => {
  const {
    user,
    userID,
    users,
    friendsLinkRef,
    activeLink,
    setActiveLink,
    ...rest
  } = props;

  const NUMBER_OF_FRIENDS = 9;

  const friendsLink = `/${user.lastname}.${user.firstname}/Friends`;

  function handleClick() {
    handleClickLink(
      { currentTarget: friendsLinkRef.current },
      activeLink,
      setActiveLink
    );
  }

  return (
    <Card {...rest}>
      <Card.Body>
        <Card.Title>
          <Link to={friendsLink} className="text-body" onClick={handleClick}>
            <b>Friends</b>
          </Link>
        </Card.Title>
        <Row>
          {users.map((user, index) => {
            const userProfileURL = `/${user.lastname}.${user.firstname}`;
            const userName = `${user.firstname} ${user.lastname}`;
            console.log(user.profilePictureURL);
            return (
              //we render maximum 9 friends
              index < NUMBER_OF_FRIENDS && (
                <Col
                  key={index}
                  xs={4}
                  className="m-0"
                  style={{
                    paddingLeft: "3px",
                    paddingRight: "3px",
                    paddingTop: "0",
                    paddingBottom: "0",
                  }}
                >
                  <Link
                    to={userProfileURL}
                    className="text-body"
                    onClick={handleClick}
                  >
                    <ResponsiveImage
                      photo={user.profilePictureURL}
                      width="100%"
                      height="100%"
                      useStoragePath="true"
                    />
                    <div className="w-100" style={{ height: "2.7em" }}>
                      <p style={{ fontSize: "0.9em" }}>
                        <b>{userName}</b>
                      </p>
                    </div>
                  </Link>
                </Col>
              )
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MiniFriends;
