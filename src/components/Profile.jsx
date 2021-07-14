import React from "react";
import { useFirestore, useFirestoreDocDataOnce, StorageImage } from "reactfire";
import { Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import { MdPhotoCamera } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { ImUpload2 } from "react-icons/im";
import { HiOutlinePhotograph } from "react-icons/hi";
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
              background: "white",
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
            <DropdownButton
              variant="light"
              id="dropdown-basic-button"
              title={
                <b>
                  <MdPhotoCamera className="mr-1" size="20px" />
                  Edit Cover Photo
                </b>
              }
              style={{
                position: "absolute",
                bottom: "5px",
                right: "30px",
              }}
              size="sm"
            >
              <Dropdown.Item href="#/action-1">
                <HiOutlinePhotograph size="20px" className="mr-2" />
                Select Photo
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <ImUpload2 size="20px" className="mr-2" />
                Upload Photo
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-3">
                <IoTrashOutline size="20px" className="mr-2" /> Remove
              </Dropdown.Item>
            </DropdownButton>
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
