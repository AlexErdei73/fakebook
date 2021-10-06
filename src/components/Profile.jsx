import React, { useState } from "react";
import { useFirestore, StorageImage } from "reactfire";
import {
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Nav,
  Navbar,
} from "react-bootstrap";
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { ImUpload2 } from "react-icons/im";
import { HiOutlinePhotograph } from "react-icons/hi";
import CircularImage from "./CircularImage";
import NestedRoute from "./NestedRoute";
import RemoveCoverPhotoDlg from "./RemoveCoverPhotoDlg";
import SelectBgPhotoModal from "./SelectBgPhotoModal";
import UpdateProfilePicModal from "./UpdateProfilePicModal";
import UploadPhoto from "./UploadPhoto";
import "./Profile.css";
import { handleClickLink } from "./helper";

const Profile = (props) => {
  const { userName } = useParams();

  const { users, userID } = props;

  const user = () => {
    const userNames = users.map((user) => `${user.lastname}.${user.firstname}`);
    const index = userNames.indexOf(userName);
    const user = users[index];
    return user;
  };

  const userId = () => user(users).userID;

  const isCurrentUser = userID === userId();

  let { firstname, lastname, profilePictureURL, backgroundPictureURL, photos } =
    user();

  const profileRef = useFirestore().collection("users").doc(userId());

  const [showRemoveCoverPhotoDlg, setShowRemoveCoverPhotoDlg] = useState(false);

  const [showSelectPhoto, setShowSelectPhoto] = useState(false);

  const [showUpdateProfilePic, setShowUpdateProfilePic] = useState(false);

  const [showUploadPhotoDlg, setShowUploadPhotoDlg] = useState(false);

  const [nameOfURL, setNameOfURL] = useState("backgroundPictureURL");

  const [activeLink, setActiveLink] = useState(null);

  const { url, path } = useRouteMatch();

  function openFileInput(nameOfURL) {
    setNameOfURL(nameOfURL);
    setShowUploadPhotoDlg(true);
  }

  function handleSelect(key) {
    switch (key) {
      case "3":
        setShowRemoveCoverPhotoDlg(true);
        break;
      case "2":
        openFileInput("backgroundPictureURL");
        break;
      case "1":
        setShowSelectPhoto(true);
        break;
      default:
        return;
    }
  }

  function closeDlg() {
    setShowRemoveCoverPhotoDlg(false);
  }

  function removeCoverPhoto() {
    closeDlg();
    return profileRef.update({ backgroundPictureURL: "background-server.jpg" });
  }

  function hideBgPhotoModal() {
    setShowSelectPhoto(false);
  }

  function handleBgPhotoClick(event) {
    hideBgPhotoModal();
    handlePhotoClick(event, "backgroundPictureURL");
  }

  function hideProfilePicModal() {
    setShowUpdateProfilePic(false);
  }

  function handleUploadProfilePicClick() {
    hideProfilePicModal();
    openFileInput("profilePictureURL");
  }

  function handleProfilePicClick(event) {
    hideProfilePicModal();
    handlePhotoClick(event, "profilePictureURL");
  }

  function updatePhotos(file) {
    const newPhoto = { fileName: file.name };
    const filenames = photos.map((photo) => photo.fileName);
    if (filenames.indexOf(file.name) === -1) {
      photos.push(newPhoto);
    }
    const newProfile = { photos: photos };
    if (nameOfURL !== "") newProfile[nameOfURL] = `${userID}/${file.name}`;
    return profileRef.update(newProfile);
  }

  function handlePhotoClick(e, name) {
    const index = Number(e.target.id);
    const photo = photos[index];
    const storagePath = `${userID}/${photo.fileName}`;
    return profileRef.update({ [name]: storagePath });
  }

  return (
    <>
      <Row className="justify-content-center" id="grad">
        <Col id="profile-col" className="m-0 p-0">
          <div id="background-pic-container">
            <StorageImage
              id="background-pic"
              storagePath={backgroundPictureURL}
              alt=""
            />
            {isCurrentUser && (
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
            )}
            <div id="profile-pic-container">
              <CircularImage size="180" url={profilePictureURL} />
              {isCurrentUser && (
                <Button
                  variant="light"
                  id="profile-pic-button"
                  onClick={() => setShowUpdateProfilePic(true)}
                >
                  <MdPhotoCamera size="19px" />
                </Button>
              )}
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
                userID={userId()}
                users={users}
                openFileInput={() => openFileInput("")}
                isCurrentUser={isCurrentUser}
              />
            </Route>
            <Route path={path}>
              <h5>This is direct rendering without NestedRoute</h5>
            </Route>
          </Switch>
        </Col>
      </Row>

      <RemoveCoverPhotoDlg
        show={showRemoveCoverPhotoDlg}
        removeCoverPhoto={removeCoverPhoto}
        closeDlg={closeDlg}
      />

      <SelectBgPhotoModal
        show={showSelectPhoto}
        onHide={hideBgPhotoModal}
        onPhotoClick={handleBgPhotoClick}
        userID={userID}
        photos={photos}
      />

      <UpdateProfilePicModal
        show={showUpdateProfilePic}
        onHide={hideProfilePicModal}
        onBtnClick={handleUploadProfilePicClick}
        onPhotoClick={handleProfilePicClick}
        userID={userID}
        photos={photos}
      />

      <UploadPhoto
        show={showUploadPhotoDlg}
        setShow={setShowUploadPhotoDlg}
        updateDatabase={updatePhotos}
        userID={userID}
      />
    </>
  );
};

export default Profile;
