import React from "react";
import { useParams } from "react-router-dom";
import Photos from "./Photos";

const NestedRoute = (props) => {
  const { itemId } = useParams();

  const { photos, userID } = props;

  if (itemId === "Photos") return <Photos photos={photos} userID={userID} />;
  else return <h3>Clicked Item: {itemId}</h3>;
};

export default NestedRoute;
