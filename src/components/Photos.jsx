import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";

const Photos = (props) => {
  const { url, path } = useRouteMatch();
  const { userID, photos } = props;

  function getPhotoURL(url, index) {
    return url.replace("Photos", `photo/${index}`);
  }

  return (
    <Card variant="light" className="w-100">
      <Card.Body>
        <Card.Title>
          <Link to={url} className="text-body">
            <b>Photos</b>
          </Link>
        </Card.Title>
        <Row>
          {photos.map((photo, index) => {
            return (
              <Col xs={6} sm={4} md={3} lg={2} className="px-1" key={index}>
                <Link to={getPhotoURL(url, index)}>
                  <ResponsiveImage
                    width="100%"
                    height="100%"
                    userID={userID}
                    photo={photo}
                    index={index}
                    onClick={(e) => {
                      return;
                    }}
                    className=""
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
