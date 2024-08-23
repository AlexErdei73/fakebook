import React, { useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import StorageImage from "./StorageImage";
import ProfileLink from "./ProfileLink";
import UploadPhoto from "./UploadPhoto";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AiFillYoutube } from "react-icons/ai";
import "./PostModal.css";
import { handleTextareaChange, addPhoto, delPhoto } from "./helper";
import { useSelector } from "react-redux";
import { upload } from "../backend/backend";

const PostModal = (props) => {
	const { show, onClose, setText, isYoutubeBtnPressed, placeholder } = props;

	const user = useSelector((state) => state.currentUser);
	const userID = useSelector((state) => state.user.id);

	const WELCOME_TEXT = `For adding YouTube video do the following:
     1. copy link of the video from the addresse bar of your browser
     2. press YouTube button again to upload the YouTube video to your post
     3. add your text for the post
     4. push the post button`;
	const INIT_POST = {
		userID: `${userID}`,
		text: "",
		isPhoto: false,
		photoURL: "",
		isYoutube: false,
		youtubeURL: "",
		likes: [],
	};
	const [post, setPost] = useState(INIT_POST);

	function handleChange(e) {
		const value = handleTextareaChange({
			e: e,
			state: post,
			setState: setPost,
		});
		setPostBtnEnabled(value);
	}

	function setPostBtnEnabled(value) {
		if (value === "") setBtnEnabled(false);
		else setBtnEnabled(true);
		setText(value);
	}

	const [isBtnEnabled, setBtnEnabled] = useState(false);
	let variant, disabled;
	if (isBtnEnabled) {
		variant = "primary";
		disabled = false;
	} else {
		variant = "secondary";
		disabled = true;
	}

	const [showUploadPhotoDlg, setShowUploadPhotoDlg] = useState(false);

	function addPhotoToPost(file) {
		addPhoto({
			state: post,
			setState: setPost,
			file: file,
			userID: userID,
		});
		setBtnEnabled(true);
	}

	function deletePhoto() {
		delPhoto({
			state: post,
			setState: setPost,
			user: user,
			userID: userID,
			sideEffect: setPostBtnAsSideEffect,
		});
	}

	function setPostBtnAsSideEffect() {
		if (post.text === "" && !post.isYoutube) setBtnEnabled(false);
	}

	function uploadPost() {
		upload(post).then(() => {
			setPost(INIT_POST);
			setText("");
			onClose();
		});
	}

	function addYoutubeVideo() {
		const url = post.text;
		const URL_PATTERN = "https://www.youtube.com/watch?v=";
		const MOBILE_URL_PATTERN = "https://m.youtube.com/watch?v=";
		if (!url.startsWith(URL_PATTERN) && !url.startsWith(MOBILE_URL_PATTERN))
			return;
		let patternLength;
		if (url.startsWith(URL_PATTERN)) patternLength = URL_PATTERN.length;
		else patternLength = MOBILE_URL_PATTERN.length;
		const videoID = url.slice(patternLength);
		const youtubeURL = `https://www.youtube.com/embed/${videoID}`;
		const newPost = { ...post };
		newPost.isYoutube = true;
		newPost.youtubeURL = youtubeURL;
		newPost.text = "";
		setPost(newPost);
		setText("");
		setBtnEnabled(true);
	}

	function deleteYoutubeVideo() {
		const newPost = { ...post };
		newPost.isYoutube = false;
		newPost.youtubeURL = "";
		setPost(newPost);
		if (post.text === "" && !post.isPhoto) setBtnEnabled(false);
	}

	function getPlaceholder() {
		if (isYoutubeBtnPressed && !post.isYoutube) return WELCOME_TEXT;
		else return placeholder;
	}

	function getRows() {
		if (getPlaceholder() === WELCOME_TEXT && post.text === "") return 7;
		else return 3;
	}

	return (
		<>
			<Modal show={show} onHide={onClose}>
				<Modal.Header closeButton>
					<div className="w-100 d-flex justify-content-center">
						<Modal.Title>
							<b>Create Post</b>
						</Modal.Title>
					</div>
				</Modal.Header>
				<Modal.Body>
					<ProfileLink user={user} size="45" fullname="true" bold="true" />
					<div className="mt-2 scrolling-container">
						<textarea
							type="text"
							onChange={handleChange}
							className="w-100 mt-2 textarea"
							placeholder={getPlaceholder()}
							rows={getRows()}
							value={post.text}></textarea>
						{post.isPhoto && (
							<div className="mb-2 img-container">
								<StorageImage
									alt=""
									storagePath={`/${post.photoURL}`}
									className="w-100 img-to-post"
								/>
								<div className="close-btn-container">
									<CloseButton onClick={deletePhoto} />
								</div>
							</div>
						)}
						{post.isYoutube && (
							<div className="mb-2 video-container">
								<iframe
									src={post.youtubeURL}
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
									allowFullScreen></iframe>
								<div className="close-btn-container">
									<CloseButton onClick={deleteYoutubeVideo} />
								</div>
							</div>
						)}
					</div>
					<div className="w-100 my-2 add-to-post">
						<b>Add to your post</b>
						<Button
							className="ml-2 add-photo-btn"
							variant="light"
							size="sm"
							onClick={addYoutubeVideo}
							disabled={post.isPhoto || post.isYoutube}>
							<AiFillYoutube
								size="26px"
								className="text-danger"
								aria-label="YouTube"
							/>
						</Button>
						<Button
							className="ml-2 add-photo-btn"
							variant="light"
							size="sm"
							onClick={() => setShowUploadPhotoDlg(true)}
							disabled={post.isPhoto || post.isYoutube}>
							<HiOutlinePhotograph
								size="26px"
								className="text-success"
								aria-label="photo"
							/>
						</Button>
					</div>
					<Button
						variant={variant}
						className="w-100 mt-3"
						disabled={disabled}
						onClick={uploadPost}>
						<b>Post</b>
					</Button>
				</Modal.Body>
			</Modal>
			<UploadPhoto
				show={showUploadPhotoDlg}
				setShow={setShowUploadPhotoDlg}
				updateDatabase={addPhotoToPost}
			/>
		</>
	);
};

export default PostModal;
