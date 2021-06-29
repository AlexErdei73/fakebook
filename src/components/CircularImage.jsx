import React from "react";
import { StorageImage } from "reactfire";

const CircularImage = (props) => {
  return (
    <StorageImage
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
        objectFit: "cover",
        borderRadius: `${props.size / 2}px`,
        pointerEvents: "none",
      }}
      storagePath={props.url}
    />
  );
};

export default CircularImage;
