import React, { memo, useState } from "react";
import Picker from "emoji-picker-react";

const Features = ({ messageBoxRef }) => {
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
        <Picker pickerStyle={emojiPickerStyle} onEmojiClick={onEmojiClick} />
      )}

      <button
        className="btn btn-outline-danger"
        onClick={() => setShowPicker((val) => !val)}
      >
        <i className="fa fa-smile-o"></i>
      </button>
      <button className="btn btn-outline-info">
        <i className="fa fa-camera"></i>
      </button>
      <button className="btn btn-outline-primary">
        <i className="fa fa-image"></i>
      </button>
      <button className="btn btn-outline-success">
        <i className="fa fa-cogs"></i>
      </button>
      <button className="btn btn-outline-warning">
        <i className="fa fa-question"></i>
      </button>
    </div>
  );
};

export default memo(Features);
