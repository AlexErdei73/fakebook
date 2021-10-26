import React, { useState, useEffect, useRef } from "react";
import TitleBar from "./Titlebar";
import Profile from "./Profile";
import PhotoViewer from "./PhotoViewer";
import HomePage from "./HomePage";
import FriendsListPage from "./FriendsListPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreCollectionData,
} from "reactfire";
import "firebase/auth";
import "firebase/firestore";

const UserAccount = (props) => {
  const { profileLink, userID, userState } = props;

  const firestore = useFirestore();
  const usersCollection = firestore.collection("users");

  const userDocRef = usersCollection.doc(userID);
  const result = useFirestoreDocData(userDocRef, {
    initialData: {
      firstname: "",
      lastname: "",
      profilePictureURL: "fakebook-avatar.jpeg",
      backgroundPictureURL: "background-server.jpg",
      photos: [],
      posts: [],
    },
  });

  const currentUser = result.data;

  const { status, data: users } = useFirestoreCollectionData(usersCollection, {
    idField: "userID",
  });

  const [isFriendsListPage, setIsFriendsListPage] = useState(false);

  function closeFriendsListPage() {
    setIsFriendsListPage(false);
  }

  //This part is responsible for responsive behaviour only
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

  //code responsible for changing activelink with url changes

  const refs = {
    home: useRef(null),
    friends: useRef(null),
    watch: useRef(null),
    profile: useRef(null),
  };

  //add the active status of the link DOM elements
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    console.log("UserAccount activeLink:", activeLink);
  }, [activeLink]);

  if (status !== "success") return <div>...Loading</div>;
  else
    return (
      <div className="bg-200 vw-100">
        <Container className="w-100 p-0" fluid>
          <BrowserRouter>
            <TitleBar
              profilelink={profileLink}
              user={currentUser}
              closeFriendsListPage={closeFriendsListPage}
              refs={refs}
              dimension={dimension}
            />
            <Switch>
              <Route
                path="/friends/list"
                render={() => {
                  setIsFriendsListPage(true);
                  return (
                    <FriendsListPage
                      users={users}
                      user={currentUser}
                      userID={userID}
                      // the components need the above props to change the active link
                      linkRef={refs.friends}
                      activeLink={activeLink}
                      setActiveLink={setActiveLink}
                    />
                  );
                }}
              />
              <Route
                path={`/photo/:userID/:n`}
                render={() => <PhotoViewer />}
              />
              <Route
                path="/watch"
                render={() => {
                  setIsFriendsListPage(false);
                  return (
                    <HomePage
                      className="pt-5"
                      profileLink={profileLink}
                      user={currentUser}
                      userID={userID}
                      users={users}
                      dimension={dimension}
                      isWatch={true}
                      // the components need the above props to change the active link
                      linkRef={refs.watch}
                      activeLink={activeLink}
                      setActiveLink={setActiveLink}
                    />
                  );
                }}
              />
              <Route
                path={`/:userName`}
                render={() => {
                  if (isFriendsListPage)
                    return (
                      <FriendsListPage
                        users={users}
                        user={currentUser}
                        userID={userID}
                        // the components need the above props to change the active link
                        linkRef={refs.friends}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                      />
                    );
                  else
                    return (
                      <Profile
                        user={currentUser}
                        userID={userID}
                        users={users}
                        // the components need the above props to change the active link
                        linkRef={refs.profile}
                        activeMainLink={activeLink}
                        setActiveMainLink={setActiveLink}
                      />
                    );
                }}
              />
              <Route
                path="/"
                render={() => {
                  setIsFriendsListPage(false);
                  return (
                    <HomePage
                      className="pt-5"
                      profileLink={profileLink}
                      user={currentUser}
                      userID={userID}
                      users={users}
                      dimension={dimension}
                      isWatch={false}
                      // the components need the above props to change the active link
                      linkRef={refs.home}
                      activeLink={activeLink}
                      setActiveLink={setActiveLink}
                    />
                  );
                }}
              />
            </Switch>
          </BrowserRouter>
          <div>{userState.error && <h4>{userState.error}</h4>}</div>
        </Container>
      </div>
    );
};

export default UserAccount;
