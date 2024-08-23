import React, { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";
import { handleClickLink } from "./helper";
import { useSelector } from "react-redux";

const Photos = (props) => {
  const { url } = useRouteMatch();
  const { userID, openFileInput, linkHandling } = props;
  const { linkRefs, linkState } = linkHandling;
  const photosLinkRef = linkRefs.photos;
  const [activeLink, setActiveLink] = linkState;

  const users = useSelector((state) => state.users);
  const currentUserID = useSelector((state) => state.user.id);

  const isCurrentUser = userID === currentUserID;
  const user = users.find((user) => user.userID === userID);
  const photos = user.photos;

  useEffect(() => {
    handleClickLink(
      { currentTarget: photosLinkRef.current },
      activeLink,
      setActiveLink
    );
  }, [activeLink, photosLinkRef, setActiveLink]);

  return (
    <Card variant="light" className="w-100">
      <Card.Body>
        <Card.Title>
          <Link to={url} className="text-body">
            <b>Photos</b>
          </Link>
          {isCurrentUser && (
            <Button
              variant="link"
              style={{
                textDecoration: "none",
                float: "right",
              }}
              onClick={openFileInput}
            >
              <b>Add Photos</b>
            </Button>
          )}
        </Card.Title>
        <Row className="w-100">
          {photos.map((photo, index) => {
            return (
              <Col key={index} xs={6} sm={4} md={3} lg={2} className="p-1">
                <Link to={`/fakebook/photo/${userID}/${index}`}>
                  <ResponsiveImage
                    width="100%"
                    height="100%"
                    userID={userID}
                    photo={photo}
                    index={index}
                  />
                </Link>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Photos;
