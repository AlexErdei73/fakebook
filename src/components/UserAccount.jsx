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
  const { profileLink, userState } = props;

  useEffect(() => {
    const unsubscribeCurrentUser = subscribeCurrentUser();
    const unsubscribeUsers = subscribeUsers();
    //Update the online status if the current user does not seem to be online
    if (!currentUser.isOnline) {
      currentUserOnline();
    }
    //We add event listener for the event when the user closes the browser window
    window.addEventListener("beforeunload", (e) => {
      //We put the user offline
      currentUserOffline();
    });
    //we add event listener for the event when the browser window change visibility
    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState === "visible") currentUserOnline();
      else currentUserOffline();
    });
    const unsubscribePosts = subscribePosts();
    return () => {
      unsubscribeCurrentUser();
      unsubscribeUsers();
      unsubscribePosts();
    };
  }, []);

  const userID = useSelector((state) => state.user.id);
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);

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

  if (users.length === 0 || !currentUser.isOnline) {
    return <div>...Loading</div>;
  }

  return (
    <div className="bg-200 vw-100">
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
