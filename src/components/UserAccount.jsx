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
      isOnline: false,
    },
  });

  const currentUser = result.data;

  //We add the index of user to the profileLink if there are more users with the exact same userName
  function modifyProfileLink() {
    if (currentUser && currentUser.index && currentUser.index > 0) {
      return `${profileLink}.${currentUser.index}`;
    } else return profileLink;
  }

  const { status, data: users } = useFirestoreCollectionData(usersCollection, {
    idField: "userID",
  });

  const isFriendsListPage = useRef(false);

  function closeFriendsListPage() {
    isFriendsListPage.current = false;
  }

  function setUserOffline(signoutFn) {
    userDocRef.update({ isOnline: false }).then(() => signoutFn());
  }

  useEffect(() => {
    //Update the online status if the current user does not seem to be online
    if (!currentUser.isOnline) userDocRef.update({ isOnline: true });
  }, [currentUser.isOnline, userDocRef]);

  useEffect(() => {
    //We add event listener for the event when the user closes the browser window
    window.addEventListener("beforeunload", (e) => {
      //We put the user offline
      userDocRef.update({ isOnline: false });
    });
    //we add event listener for the event when the browser window change visibility
    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState === "visible")
        userDocRef.update({ isOnline: true });
      else userDocRef.update({ isOnline: false });
    });
  }, [userDocRef]);

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

  if (status === "loading" || !currentUser) {
    return <div>...Loading</div>;
  }

  return (
    <div className="bg-200 vw-100">
      <Container className="w-100 p-0" fluid>
        <BrowserRouter>
          <TitleBar
            profilelink={modifyProfileLink()}
            user={currentUser}
            closeFriendsListPage={closeFriendsListPage}
            setUserOffline={setUserOffline}
            refs={refs}
            dimension={dimension}
          />
          <Switch>
            <Route
              path="/fakebook/friends/list"
              render={() => {
                isFriendsListPage.current = true;
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
              path={`/fakebook/photo/:userID/:n`}
              render={() => <PhotoViewer />}
            />
            <Route
              path="/fakebook/watch"
              render={() => {
                isFriendsListPage.current = false;
                return (
                  <HomePage
                    className="pt-5"
                    profileLink={modifyProfileLink()}
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
              path={`/fakebook/:userName`}
              render={() => {
                if (isFriendsListPage.current)
                  return (
                    <FriendsListPage
                      users={users}
                      user={currentUser}
                      userID={userID}
                      dimension={dimension}
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
                      dimension={dimension}
                      // the components need the above props to change the active link
                      linkRef={refs.profile}
                      activeMainLink={activeLink}
                      setActiveMainLink={setActiveLink}
                    />
                  );
              }}
            />
            <Route
              path="/fakebook"
              render={() => {
                isFriendsListPage.current = false;
                return (
                  <HomePage
                    className="pt-5"
                    profileLink={modifyProfileLink()}
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
