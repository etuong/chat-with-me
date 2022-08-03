import React from "react";
import { memo } from "react";

const MyMessage = (props) => {
  return (
    <li className="clearfix">
      <div className="message-data justify-right">
        <span className="message-data-time">2022-08-01</span>
        <div
          className="sender"
          style={{ backgroundImage: `url(${props.message.sender?.profilePic})` }}
        ></div>
      </div>
      <div className="message my-message float-right">{props.message.text}</div>
    </li>
  );
};

export default memo(MyMessage);
