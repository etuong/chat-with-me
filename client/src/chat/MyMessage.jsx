import React, { memo } from "react";

const MyMessage = (props) => {
  return (
    <div className="message-data justify-right">
      <span className="message-data-time">{props.message.dateTime}</span>
      <span className="message-data-sender-name">
        {props.message.sender?.name}
      </span>
      <div
        className="sender"
        style={{
          backgroundImage: `url(${props.message.sender?.profilePic})`,
        }}
      ></div>
    </div>
  );
};

export default memo(MyMessage);
