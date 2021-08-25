import React, { useState } from "react";
import { useFirestore, useFirestoreDocData, StorageImage } from "reactfire";
import { Row, Col, Carousel, Card } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";

const PhotoViewer = () => {
  const { userID, n } = useParams();

  const profileRef = useFirestore().collection("users").doc(userID);
  let result = useFirestoreDocData(profileRef);

  let { photos } = result.data;

  const [activeIndex, setActiveIndex] = useState(Number(n));

  const history = useHistory();

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
    history.push(`/photo/${userID}/${activeIndex}`);
  };

  return (
    <Row
      style={{
        position: "relative",
        zIndex: "2000",
        height: "98vh",
      }}
    >
      <Col md={9} className="h-100" style={{ backgroundColor: "black" }}>
        <Carousel
          className="w-100 h-100"
          indicators={false}
          slide={false}
          touch={false}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        >
          {photos.map((photo, index) => {
            return (
              <Carousel.Item
                key={index}
                style={{
                  width: "100%",
                  height: "98vh",
                }}
              >
                <StorageImage
                  storagePath={`${userID}/${photo.fileName}`}
                  alt=""
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    maxWidth: "600px",
                    height: "100%",
                    objectFit: "contain",
                  }}
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
