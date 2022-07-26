import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";
import { handleClickLink } from "./helper";

const MiniPhotos = (props) => {
  const { user, userID, photosLinkRef, activeLink, setActiveLink, ...rest } =
    props;

  const photos = user.photos;

  const NUMBER_OF_PHOTOS = 9;

  const photosLink = `/fakebook/${user.lastname}.${user.firstname}/Photos`;

  function handleClick() {
    handleClickLink(
      { currentTarget: photosLinkRef.current },
      activeLink,
      setActiveLink
    );
  }

  return (
    <Card {...rest}>
      <Card.Body>
        <Card.Title>
          <Link to={photosLink} className="text-body" onClick={handleClick}>
            <b>Photos</b>
          </Link>
        </Card.Title>
        <Row>
          {photos.map((photo, index) => {
            return (
              //we only render maximum 9 photos
              index < NUMBER_OF_PHOTOS && (
                <Col
                  key={index}
                  xs={4}
                  className="m-0"
                  style={{
                    paddingLeft: "3px",
                    paddingRight: "3px",
                    paddingTop: "0",
                    paddingBottom: "0",
                  }}
                >
                  <Link
                    to={`/fakebook/photo/${userID}/${index}`}
                    className="text-body"
                    onClick={handleClick}
                    tabIndex="-1"
                  >
                    <ResponsiveImage
                      photo={photo}
                      userID={userID}
                      index={index}
                      width="100%"
                      height="100%"
                    />
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

export default MiniPhotos;
