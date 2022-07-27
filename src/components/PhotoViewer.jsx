import React, { useState, useEffect } from "react";
import StorageImage from "./StorageImage";
import { Row, Col, Carousel } from "react-bootstrap";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PhotoViewer = () => {
  const { userID, n } = useParams();

  const users = useSelector((state) => state.users);
  const photos = users.find((user) => user.userID === userID).photos;

  const [activeIndex, setActiveIndex] = useState(Number(n));

  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    const locArr = location.pathname.split("/");
    const index = Number(locArr.pop());
    setActiveIndex(index);
  }, [location]);

  const handleSelect = (selectedIndex, e) => {
    history.push(`/fakebook/photo/${userID}/${selectedIndex}`);
  };

  return (
    <Row
      className="bg-200"
      style={{
        position: "relative",
        top: "50px",
        height: "89vh",
      }}
    >
      <Col md={9} className="h-100" style={{ backgroundColor: "black" }}>
        <Carousel
          className="w-100 h-100"
          interval={null}
          indicators={false}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        >
          {photos.map((photo, index) => {
            return (
              <Carousel.Item
                key={index}
                style={{
                  width: "100%",
                  height: "89vh",
                }}
              >
                <StorageImage
                  storagePath={`/${userID}/${photo.fileName}`}
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
