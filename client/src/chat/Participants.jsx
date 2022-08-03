import React from "react";

const Participants = ({ profilePic, name }) => {
  return (
    <div className="chat-participants">
      <div
        className="participant"
        style={{ backgroundImage: `url(${profilePic})` }}
      ></div>
    </div>
  );
};

export default Participants;
