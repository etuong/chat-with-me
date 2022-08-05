import React from "react";
import { memo } from "react";
import { getTransformedImage, isImageLink } from "utility/ImageUtility";

const YourMessage = (props) => {
  return (
    <li className="clearfix">
      {isImageLink(props.message.text) ? (
        <a target="_blank" href={props.message.text} rel="noreferrer">
          <img src={getTransformedImage(props.message.text)} alt="" />
        </a>
      ) : (
        <div
          className="message other-message"
          dangerouslySetInnerHTML={{
            __html: props.message.text.replace(
              /(https?:\/\/)([^ ]+)/g,
              '<a target="_blank" href="$&">$2</a>'
            ),
          }}
        ></div>
      )}
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
