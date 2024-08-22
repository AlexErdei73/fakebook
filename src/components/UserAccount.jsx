import React, { useEffect } from "react";
import TitleBar from "./Titlebar";
import Profile from "./Profile";
import PhotoViewer from "./PhotoViewer";
import HomePage from "./HomePage";
import FriendsListPage from "./FriendsListPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import {
	currentUserOffline,
	currentUserOnline,
	subscribeCurrentUser,
	subscribeUsers,
	subscribePosts,
} from "../backend/backend";
import { friendsListPageSet, profileLinkSet } from "../features/accountPage/accountPageSlice";

const UserAccount = (props) => {
	const profileLink = useSelector((state) => state.accountPage.profileLink);

	const currentUser = useSelector((state) => state.currentUser);
	const users = useSelector((state) => state.users);
  const isFriendsListPage = useSelector((state) => state.accountPage.isFriendsListPage);

	const dispatch = useDispatch();

  //We add the index of user to the profileLink if there are more users with the exact same userName
	function addIndexToProfileLink() {
		if (currentUser && currentUser.index && currentUser.index > 0) {
			return `${profileLink}.${currentUser.index}`;
		} else return profileLink;
	}

	useEffect(() => {
		const unsubscribeCurrentUser = subscribeCurrentUser();
		const unsubscribeUsers = subscribeUsers();
		const unsubscribePosts = subscribePosts();
		//We make currentUser online
		currentUserOnline();
		//We add event listener for the event when the user closes the browser window
		const beforeunloadListener = (e) => {
			//We put the user offline
			currentUserOffline();
		};
		window.addEventListener("beforeunload", beforeunloadListener);
		//we add event listener for the event when the browser window change visibility
		const visibilitychangeListener = (e) => {
			if (document.visibilityState === "visible") currentUserOnline();
			else currentUserOffline();
		};
		document.addEventListener("visibilitychange", visibilitychangeListener);
		//We add index to the profileLink if more users have the exact same name
		const newProfileLink = addIndexToProfileLink();
		dispatch(profileLinkSet(newProfileLink));
		return () => {
			unsubscribeCurrentUser();
			unsubscribeUsers();
			unsubscribePosts();
		};
	});

	if (users.length === 0 || !currentUser) {
		return <div>...Loading</div>;
	}

	return (
		<div className="bg-200 vw-100 main-container overflow-hidden">
			<Container className="w-100 p-0" fluid>
				<BrowserRouter>
					<TitleBar />
					<Switch>
						<Route
							path="/fakebook/friends/list"
							render={() => {
								dispatch(friendsListPageSet(true));
								return <FriendsListPage />;
							}}
						/>
						<Route
							path={`/fakebook/photo/:userID/:n`}
							render={() => <PhotoViewer />}
						/>
						<Route
							path="/fakebook/watch"
							render={() => {
								dispatch(friendsListPageSet(false));
								return <HomePage className="pt-5" />;
							}}
						/>
						<Route
							path={`/fakebook/:userName`}
							render={() => {
								if (isFriendsListPage) return <FriendsListPage />;
								else {
									return <Profile />;
								}
							}}
						/>
						<Route
							path="/fakebook"
							render={() => {
								dispatch(friendsListPageSet(false));
								return <HomePage className="pt-5" />;
							}}
						/>
					</Switch>
				</BrowserRouter>
			</Container>
		</div>
	);
};

export default UserAccount;
