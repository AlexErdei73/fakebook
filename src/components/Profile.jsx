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
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { ImUpload2 } from "react-icons/im";
import { HiOutlinePhotograph } from "react-icons/hi";
import CircularImage from "./CircularImage";
import NestedRoute from "./NestedRoute";
import ResponsiveImage from "./ResponsiveImage";
import "./Profile.css";
import { handleClickLink } from "./helper";

const Profile = (props) => {
  const profileRef = useFirestore().collection("users").doc(props.userID);
  let result = useFirestoreDocData(profileRef);

  let { firstname, lastname, profilePictureURL, backgroundPictureURL, photos } =
    result.data;

  const [showRemove, setShowRemove] = useState(false);

  const [showSelectPhoto, setShowSelectPhoto] = useState(false);

  const [showUpdateProfilePic, setShowUpdateProfilePic] = useState(false);

  const [nameOfURL, setNameOfURL] = useState("backgroundPictureURL");

  const [activeLink, setActiveLink] = useState(null);

  const fileInputRef = useRef(null);

  const { url, path } = useRouteMatch();

  function openFileInput(nameOfURL) {
    setNameOfURL(nameOfURL);
    fileInputRef.current.click();
  }

  function handleSelect(key) {
    switch (key) {
      case "3":
        setShowRemove(true);
        break;
      case "2":
        openFileInput("backgroundPictureURL");
        break;
      case "1":
        setShowSelectPhoto(true);
        break;
    }
  }

  function handleClickSubmit() {
    setShowRemove(false);
    return profileRef.update({ backgroundPictureURL: "background-server.jpg" });
  }

  const storage = useStorage();

  function upload(file) {
    const ref = storage.ref(props.userID).child(file.name);
    const newPhoto = { fileName: file.name };
    const filenames = photos.map((photo) => photo.fileName);
    if (filenames.indexOf(file.name) === -1) {
      photos.push(newPhoto);
    }
    const newProfile = { photos: photos };
    if (nameOfURL !== "")
      newProfile[nameOfURL] = `${props.userID}/${file.name}`;
    ref.put(file).then(() => {
      return profileRef.update(newProfile);
    });
  }

  function onChangeFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    upload(file);
  }

  function handlePhotoClick(e, name) {
    const index = Number(e.target.id);
    const photo = photos[index];
    const storagePath = `${props.userID}/${photo.fileName}`;
    setShowSelectPhoto(false);
    return profileRef.update({ [name]: storagePath });
  }

  return (
    <>
      <Row className="justify-content-center" id="grad">
        <Col id="profile-col">
          <div id="background-pic-container">
            <StorageImage
              id="background-pic"
              storagePath={backgroundPictureURL}
              alt=""
            />
            <DropdownButton
              variant="light"
              id="background-pic-button"
              title={
                <b>
                  <MdPhotoCamera className="mr-1" size="20px" />
                  Edit Cover Photo
                </b>
              }
              size="sm"
            >
              <Dropdown.Item eventKey="1" onSelect={handleSelect}>
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
            <div id="profile-pic-container">
              <CircularImage size="180" url={profilePictureURL} />
              <Button
                variant="light"
                id="profile-pic-button"
                onClick={() => setShowUpdateProfilePic(true)}
              >
                <MdPhotoCamera size="19px" />
              </Button>
            </div>
          </div>
          <h2 className="text-center mt-5">
            <b>
              {firstname} {lastname}
            </b>
          </h2>
          <hr></hr>
          <Navbar bg="light">
            <Nav>
              <Nav.Item>
                <Link
                  key="1"
                  to={`${url}/Posts`}
                  className="nav-link mx-2"
                  onClick={(e) => handleClickLink(e, activeLink, setActiveLink)}
                >
                  <b>Posts</b>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  key="2"
                  to={`${url}/Friends`}
                  className="nav-link mx-2"
                  onClick={(e) => handleClickLink(e, activeLink, setActiveLink)}
                >
                  <b>Friends</b>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  key="3"
                  to={`${url}/Photos`}
                  className="nav-link mx-2"
                  onClick={(e) => handleClickLink(e, activeLink, setActiveLink)}
                >
                  <b>Photos</b>
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col id="profile-col">
          <Switch>
            <Route path={`${path}/:itemId`}>
              <NestedRoute
                photos={photos}
                userID={props.userID}
                openFileInput={() => openFileInput("")}
              />
            </Route>
          </Switch>
        </Col>
      </Row>

      <Modal show={showRemove} onHide={() => setShowRemove(false)}>
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
            onClick={() => setShowRemove(false)}
          >
            <b>Cancel</b>
          </Button>
          <Button variant="primary" onClick={handleClickSubmit}>
            <b>Submit</b>
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSelectPhoto}
        onHide={() => {
          setShowSelectPhoto(false);
        }}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "35%" }}>
            <strong>Select Photo</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {photos.map((photo, index) => {
            return (
              <StorageImage
                className="m-1"
                width="31%"
                height="90px"
                alt=""
                key={index}
                id={index}
                storagePath={`${props.userID}/${photo.fileName}`}
                style={{
                  objectFit: "cover",
                }}
                onClick={(e) => handlePhotoClick(e, "backgroundPictureURL")}
              ></StorageImage>
            );
          })}
        </Modal.Body>
      </Modal>

      <Modal
        show={showUpdateProfilePic}
        onHide={() => {
          setShowUpdateProfilePic(false);
        }}
        size="lg"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ margin: "auto" }}>
            <strong>Update Profile Picture</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            size="sm"
            variant="outline-primary"
            className="w-50 m-2 mb-3"
            onClick={() => {
              setNameOfURL("profilePictureURL");
              fileInputRef.current.click();
              setShowUpdateProfilePic(false);
            }}
          >
            <b>+ Upload Photo</b>
          </Button>
          <br />
          <b>Suggested Photos</b>
          <Row className="m-1">
            {photos.map((photo, index) => {
              return (
                <ResponsiveImage
                  width="15%"
                  height="15%"
                  userID={props.userID}
                  photo={photo}
                  index={index}
                  onClick={(e) => {
                    handlePhotoClick(e, "profilePictureURL");
                    setShowUpdateProfilePic(false);
                  }}
                  className="m-1"
                />
              );
            })}
          </Row>
        </Modal.Body>
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
