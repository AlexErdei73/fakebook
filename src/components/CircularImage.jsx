import React, { useState, useEffect } from "react";
import { StorageImage } from "reactfire";
import "firebase/storage";
import { getImageURL } from "../backend/backend";

const CircularImage = (props) => {
  const { size, url, isOnline, ...rest } = props;

  const [src, setSrc] = useState("");

  const radius = Math.floor(size / 6);

  const shift = Math.floor(0.8536 * size - radius / 2);

  useEffect(() => {
    (async () => setSrc(await getImageURL(url)))();
  }, []);

  return (
    <>
      <img
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "cover",
          borderRadius: `${size / 2}px`,
          pointerEvents: "none",
          position: "relative",
        }}
        src={src}
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
