import { memo } from "react";

const YourMessage = (props) => {
  return (
    <li className="clearfix">
      <div className="message-data">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          alt="avatar"
        />
        <span className="message-data-time">{props.message.date}</span>
      </div>
      <div className="message other-message">{props.message.text}</div>
    </li>
  );
};

export default memo(YourMessage);
