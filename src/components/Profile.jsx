import React from "react";
import { useFirestore, useFirestoreDocDataOnce, StorageImage } from "reactfire";
import { Row, Col } from "react-bootstrap";
import CircularImage from "./CircularImage";
import "firebase/firestore";
import "firebase/storage";

const Profile = (props) => {
  const profileRef = useFirestore().collection("users").doc(props.userID);
  const result = useFirestoreDocDataOnce(profileRef);

  const { firstname, lastname, profilePictureURL, backgroundPictureURL } =
    result.data;

  return (
    <>
      <Row className="justify-content-center">
        <Col
          style={{
            width: "100vw",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "42%",
              minHeight: "250px",
            }}
          >
            <StorageImage
              style={{
                display: "block",
                width: "100%",
                height: "105%",
                minHeight: "250px",
                objectFit: "cover",
                margin: "auto",
                marginTop: "3.5%",
                borderRadius: "13px",
                pointerEvents: "none",
                zIndex: "-1",
              }}
              storagePath={backgroundPictureURL}
            />
            <div
              style={{
                border: "5px solid white",
                borderRadius: "95px",
                position: "absolute",
                bottom: "-12%",
                left: "50%",
                marginLeft: "-95px",
              }}
            >
              <CircularImage size="180" url={profilePictureURL} />
            </div>
          </div>
          <h2 className="text-center mt-5">
            <b>
              {firstname} {lastname}
            </b>
          </h2>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
