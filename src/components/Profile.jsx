import React, { useState, useEffect, useRef } from "react";
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
import Posts from "./Posts";
import StorageImage from "./StorageImage";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../backend/backend";
import { linkUpdated } from "../features/link/linkSlice";

const Profile = (props) => {
	const { userName } = useParams();

	const userID = useSelector((state) => state.user.id);
	const users = useSelector((state) => state.users);
	const link = useSelector((state) => state.link);

	const user = () => {
		const userNames = users.map((user) => {
			if (!user.index || user.index === 0)
				return `${user.lastname}.${user.firstname}`;
			else return `${user.lastname}.${user.firstname}.${user.index}`;
		});
		const index = userNames.indexOf(userName);
		const user = users[index];
		return user;
	};

	const userId = () => user().userID;

	const isCurrentUser = userID === userId();

	let { firstname, lastname, profilePictureURL, backgroundPictureURL, photos } =
		user();

	const [showRemoveCoverPhotoDlg, setShowRemoveCoverPhotoDlg] = useState(false);

	const [showSelectPhoto, setShowSelectPhoto] = useState(false);

	const [showUpdateProfilePic, setShowUpdateProfilePic] = useState(false);

	const [showUploadPhotoDlg, setShowUploadPhotoDlg] = useState(false);

	const [nameOfURL, setNameOfURL] = useState("backgroundPictureURL");

	const [activeLink, setActiveLink] = useState(null);

	//we need the refs to handle the activeLink changes
	const photosLinkRef = useRef(null);
	const friendsLinkRef = useRef(null);
	const postsLinkRef = useRef(null);

	const linkHandlingProps = {
		linkRefs: {
			photos: photosLinkRef,
			friends: friendsLinkRef,
			posts: postsLinkRef
		},
		linkState: [activeLink, setActiveLink]
	}

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
		return updateProfile({ backgroundPictureURL: "background-server.jpg" });
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
		const newPhotos = [...photos];
		if (filenames.indexOf(file.name) === -1) {
			newPhotos.push(newPhoto);
		}
		const newProfile = { photos: newPhotos };
		if (nameOfURL !== "") newProfile[nameOfURL] = `${userID}/${file.name}`;
		return updateProfile(newProfile);
	}

	function handlePhotoClick(e, name) {
		const index = Number(e.target.id);
		const photo = photos[index];
		const storagePath = `${userID}/${photo.fileName}`;
		return updateProfile({ [name]: storagePath });
	}

	const dispatch = useDispatch();

	useEffect(() => {
		//we set the active link to the profile link when it renders
    //unless we are on the friends page and the window is wide
    //enough to see the profile on that page
		if (link.active !== "friends" || window.innerWidth < 600)
			dispatch(linkUpdated("profile"));
	}, [dispatch, link]);

	return (
		<>
			<Row className="justify-content-center grad">
				<Col className="m-0 p-0 profile-col">
					<div className="background-pic-container">
						<StorageImage
							className="background-pic"
							storagePath={backgroundPictureURL}
							alt=""
						/>
						{isCurrentUser && (
							<DropdownButton
								variant="light"
								className="background-pic-button"
								title={
									<b>
										<MdPhotoCamera className="mr-1" size="20px" />
										<span>Edit Cover Photo</span>
									</b>
								}
								size="sm">
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
						<div className="profile-pic-container">
							<CircularImage size="180" url={profilePictureURL} />
							{isCurrentUser && (
								<Button
									variant="light"
									className="profile-pic-button"
									onClick={() => setShowUpdateProfilePic(true)}>
									<MdPhotoCamera size="19px" aria-label="photo" />
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
									ref={postsLinkRef}>
									<b>Posts</b>
								</Link>
							</Nav.Item>
							<Nav.Item>
								<Link
									key="2"
									to={`${url}/Friends`}
									className="nav-link mx-2"
									ref={friendsLinkRef}>
									<b>Friends</b> {users.length}
								</Link>
							</Nav.Item>
							<Nav.Item>
								<Link
									key="3"
									to={`${url}/Photos`}
									className="nav-link mx-2"
									ref={photosLinkRef}>
									<b>Photos</b>
								</Link>
							</Nav.Item>
						</Nav>
					</Navbar>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col className="profile-col">
					<Switch>
						<Route path={`${path}/:itemId`}>
							<NestedRoute
								userID={userId()}
								openFileInput={() => openFileInput("")}
								//we only need the rest to handle the changes of the activeLink
								linkHandling = {linkHandlingProps}
							/>
						</Route>
						<Route path={path}>
							<Posts
								userID={userId()}
								//we only need the rest to handle the changes of the activeLink
								linkHandling = {linkHandlingProps}
							/>
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
