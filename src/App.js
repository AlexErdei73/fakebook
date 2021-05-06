import React, { useState } from "react";
import "./App.css";
import Signup from "./components/signup";
import Login from "./components/login";
import Logout from "./components/logout";
import { AuthCheck } from "reactfire";

function App() {
  // User State
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    password: "",
    error: "",
  });

  function addError(errorMsg) {
    setUser({
      ...user,
      error: errorMsg,
    });
  }

  function updateUser(name, value) {
    setUser({
      ...user,
      [name]: value,
      error: "",
    });
  }

  return (
    <div className="App">
      <h1>fakebook</h1>
      <AuthCheck
        fallback={
          <>
            <Login onError={addError} onChange={updateUser} user={user}></Login>
            <Signup
              onError={addError}
              onChange={updateUser}
              user={user}
            ></Signup>
          </>
        }
      >
        <Logout userName={user.nickname}></Logout>
      </AuthCheck>
      {user.error && <h4>{user.error}</h4>}
    </div>
  );
}

export default App;
