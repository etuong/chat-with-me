import React, { useEffect, useRef, memo, useState } from "react";
import Features from "./Features";
import ImagePicker from "./ImagePicker";

const ChatHeader = ({
  participant,
  updateParticipantProfile,
  messageBoxRef,
  sendMessage,
}) => {
  const [name, setName] = useState("");
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    if (participant) {
      setName(participant.name);
      setProfilePic(participant.profilePic);
    }
  }, [participant]);

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

  return (
    <div className="chat-header clearfix">
      <ImagePicker
        tag="choose-file"
        callback={setProfilePic}
        isProfileCloud={true}
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

      <Features messageBoxRef={messageBoxRef} sendMessage={sendMessage} />
    </div>
  );
};

export default memo(ChatHeader);
