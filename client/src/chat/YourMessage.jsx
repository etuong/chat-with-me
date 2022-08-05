import React, { memo } from "react";
import Message from "./Message";

const YourMessage = (props) => {
  return (
    <li className="clearfix">
      <Message mine={false} text={props.message.text} />
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
