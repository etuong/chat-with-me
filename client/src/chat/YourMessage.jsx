import React from "react";
import { memo } from "react";

const YourMessage = (props) => {
  return (
    <li className="clearfix">
      <div className="message other-message">{props.message.text}</div>
      <div className="message-data">
        <div
          className="sender"
          style={{
            backgroundImage: `url(${props.message.sender?.profilePic})`,
          }}
        ></div>
        <span className="message-data-sender-name">
          {props.message.sender?.name}
        </span>
        <span className="message-data-time">{props.message.dateTime}</span>
      </div>
    </li>
  );
};

export default memo(YourMessage);
