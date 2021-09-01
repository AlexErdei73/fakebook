import React, { useState } from "react";
import { Col, OverlayTrigger } from "react-bootstrap";
import CircularImage from "./CircularImage";
import { StorageImage } from "reactfire";

const FriendCard = (props) => {
  const { user, key } = props;

  const userName = `${props.user.firstname} ${props.user.lastname}`;

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <Col key={key} xs={6} className="my-3">
      <OverlayTrigger
        placement="auto"
        show={showOverlay}
        overlay={
          <div
            id="popup-card"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
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
        />
      </OverlayTrigger>
      <b className="ml-3">{userName}</b>
    </Col>
  );
};

export default FriendCard;
