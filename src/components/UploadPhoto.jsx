import React, { useRef, useEffect } from "react";
import { useStorage } from "reactfire";

const UploadPhoto = (props) => {
  const { show, setShow, updateDatabase, userID } = props;

  const storage = useStorage();

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!show) return;
    fileInputRef.current.click();
    setShow(false);
  }, [show]);

  function onChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const ref = storage.ref(userID).child(file.name);
    ref
      .put(file)
      .then(() => {
        return updateDatabase(file);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={onChange}
    />
  );
};

export default UploadPhoto;
