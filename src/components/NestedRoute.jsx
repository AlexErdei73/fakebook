import React from "react";
import { useParams } from "react-router-dom";

const NestedRoute = () => {
  const { itemId } = useParams();
  console.log(`Clicked item: ${itemId}`);

  return <h3>Clicked Item: {itemId}</h3>;
};

export default NestedRoute;
