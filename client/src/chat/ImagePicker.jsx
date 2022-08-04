import React, { memo, useEffect, useRef } from "react";

const ImagePicker = ({ tag, callback }) => {
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
    callback(file);
  }

  return <input type="file" ref={imageInputRef} accept="image/*" id={tag} />;
};

export default memo(ImagePicker);
