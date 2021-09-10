import React from "react";
import TitleBar from "./components/Titlebar";
import Profile from "./components/Profile";
import PhotoViewer from "./components/PhotoViewer";
import HomePage from "./components/HomePage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useFirestore, useFirestoreDocDataOnce } from "reactfire";
import "firebase/auth";
import "firebase/firestore";

const UserAccount = (props) => {
  const { profileLink, userID, userState } = props;

  const userDocRef = useFirestore().collection("users").doc(userID);
  const result = useFirestoreDocDataOnce(userDocRef, {
    initialData: {
      firstname: "",
      lastname: "",
      profilePictureURL: "fakebook-avatar.jpeg",
      backgroundPictureURL: "background-server.jpg",
      photos: [],
    },
  });

  const currentUser = result.data;

  return (
    <div className="bg-200 vw-100">
      <Container className="w-100 p-0" fluid>
        <BrowserRouter>
          <TitleBar profileLink={profileLink} user={currentUser} />
          <Switch>
            <Route path={`/photo/:userID/:n`} render={() => <PhotoViewer />} />
            <Route
              path={`/:userName`}
              render={() => <Profile user={currentUser} userID={userID} />}
            />
            <Route
              path="/"
              render={() => (
                <HomePage className="mt-5" profileLink={profileLink} />
              )}
            />
          </Switch>
        </BrowserRouter>
        <div>{userState.error && <h4>{userState.error}</h4>}</div>
      </Container>
    </div>
  );
};

export default UserAccount;
