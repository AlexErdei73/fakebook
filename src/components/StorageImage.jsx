import React, { useState } from "react";
import { getImageURL } from "../backend/backend";
import { useSelector, useDispatch } from "react-redux";
import placeholderImage from "../images/friends.jpg";
import { imageAdded, imageUrlFound } from "../features/images/imagesSlice";
import { useEffect } from "react";

const StorageImage = (props) => {
  const { storagePath, alt, ...rest } = props;

  //We use the images slice as a buffer. Fetching the actual url of the image
  //in the storage takes relatively long time and uses Firebase. We render the same
  //image in the app several times. Our goal to fetch the url only once for each image
  //to save resources.
  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const [url, setUrl] = useState(placeholderImage);

  useEffect(() => {
    let shouldUpdate = true;
    //We look for the url in images slice first
    const imageIndex = images
      .map((image) => image.storagePath)
      .indexOf(storagePath);
    //If we are unable to find it we add the image to the slice
    if (imageIndex === -1) {
      dispatch(
        imageAdded({
          storagePath,
          url,
        })
      );
      //We add the url for the image to the images slice when we have actually got it
      //We also update the local state to show the right image
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
      //If we are able to find the url in the images slice we just use it instead of fetching
      const newUrl = images[imageIndex].url;
      //We only update the state if it contains different value and we should update because
      //the component has not been unmounted by the time the promise resolves
      if (newUrl !== url && shouldUpdate) setUrl(newUrl);
    }
    //We return a cleanup function which runs when the component unmounts. We set
    //the shouldUpdate to false, so after this the state cannot be updated. If
    //we don't do this React gives us error messages about state update on our
    //unmounted component
    return () => (shouldUpdate = false);
  }, [images, storagePath, url, dispatch]);

  return <img src={url} alt={alt} {...rest} />;
};

export default StorageImage;
