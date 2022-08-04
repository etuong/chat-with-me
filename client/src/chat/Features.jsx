import EmojiPicker from "emoji-picker-react";
import React, { memo, useState } from "react";
import ImagePicker from "./ImagePicker";

const Features = ({ messageBoxRef, sendMessage }) => {
  const [showPicker, setShowPicker] = useState(false);

  const uploadImage = (file) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      sendMessage(reader.result);
    };
    reader.readAsArrayBuffer(file);
  };

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

      <ImagePicker tag="send-image" callback={uploadImage} />

      <button
        className="btn btn-outline-danger"
        onClick={() => setShowPicker((val) => !val)}
      >
        <i className="fa fa-smile-o"></i>
      </button>

      <button className="btn btn-outline-info image-picker-button">
        <label className="image-picker-label" htmlFor="send-image">
          <i className="fa fa-camera"></i>
        </label>
      </button>

      <button className="btn btn-outline-success">
        <i className="fa fa-image"></i>
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
