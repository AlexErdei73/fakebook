import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import CreatePost from "./CreatePost";
import DisplayPost from "./DisplayPost";
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

  const firestore = useFirestore();
  const postsRef = firestore.collection("posts");

  const { status, data: posts } = useFirestoreCollectionData(
    postsRef.orderBy("timestamp")
  );

  if (status !== "success") return <div>...loading</div>;
  else
    return (
      <Row className={props.className}>
        {dimension.width > LG_WINDOW && (
          <Col>
            <LeftNavbar user={props.user} profileLink={props.profileLink} />
          </Col>
        )}
        <Col sm={12} md={9} lg={6}>
          window size: {dimension.width} x {dimension.height}
          <CreatePost user={props.user} userID={props.userID} />
          {posts.map((post, index) => {
            return <DisplayPost key={index} post={post} users={props.users} />;
          })}
        </Col>
        {dimension.width > MD_WINDOW && (
          <Col className="bg-dark text-light">col - 3</Col>
        )}
      </Row>
    );
};

export default HomePage;
