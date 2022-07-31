import Features from "./Features";
import React, { useEffect, useRef, useState } from "react";

const ChatHeader = (props) => {
  const [name, setName] = useState(() => {
    const saved = localStorage.getItem("name");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
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
      <div class="profile">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          alt="avatar"
        />
        <span>&#128247;</span>
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
      <Features />
    </div>
  );
};

export default ChatHeader;
