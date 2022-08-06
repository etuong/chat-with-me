import React, { memo } from "react";
import { getTransformedImage, isImageLink } from "utility/ImageUtility";

const renderImageMessage = (text) => {
  return (
    <React.Fragment>
      {text.includes("cloudinary") ? (
        <a target="_blank" href={text} rel="noreferrer">
          <img src={getTransformedImage(text)} alt="" />
        </a>
      ) : (
        <a target="_blank" href={text} rel="noreferrer">
          <img src={text} alt="" width="200" />
        </a>
      )}
    </React.Fragment>
  );
};

const Message = ({ text, mine, showSender }) => {
  return (
    <React.Fragment>
      {isImageLink(text) ? (
        renderImageMessage(text)
      ) : (
        <div
          className={`message ${mine ? "my-message" : "other-message"} ${
            showSender ? "" : "no-bubble"
          }`}
          dangerouslySetInnerHTML={{
            __html: text.replace(
              /(https?:\/\/)([^ ]+)/g,
              '<a target="_blank" href="$&">$2</a>'
            ),
          }}
        ></div>
      )}
    </React.Fragment>
  );
};

export default memo(Message);
