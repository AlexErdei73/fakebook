import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { handleClickLink } from "./helper";
import ResponsiveImage from "./ResponsiveImage";
import { useSelector } from "react-redux";

const MiniFriends = (props) => {
	const { user, linkHandling, ...rest } = props;

	const { linkRefs, linkState } = linkHandling;
	const [activeLink, setActiveLink] = linkState;
	const { friends: friendsLinkRef } = linkRefs;

	const NUMBER_OF_FRIENDS = 9;

	const friendsLink =
		user.index && user.index > 0
			? `/fakebook/${user.lastname}.${user.firstname}.${user.index}/Friends`
			: `/fakebook/${user.lastname}.${user.firstname}/Friends`;

	function handleClick() {
		handleClickLink(
			{ currentTarget: friendsLinkRef.current },
			activeLink,
			setActiveLink
		);
	}

	const users = useSelector((state) => state.users);

	return (
		<Card {...rest}>
			<Card.Body>
				<Card.Title>
					<Link to={friendsLink} className="text-body" onClick={handleClick}>
						<b>Friends</b>
					</Link>
				</Card.Title>
				<Card.Subtitle className="text-muted">
					{users.length} friends
				</Card.Subtitle>
				<Row>
					{users.map((user, index) => {
						const userProfileURL =
							user.index && user.index > 0
								? `/fakebook/${user.lastname}.${user.firstname}.${user.index}`
								: `/fakebook/${user.lastname}.${user.firstname}`;
						const userName = `${user.firstname} ${user.lastname}`;
						return (
							//we render maximum 9 friends
							index < NUMBER_OF_FRIENDS && (
								<Col
									key={index}
									xs={4}
									className="m-0"
									style={{
										paddingLeft: "3px",
										paddingRight: "3px",
										paddingTop: "0",
										paddingBottom: "3px",
									}}>
									<ResponsiveImage
										photo={user.profilePictureURL}
										width="100%"
										height="100%"
										useStoragePath="true"
									/>
									<Link
										to={userProfileURL}
										className="text-body"
										onClick={handleClick}>
										<div className="w-100" style={{ height: "2.5em" }}>
											<p style={{ fontSize: "0.9em" }}>
												<b>{userName}</b>
											</p>
										</div>
									</Link>
								</Col>
							)
						);
					})}
				</Row>
			</Card.Body>
		</Card>
	);
};

export default MiniFriends;
