import React from "react";
import { memo } from "react";

const MyMessage = (props) => {
  return (
    <li className="clearfix">
      <div className="message-data text-right">
        <span className="message-data-time">{props.message.date}</span>
        <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          alt="avatar"
        />
      </div>
      <div className="message my-message float-right">{props.message.text}</div>
    </li>
  );
};

export default memo(MyMessage);
