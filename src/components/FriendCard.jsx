import React, { useState } from "react";
import { Col, OverlayTrigger } from "react-bootstrap";
import CircularImage from "./CircularImage";
import { StorageImage } from "reactfire";

const FriendCard = (props) => {
  const userName = `${props.user.firstname} ${props.user.lastname}`;

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <Col key={props.key} xs={6} className="my-3">
      <OverlayTrigger
        placement="auto"
        show={showOverlay}
        overlay={
          <div
            style={{
              position: "relative",
              width: "400px",
              height: "200px",
              background: "white",
              border: "2px solid lightgray",
              borderRadius: "10px",
            }}
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
          >
            <div className="m-3">
              <CircularImage size="120" url={props.user.profilePictureURL} />
            </div>
            <h4
              style={{
                position: "absolute",
                top: "20px",
                left: "160px",
              }}
            >
              <b>{userName}</b>
            </h4>
          </div>
        }
      >
        <StorageImage
          storagePath={props.user.profilePictureURL}
          width="90px"
          height="90px"
          alt=""
          style={{ objectFit: "cover" }}
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
        />
      </OverlayTrigger>
      <b className="ml-3">{userName}</b>
    </Col>
  );
};

export default FriendCard;
