import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";

const Photos = (props) => {
  const { url } = useRouteMatch();
  const { userID, photos, openFileInput } = props;

  return (
    <Card variant="light" className="w-100">
      <Card.Body>
        <Card.Title>
          <Link to={url} className="text-body">
            <b>Photos</b>
          </Link>
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
        </Card.Title>
        <Row className="w-100">
          {photos.map((photo, index) => {
            return (
              <Col xs={6} sm={4} md={3} lg={2} className="px-1" key={index}>
                <Link to={`/photo/${userID}/${index}`}>
                  <ResponsiveImage
                    width="100%"
                    height="100%"
                    userID={userID}
                    photo={photo}
                    index={index}
                    className="m-2"
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
