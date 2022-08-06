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

  const onKeyDown = (e) => {
    props.startTyping();
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-message clearfix">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-0">
          <textarea
            ref={props.messageBoxRef}
            className="form-control"
            placeholder="Enter message here..."
            onKeyUp={props.stopTyping}
            onKeyDown={onKeyDown}
          />
          <div className="input-group-prepend" onClick={handleSubmit}>
            <span className="input-group-text">
              <i className="fa fa-send"></i>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(SendBox);
