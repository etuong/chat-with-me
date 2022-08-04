import React, { memo } from "react";

const SendBox = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const messageField = props.messageBoxRef.current;
    if (messageField && messageField.value) {
      props.handleSendMessage(messageField.value);
      messageField.value = "";
    }
  };

  return (
    <div className="chat-message clearfix">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-0">
          <div className="input-group-prepend" onClick={handleSubmit}>
            <span className="input-group-text">
              <i className="fa fa-send"></i>
            </span>
          </div>
          <input
            ref={props.messageBoxRef}
            type="text"
            className="form-control"
            placeholder="Enter message here..."
            onKeyPress={props.startTyping}
            onKeyUp={props.stopTyping}
          />
        </div>
      </form>
    </div>
  );
};

export default memo(SendBox);
