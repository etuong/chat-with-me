import React from "react";
import { memo } from "react";
import { getTransformedImage, isImageLink } from "utility/ImageUtility";

const MyMessage = (props) => {
  return (
    <li className="clearfix flush-right">
      {isImageLink(props.message.text) ? (
        <a target="_blank" href={props.message.text} rel="noreferrer">
          <img src={getTransformedImage(props.message.text)} alt="" />
        </a>
      ) : (
        <div
          className="message my-message"
          dangerouslySetInnerHTML={{
            __html: props.message.text.replace(
              /(https?:\/\/)([^ ]+)/g,
              '<a target="_blank" href="$&">$2</a>'
            ),
          }}
        ></div>
      )}
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
    </li>
  );
};

export default memo(MyMessage);
