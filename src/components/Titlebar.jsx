import React, { useRef } from "react";
import { Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { FaFacebook } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { ImExit } from "react-icons/im";
import "./Titlebar.css";
import ProfileLink from "./ProfileLink";
import { signUserOut } from "../backend/backend";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleClickLink } from "./helper";
import { linkUpdated } from "../features/link/linkSlice";
import { friendsListPageSet } from "../features/accountPage/accountPageSlice";


const TitleBar = (props) => {

	const refs = {
		home: useRef(null),
		friends: useRef(null),
		watch: useRef(null),
		profile: useRef(null),
	};

	//Get the signed in user, active link and the profileLink
	const user = useSelector((state) => state.currentUser);
	const link = useSelector((state) => state.link);
	const profileLink = useSelector((state) => state.accountPage.profileLink);

	const dispatch = useDispatch();

	useEffect(() => {
		handleClickLink(
			{ currentTarget: refs[link.active].current },
			refs[link.previous].current
		);
	}, [link, refs]);

	// Log out function
	const handleClick = () => {
		signUserOut();
	};

	function closeFriendsListPage() {
		dispatch(friendsListPageSet(false));
		dispatch(linkUpdated("profile"));
	  }

	return (
		<div className="titlebar bg-light">
			<Navbar bg="light" className="p-0 nav-container">
				<Navbar.Brand as={Link} to="/fakebook">
					<FaFacebook color="dodgerblue" fontSize="2em" className="mx-3" />
				</Navbar.Brand>
				<div style={{ width: "450px" }} className="spaceing" />
				<Nav className="w-75 justify-content-start mr-5">
					<Nav.Item className="first">
						<Link to="/fakebook" className="nav-link" ref={refs.home}>
							<VscHome
								fontSize="2rem"
								className="mx-4"
								style={{ pointerEvents: "none" }}
							/>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link
							to="/fakebook/friends/list"
							className="nav-link"
							ref={refs.friends}>
							<FaUserFriends
								fontSize="2rem"
								className="mx-4"
								style={{ pointerEvents: "none" }}
							/>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/fakebook/watch" className="nav-link" ref={refs.watch}>
							<MdOndemandVideo
								fontSize="2rem"
								className="mx-4"
								style={{ pointerEvents: "none" }}
							/>
						</Link>
					</Nav.Item>
				</Nav>

				<Nav className="w-25 justify-content-end align-self-center">
					<Nav.Item className="align-self-center first">
						<Link
							to={profileLink}
							className="nav-link profile"
							id="profile"
							onClick={closeFriendsListPage}
							ref={refs.profile}>
							<ProfileLink user={user} size="30" fullname="false" bold="true" />
						</Link>
					</Nav.Item>
					<Nav.Item className="align-self-center">
						<DropdownButton
							title=""
							className="mr-4 custom-drop-down-btn"
							menuAlign="right">
							<Dropdown.Item
								as={Link}
								to={profileLink}
								onClick={closeFriendsListPage}>
								<ProfileLink
									user={user}
									size="60"
									fullname="true"
									bold="true"
								/>
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item
								as={Link}
								to="/fakebook/"
								onClick={handleClick}
								className="p-0">
								<ImExit fontSize="1.5em" className="mx-4" />
								<span>Log Out</span>
								<div style={{ width: "20em" }}></div>
							</Dropdown.Item>
						</DropdownButton>
					</Nav.Item>
				</Nav>
			</Navbar>
		</div>
	);
};

export default TitleBar;
