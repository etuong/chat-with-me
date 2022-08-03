import React, { memo, useState } from "react";
import Picker from "emoji-picker-react";

const Features = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div className="text-right features">
      <button className="btn btn-outline-secondary">
        <i className="fa fa-camera">
          <Picker onEmojiClick={onEmojiClick} />
        </i>
      </button>
      <button className="btn btn-outline-primary">
        <i className="fa fa-image"></i>
      </button>
      <button className="btn btn-outline-info">
        <i className="fa fa-cogs"></i>
      </button>
      <button className="btn btn-outline-warning">
        <i className="fa fa-question"></i>
      </button>
    </div>
  );
};

export default memo(Features);
