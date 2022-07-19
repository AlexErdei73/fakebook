import React from "react";
import StorageImage from "./StorageImage";

const ResponsiveImage = (props) => {
  const {
    width,
    height,
    index,
    userID,
    photo,
    onClick,
    className,
    useStoragePath,
  } = props;

  let storagePath;
  if (useStoragePath === "true") storagePath = photo;
  else storagePath = `/${userID}/${photo.fileName}`;

  return (
    <div
      key={index}
      className={className}
      style={{
        display: "inline-block",
        position: "relative",
        width: `${width}`,
        height: "0px",
        paddingBottom: `${height}`,
      }}
    >
      <StorageImage
        alt=""
        id={index}
        storagePath={storagePath}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onClick={onClick}
      ></StorageImage>
    </div>
  );
};

export default ResponsiveImage;
