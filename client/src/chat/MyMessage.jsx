import React from "react";
import { memo } from "react";

const MyMessage = (props) => {
  return (
    <li className="clearfix flush-right">
      {typeof props.message.text === "string" ||
      props.message.text instanceof String ? (
        <div
          className="message my-message"
          dangerouslySetInnerHTML={{
            __html: props.message.text.replace(
              /(https?:\/\/)([^ ]+)/g,
              '<a target="_blank" href="$&">$2</a>'
            ),
          }}
        ></div>
      ) : (
        <img
          src={(window.URL || window.webkitURL).createObjectURL(
            new Blob([props.message.text], {
              type: "image/png",
            })
          )}
          alt=""
        />
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
