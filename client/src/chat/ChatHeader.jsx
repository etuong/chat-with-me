import Features from "./Features";
import React, { useEffect, useRef, useState, memo } from "react";

const ChatHeader = ({ participant }) => {
  const [name, setName] = useState(participant.name);
  const [isNameEdit, setIsNameEdit] = useState(false);

  const nameRef = useRef();

  useEffect(() => {
    if (isNameEdit) {
      const end = nameRef.current.value.length;
      nameRef.current.setSelectionRange(end, end);
      nameRef.current.focus();
    }
  }, [isNameEdit]);

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
  }, [name]);

  return (
    <div className="chat-header clearfix">
      <div className="profile">
        <img src={participant.picture} alt="avatar" />
        <span>&#128247;</span>
      </div>
      <div className="name">
        {isNameEdit ? (
          <input
            type="text"
            ref={nameRef}
            value={participant.name}
            className="editing"
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <>{participant.name}</>
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
      <Features />
    </div>
  );
};

export default memo(ChatHeader);
