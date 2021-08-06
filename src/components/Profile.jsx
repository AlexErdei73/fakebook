import React, { useState, useRef } from "react";
import {
  useFirestore,
  useFirestoreDocData,
  StorageImage,
  useStorage,
} from "reactfire";
import {
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import { MdPhotoCamera } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { ImUpload2 } from "react-icons/im";
import { HiOutlinePhotograph } from "react-icons/hi";
import CircularImage from "./CircularImage";
import "firebase/firestore";
import "firebase/storage";

const Profile = (props) => {
  const profileRef = useFirestore().collection("users").doc(props.userID);
  let result = useFirestoreDocData(profileRef);

  let { firstname, lastname, profilePictureURL, backgroundPictureURL } =
    result.data;

  const [showRemove, setShowRemove] = useState(false);

  const fileInputRef = useRef(null);

  function handleShowRemove() {
    setShowRemove(true);
  }

  function handleCloseRemove() {
    setShowRemove(false);
  }

  function handleSelect(key, event) {
    if (key === "3") {
      handleShowRemove();
    }
    if (key === "2") {
      fileInputRef.current.click();
    }
  }

  function handleClickSubmit() {
    handleCloseRemove();
    return profileRef.update({ backgroundPictureURL: "background-server.jpg" });
  }

  const storage = useStorage();

  function upload(file) {
    const ref = storage.ref(props.userID).child(file.name);
    ref.put(file).then(() => {
      return profileRef.update({
        backgroundPictureURL: `${props.userID}/${file.name}`,
      });
    });
  }

  function onChangeFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    upload(file);
  }

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
              <Dropdown.Item eventKey="1">
                <HiOutlinePhotograph size="20px" className="mr-2" />
                Select Photo
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onSelect={handleSelect}>
                <ImUpload2 size="20px" className="mr-2" />
                Upload Photo
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3" onSelect={handleSelect}>
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
      <Modal show={showRemove} onHide={handleCloseRemove}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong className="fs-2">Remove Cover Photo</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Do you really want to remove the cover photo?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            style={{ textDecoration: "none" }}
            onClick={handleCloseRemove}
          >
            <b>Cancel</b>
          </Button>
          <Button variant="primary" onClick={handleClickSubmit}>
            <b>Submit</b>
          </Button>
        </Modal.Footer>
      </Modal>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onChangeFile}
      />
    </>
  );
};

export default Profile;
