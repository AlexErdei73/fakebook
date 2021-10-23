import React, { useState, useEffect } from "react";
import TitleBar from "./Titlebar";
import Profile from "./Profile";
import PhotoViewer from "./PhotoViewer";
import HomePage from "./HomePage";
import FriendsListPage from "./FriendsListPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import {
  useFirestore,
  useFirestoreDocDataOnce,
  useFirestoreCollectionData,
} from "reactfire";
import "firebase/auth";
import "firebase/firestore";

const UserAccount = (props) => {
  const { profileLink, userID, userState } = props;

  const firestore = useFirestore();
  const usersCollection = firestore.collection("users");

  const userDocRef = usersCollection.doc(userID);
  const result = useFirestoreDocDataOnce(userDocRef, {
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
                      />
                    );
                  else
                    return (
                      <Profile
                        user={currentUser}
                        userID={userID}
                        users={users}
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
