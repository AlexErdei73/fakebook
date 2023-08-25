import React, { useState, useEffect, useRef } from "react";
import TitleBar from "./Titlebar";
import Profile from "./Profile";
import PhotoViewer from "./PhotoViewer";
import HomePage from "./HomePage";
import FriendsListPage from "./FriendsListPage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import {
  currentUserOffline,
  currentUserOnline,
  subscribeCurrentUser,
  subscribeUsers,
  subscribePosts,
} from "../backend/backend";

const UserAccount = (props) => {
  const { profileLink } = props;

  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const unsubscribeCurrentUser = subscribeCurrentUser();
    const unsubscribeUsers = subscribeUsers();
    const unsubscribePosts = subscribePosts();
    //We make currentUser online
    currentUserOnline();
    //We add event listener for the event when the user closes the browser window
    const beforeunloadListener = (e) => {
      //We put the user offline
      currentUserOffline();
    };
    window.addEventListener("beforeunload", beforeunloadListener);
    //we add event listener for the event when the browser window change visibility
    const visibilitychangeListener = (e) => {
      if (document.visibilityState === "visible") currentUserOnline();
      else currentUserOffline();
    };
    document.addEventListener("visibilitychange", visibilitychangeListener);
    return () => {
      unsubscribeCurrentUser();
      unsubscribeUsers();
      unsubscribePosts();
    };
  }, []);

  //We add the index of user to the profileLink if there are more users with the exact same userName
  function modifyProfileLink() {
    if (currentUser && currentUser.index && currentUser.index > 0) {
      return `${profileLink}.${currentUser.index}`;
    } else return profileLink;
  }

  const isFriendsListPage = useRef(false);

  function closeFriendsListPage() {
    isFriendsListPage.current = false;
  }

  //code responsible for changing activelink with url changes

  const refs = {
    home: useRef(null),
    friends: useRef(null),
    watch: useRef(null),
    profile: useRef(null),
  };

  //add the active status of the link DOM elements

  const [activeLink, setActiveLink] = useState(null);

  if (users.length === 0 || !currentUser) {
    return <div>...Loading</div>;
  }

  return (
    <div className="bg-200 vw-100 main-container">
      <Container className="w-100 p-0" fluid>
        <BrowserRouter>
          <TitleBar
            profilelink={modifyProfileLink()}
            closeFriendsListPage={closeFriendsListPage}
            refs={refs}
          />
          <Switch>
            <Route
              path="/fakebook/friends/list"
              render={() => {
                isFriendsListPage.current = true;
                return (
                  <FriendsListPage
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
                    className="pt-0"
                    profileLink={modifyProfileLink()}
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
                      // the components need the above props to change the active link
                      linkRef={refs.friends}
                      activeLink={activeLink}
                      setActiveLink={setActiveLink}
                    />
                  );
                else
                  return (
                    <Profile
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
                    className="pt-0"
                    profileLink={modifyProfileLink()}
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
      </Container>
    </div>
  );
};

export default UserAccount;
