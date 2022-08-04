import React, { useEffect, useRef, memo, useState } from "react";
import Features from "./Features";

const ChatHeader = ({
  participant,
  updateParticipantProfile,
  messageBoxRef,
}) => {
  const [name, setName] = useState("");
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const imageInputRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    if (participant) {
      setName(participant.name);
      setProfilePic(participant.profilePic);
    }
  }, [participant]);

  useEffect(() => {
    const element = imageInputRef.current;

    if (element) {
      element.addEventListener("change", processImageData);

      return () => {
        element.removeEventListener("change", processImageData);
      };
    }
  }, [imageInputRef]);

  useEffect(() => {
    if (isNameEdit) {
      const end = nameRef.current.value.length;
      nameRef.current.setSelectionRange(end, end);
      nameRef.current.focus();
    } else if (name) {
      handleProfileUpdate();
    }
  }, [isNameEdit]);

  useEffect(() => {
    if (profilePic) {
      handleProfileUpdate();
    }
  }, [profilePic]);

  const handleProfileUpdate = () => {
    localStorage.setItem("participant", JSON.stringify({ name, profilePic }));
    updateParticipantProfile({ name, profilePic });
  };

  const uploadImage = (file) => {
    const data = new FormData();
    const cloudName = process.env.REACT_APP_CLOUNDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUNDINARY_UPLOAD_PRESET;
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProfilePic(data.secure_url);
      })
      .catch((err) => console.log(err));
  };

  function processImageData() {
    const file = imageInputRef.current.files[0];
    uploadImage(file);
  }

  return (
    <div className="chat-header clearfix">
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        id="choose-file"
      />

      {participant && (
        <>
          <label htmlFor="choose-file">
            <div
              className="profile"
              style={{ backgroundImage: `url(${profilePic})` }}
            >
              <i className="camera fa fa-camera"></i>
            </div>
          </label>

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

      <Features messageBoxRef={messageBoxRef} />
    </div>
  );
};

export default memo(ChatHeader);
