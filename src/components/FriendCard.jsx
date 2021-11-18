import React, { useState } from "react";
import { Col, OverlayTrigger } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CircularImage from "./CircularImage";
import { StorageImage } from "reactfire";
import "./FriendCard.css";

const FriendCard = (props) => {
  const { user } = props;

  const userName = `${user.firstname} ${user.lastname}`;

  const [showOverlay, setShowOverlay] = useState(false);

  const history = useHistory();

  function handleClick() {
    history.push(
      user.index && user.index > 0
        ? `/${user.lastname}.${user.firstname}.${user.index}`
        : `/${user.lastname}.${user.firstname}`
    );
  }

  return (
    <Col xs={6} className="my-3">
      <OverlayTrigger
        placement="auto"
        show={showOverlay}
        overlay={
          <div
            id="popup-card"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
            onClick={handleClick}
          >
            <div className="m-3">
              <CircularImage size="120" url={user.profilePictureURL} />
            </div>
            <h4 id="name-tag">
              <b>{userName}</b>
            </h4>
          </div>
        }
      >
        <StorageImage
          storagePath={user.profilePictureURL}
          width="90px"
          height="90px"
          alt=""
          id="profile-picture"
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
          onClick={handleClick}
        />
      </OverlayTrigger>
      <b className="ml-3" onClick={handleClick}>
        {userName}
      </b>
    </Col>
  );
};

export default FriendCard;
