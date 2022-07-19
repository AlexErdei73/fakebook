import React, { useState } from "react";
import { getImageURL } from "../backend/backend";
import { useSelector, useDispatch } from "react-redux";
import placeholderImage from "../images/friends.jpg";
import { imageAdded, imageUrlFound } from "../features/images/imagesSlice";
import { useEffect } from "react";

const StorageImage = (props) => {
  const { storagePath, ...rest } = props;

  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const [url, setUrl] = useState(placeholderImage);

  useEffect(() => {
    const imageIndex = images
      .map((image) => image.storagePath)
      .indexOf(storagePath);
    if (imageIndex === -1) {
      dispatch(
        imageAdded({
          storagePath,
          url,
        })
      );
      getImageURL(storagePath).then((url) => {
        setUrl(url);
        dispatch(
          imageUrlFound({
            storagePath,
            url,
          })
        );
      });
    } else {
      setUrl(images[imageIndex].url);
    }
  }, [images, storagePath]);

  return <img src={url} {...rest} />;
};

export default StorageImage;
