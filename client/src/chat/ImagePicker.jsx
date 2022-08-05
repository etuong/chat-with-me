import React, { memo, useEffect, useRef } from "react";

const ImagePicker = ({ tag, isProfileCloud, callback }) => {
  const imageInputRef = useRef(null);

  useEffect(() => {
    const element = imageInputRef.current;

    if (element) {
      element.addEventListener("change", processImageData);

      return () => {
        element.removeEventListener("change", processImageData);
      };
    }
  }, [imageInputRef]);

  function processImageData() {
    const file = imageInputRef.current.files[0];
    uploadImage(file);
  }

  const uploadImage = (file) => {
    const data = new FormData();
    const cloudName = process.env.REACT_APP_CLOUNDINARY_CLOUD_NAME;
    const uploadPreset = isProfileCloud
      ? process.env.REACT_APP_CLOUNDINARY_UPLOAD_PROFILES_PRESET
      : process.env.REACT_APP_CLOUNDINARY_UPLOAD_MESSAGES_PRESET;
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        callback(data.secure_url);
      })
      .catch((err) => console.log(err));
  };

  return <input type="file" ref={imageInputRef} accept="image/*" id={tag} />;
};

export default memo(ImagePicker);
