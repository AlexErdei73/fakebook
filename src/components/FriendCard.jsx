import React, { useState } from "react";
import { Col, OverlayTrigger } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CircularImage from "./CircularImage";
import StorageImage from "./StorageImage";
import "./FriendCard.css";

const FriendCard = (props) => {
  const { user } = props;

  const userName = `${user.firstname} ${user.lastname}`;

  const [showOverlay, setShowOverlay] = useState(false);

  const history = useHistory();

  function handleClick() {
    history.push(
      user.index && user.index > 0
        ? `/fakebook/${user.lastname}.${user.firstname}.${user.index}`
        : `/fakebook/${user.lastname}.${user.firstname}`
    );
  }

  return (
    <Col xs={6} className="my-3">
      <OverlayTrigger
        placement="auto"
        show={showOverlay}
        overlay={
          <div
            className="popup-card"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
            onClick={handleClick}
          >
            <div className="m-3">
              <CircularImage size="120" url={user.profilePictureURL} />
            </div>
            <h4 className="name-tag">
              <b>{userName}</b>
            </h4>
          </div>
        }
      >
        <button
          type="button"
          onClick={handleClick}
          className="friend-btn"
          tabIndex="-1"
        >
          <StorageImage
            storagePath={user.profilePictureURL}
            width="90px"
            height="90px"
            alt=""
            className="profile-picture"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
          />
        </button>
      </OverlayTrigger>
      <button type="button" className="ml-3 friend-btn" onClick={handleClick}>
        <b>{userName}</b>
      </button>
    </Col>
  );
};

export default FriendCard;
