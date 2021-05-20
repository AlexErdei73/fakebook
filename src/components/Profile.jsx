import React from "react";

const Profile = (props) => {
  return <h1 className="mt-5">Welcome {props.user.name}!</h1>;
};

export default Profile;
