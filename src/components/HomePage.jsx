import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PostView from "./PostView";
import LeftNavbar from "./LeftNavbar";
import VideoView from "./VideoView";
import Contacts from "./Contacts";
import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { linkUpdated } from "../features/link/linkSlice";

const HomePage = (props) => {
	const { className } = props;

	const accountPage = useSelector((state) => state.accountPage);
	const { profileLink, isWatch } = accountPage;
	const dispatch = useDispatch();

	//we set the active link to the home link when it renders
	useEffect(() => {
		dispatch(linkUpdated(isWatch ? "watch" : "home"));
	}, [isWatch, dispatch]);

	return (
		<Row className={`${className} overflow-hidden vh-100`}>
			<Col className="mh-100 overflow-auto left-navbar-col">
				<LeftNavbar profileLink={profileLink} />
			</Col>
			<Col
				sm={9}
				md={isWatch ? 12 : 9}
				lg={isWatch ? 9 : 6}
				className="mh-100 overflow-auto hide-scrollbar">
				{!isWatch && <PostView />}
				{isWatch && <VideoView />}
			</Col>
			{!isWatch && (
				<Col
					className="mh-100 overflow-auto contacts-col"
					style={{ position: "relative" }}>
					<Contacts />
				</Col>
			)}
		</Row>
	);
};

export default HomePage;
