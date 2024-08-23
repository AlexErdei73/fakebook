import React from "react";
import { useParams } from "react-router-dom";
import Photos from "./Photos";
import Friends from "./Friends";
import Posts from "./Posts";

const NestedRoute = (props) => {
	const { itemId } = useParams();

	const { userID, openFileInput, linkHandling } = props;

	if (itemId === "Photos")
		return (
			<Photos
				userID={userID}
				openFileInput={openFileInput}
				//the rendering of the component changes the activeLink
				linkHandling={linkHandling}
			/>
		);
	if (itemId === "Friends")
		return (
			<Friends
				//the rendering of the component changes the activeLink
				linkHandling={linkHandling}
			/>
		);
	else
		return (
			<Posts
				userID={userID}
				//the rendering of the component changes the activeLink
				linkHandling={linkHandling}
			/>
		);
};

export default NestedRoute;
