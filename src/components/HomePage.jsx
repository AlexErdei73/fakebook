import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import CreatePost from "./CreatePost";
import DisplayPost from "./DisplayPost";
import LeftNavbar from "./LeftNavbar";
import "./HomePage.css";

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
      <Row className={`${props.className} overflow-hidden vh-100`}>
        {dimension.width > LG_WINDOW && (
          <Col className="mh-100 overflow-auto">
            <LeftNavbar user={props.user} profileLink={props.profileLink} />
          </Col>
        )}
        <Col
          sm={12}
          md={9}
          lg={6}
          className="mh-100 overflow-auto hide-scrollbar"
        >
          window size: {dimension.width} x {dimension.height}
          <CreatePost
            user={props.user}
            userID={props.userID}
            className="w-75 m-auto p-0"
          />
          {posts.map((post, index) => {
            return (
              <DisplayPost
                key={index}
                post={post}
                users={props.users}
                className="w-75 mx-auto my-2"
              />
            );
          })}
        </Col>
        {dimension.width > MD_WINDOW && (
          <Col className="bg-dark text-light mh-100 overflow-auto">col - 3</Col>
        )}
      </Row>
    );
};

export default HomePage;
