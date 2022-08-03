import React from "react";
import { memo } from "react";

const YourMessage = (props) => {
  return (
    <li className="clearfix">
      <div className="message-data">
        <div
          className="sender"
          style={{ backgroundImage: `url(${props.message.sender?.profilePic})` }}
        ></div>
        <span className="message-data-time">2022-08-01</span>
      </div>
      <div className="message other-message">{props.message.text}</div>
    </li>
  );
};

export default memo(YourMessage);
