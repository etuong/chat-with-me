import React, { memo } from "react";

const TypingAnimation = () => {
  return (
    <div className="dotsContainer">
      <span id="dot1"></span>
      <span id="dot2"></span>
      <span id="dot3"></span>
    </div>
  );
};

const MessageTyping = ({ user }) => {
  return (
    <div className="message-item">
      <div className="message-avatar-container">
        <img
          src={user.picture}
          alt={user.name}
          className={"message-avatar"}
        ></img>
      </div>

      <TypingAnimation></TypingAnimation>
    </div>
  );
};

export default memo(MessageTyping);
