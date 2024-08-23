import React, { useRef, useEffect } from "react";
import { addFileToStorage } from "../backend/backend";

const UploadPhoto = (props) => {
  const { show, setShow, updateDatabase } = props;

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!show) return;
    fileInputRef.current.click();
    setShow(false);
  }, [show, setShow]);

  function onChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    addFileToStorage(file).then(() => {
      return updateDatabase(file);
    });
  }

  return (
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={onChange}
    />
  );
};

export default UploadPhoto;
