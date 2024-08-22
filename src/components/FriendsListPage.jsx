import React, { useEffect } from "react";
import Profile from "./Profile";
import FriendList from "./FriendList";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./FriendsListPage.css";
import imgFriends from "../images/friends.jpg";
import { useDispatch } from "react-redux";
import { linkUpdated } from "../features/link/linkSlice";

const FriendsListPage = (props) => {

	const FRIENDS_LIST_PAGE_PATH = "/fakebook/friends/list";

	const location = useLocation();
	const dispatch = useDispatch();

	const isNoUser = FRIENDS_LIST_PAGE_PATH === location.pathname;

	//we set the active link to the friends link when it renders
	useEffect(() => {
		dispatch(linkUpdated("friends"));
	}, [dispatch]);

	return window.innerWidth > 600 || isNoUser ? (
		<Row className="overflow-hidden friends-list">
			<FriendList />
			<Col className="overflow-auto mh-100 hide-scrollbar col-two">
				{isNoUser ? (
					<div className="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
						<img
							width="200px"
							src={imgFriends}
							alt="cartoon of fakebook friends"
							className="p-4"
						/>
						<h5 className="text-muted">
							<b>Select people's names to preview their profile.</b>
						</h5>
					</div>
				) : (
					<div className="profile-container">
						<Profile />
					</div>
				)}
			</Col>
		</Row>
	) : (
		<Profile />
	);
};

export default FriendsListPage;
