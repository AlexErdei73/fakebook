import React from "react";
import StorageImage from "./StorageImage";

const CircularImage = (props) => {
  const { size, url, isOnline, ...rest } = props;

  const radius = Math.floor(size / 6);

  const shift = Math.floor(0.8536 * size - radius / 2);

  return (
    <>
      <StorageImage
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "cover",
          borderRadius: `${size / 2}px`,
          pointerEvents: "none",
          position: "relative",
        }}
        storagePath={url}
        alt=""
        {...rest}
      />
      {isOnline && (
        <div
          className="bg-success"
          style={{
            width: `${2 * radius}px`,
            height: `${2 * radius}px`,
            borderRadius: "50%",
            position: "absolute",
            top: `${shift}px`,
            left: `${shift}px`,
            border: "2px solid white",
          }}
        />
      )}
    </>
  );
};

export default CircularImage;
