import React from "react";
import { memo } from "react";

const MyMessage = (props) => {
  return (
    <li className="clearfix flush-right">
      <div className="message my-message">{props.message.text}</div>
      <div className="message-data justify-right">
        <span className="message-data-time">{props.message.dateTime}</span>
        <span className="message-data-sender-name">{props.message.sender?.name}</span>
        <div
          className="sender"
          style={{
            backgroundImage: `url(${props.message.sender?.profilePic})`,
          }}
        ></div>
      </div>
    </li>
  );
};

export default memo(MyMessage);
