import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CreatePost from "./CreatePost";
import MiniPhotos from "./MiniPhotos";
import MiniFriends from "./MiniFriends";
import DisplayUserPost from "./DisplayUserPost";
import { handleClickLink } from "./helper";
import { useSelector } from "react-redux";
import "./Posts.css";

const Posts = (props) => {
	const { userID, linkHandling } = props;

	const { linkRefs, linkState } = linkHandling;
	const [activeLink, setActiveLink] = linkState;
	const { posts: postsLinkRef } = linkRefs;

	const users = useSelector((state) => state.users);
	const currentUserID = useSelector((state) => state.user.id);

	const isCurrentUser = userID === currentUserID;

	const user = users.find((user) => user.userID === userID);

	useEffect(() => {
		handleClickLink(
			{ currentTarget: postsLinkRef.current },
			activeLink,
			setActiveLink
		);
	}, [activeLink, postsLinkRef, setActiveLink]);

	return (
		<Row className="w-100 posts">
			<Col sm={5} className="mh-100 overflow-hidden">
				<MiniPhotos
					user={user}
					userID={userID}
					linkHandling={linkHandling}
					className="my-2"
				/>
				<MiniFriends user={user} linkHandling={linkHandling} className="my-2" />
			</Col>
			<Col sm={7} className="mh-100 overflow-auto hide-scrollbar bg-200">
				<CreatePost
					firstname={user.firstname}
					isCurrentUser={isCurrentUser}
					className="mt-2"
				/>
				{user.posts.map((postID, index) => {
					return (
						<DisplayUserPost
							key={index}
							postID={postID}
							className="mx-auto my-2"
						/>
					);
				})}
			</Col>
		</Row>
	);
};

export default Posts;
