import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";

const MiniPhotos = (props) => {
  const { user, userID } = props;

  const photos = user.photos;

  const NUMBER_OF_PHOTOS = 9;

  const photosLink = `/${user.lastname}.${user.firstname}/Photos`;

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link to={photosLink} className="text-body">
            <b>Photos</b>
          </Link>
        </Card.Title>
        <Row>
          {photos.map((photo, index) => {
            return (
              index < NUMBER_OF_PHOTOS && (
                <Col
                  xs={4}
                  className="m-0"
                  style={{
                    paddingLeft: "3px",
                    paddingRight: "3px",
                    paddingTop: "0",
                    paddingBottom: "0",
                  }}
                >
                  <ResponsiveImage
                    photo={photo}
                    userID={userID}
                    index={index}
                    width="100%"
                    height="100%"
                  />
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
