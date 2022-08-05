import EmojiPicker from "emoji-picker-react";
import React, { memo, useState } from "react";
import ImagePicker from "./ImagePicker";

const Features = ({ messageBoxRef, sendMessage }) => {
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (_event, emojiObject) => {
    const messageField = messageBoxRef.current;
    if (messageField) {
      messageField.value += emojiObject.emoji;
    }
    setShowPicker(false);
  };

  const emojiPickerStyle = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "99",
    textAlign: "initial",
  };

  return (
    <div className="text-right features navbar-toggleable-md navbar-light">
      {showPicker && (
        <EmojiPicker
          pickerStyle={emojiPickerStyle}
          onEmojiClick={onEmojiClick}
        />
      )}

      <ImagePicker
        tag="send-image"
        callback={sendMessage}
        isProfileCloud={false}
      />

      <button
        className="btn btn-outline-danger"
        onClick={() => setShowPicker((val) => !val)}
      >
        <i className="fa fa-smile-o"></i>
      </button>

      <button className="btn btn-outline-success">
        <i className="fa fa-camera"></i>
      </button>

      <button className="btn btn-outline-info image-picker-button">
        <label className="image-picker-label" htmlFor="send-image">
          <i className="fa fa-image"></i>
        </label>
      </button>

      <button className="btn btn-outline-secondary">
        <i className="fa fa-cogs"></i>
      </button>

      <button className="btn btn-outline-primary">
        <i className="fa fa-question"></i>
      </button>
    </div>
  );
};

export default memo(Features);
