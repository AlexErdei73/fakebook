import React from "react";
import { useFirestore, useFirestoreDocData, StorageImage } from "reactfire";
import { Row, Col, Carousel, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const PhotoViewer = () => {
  const { userID, n } = useParams();
  console.log("userID: ", userID);
  console.log("n: ", n);

  const profileRef = useFirestore().collection("users").doc(userID);
  let result = useFirestoreDocData(profileRef);

  let { photos } = result.data;
  console.log(photos);

  return (
    <Row>
      <Col md={8} className="bg-dark">
        <Carousel className="w-100">
          {photos.map((photo, index) => {
            return (
              <Carousel.Item key={index}>
                <StorageImage
                  storagePath={`${userID}/${photo.fileName}`}
                  alt=""
                  className="d-block m-auto vh-100"
                ></StorageImage>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default PhotoViewer;
