import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import LeftNavbar from "./LeftNavbar";

const HomePage = (props) => {
  const LG_WINDOW = 992;
  const MD_WINDOW = 768;

  const [dimension, setDimension] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  function debounce(fn, ms) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
        clearTimeout(timer);
      }, ms);
    };
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 100);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return (
    <Row {...props}>
      {dimension.width > LG_WINDOW && (
        <Col>
          <LeftNavbar profileLink={props.profileLink} />
        </Col>
      )}
      <Col sm={12} md={9} lg={6}>
        window size: {dimension.width} x {dimension.height}
      </Col>
      {dimension.width > MD_WINDOW && (
        <Col className="bg-dark text-light">col - 3</Col>
      )}
    </Row>
  );
};

export default HomePage;
