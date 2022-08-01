import Features from "./Features";
import React, { useEffect, useRef, useState, memo } from "react";

const ChatHeader = ({ participant }) => {
  const [name, setName] = useState();
  const [isNameEdit, setIsNameEdit] = useState(false);

  const imageInputRef = useRef(null);
  const imageRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const element = imageInputRef.current;
    if (element) {
      element.addEventListener("change", getImageData);

      return () => {
        element.removeEventListener("change", getImageData);
      };
    }
  }, [imageInputRef]);

  useEffect(() => {
    if (isNameEdit) {
      const end = nameRef.current.value.length;
      nameRef.current.setSelectionRange(end, end);
      nameRef.current.focus();
    }
  }, [isNameEdit]);

  useEffect(() => {
    if (participant) {
      setName(participant.name);
    }
  }, [participant]);

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
  }, [name]);

  const handleImageChange = (_) => {
    imageInputRef.current.click();
  };
  function getImageData() {
    const file = imageInputRef.current.files[0];
    imageRef.current.src = window.URL.createObjectURL(file);
  }

  return (
    <div className="chat-header clearfix">
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        id="choose-file"
        name="choose-file"
      />
      {participant && (
        <>
          <div className="profile" htmlFor="choose-file">
            <img
              ref={imageRef}
              onClick={handleImageChange}
              src={participant.picture}
              alt=""
            />
            <i className="camera fa fa-camera"></i>
          </div>
          <div className="name">
            {isNameEdit ? (
              <input
                type="text"
                ref={nameRef}
                value={name}
                className="editing"
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <>{name}</>
            )}
            <span
              className={`pencil ${isNameEdit ? "edit" : "notEdit"}`}
              onClick={(_) => {
                setIsNameEdit(!isNameEdit);
              }}
            >
              &#9998;
            </span>
          </div>
        </>
      )}
      <Features />
    </div>
  );
};

export default memo(ChatHeader);
