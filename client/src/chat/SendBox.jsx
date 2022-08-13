import React, { memo, useState } from "react";

const SendBox = (props) => {
  const [mediaRecorder, setMediaRecorder] = useState(undefined);

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

  const handleAudioMouseDown = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start();

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", function (event) {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", function () {
        console.log(audioChunks)
        if (audioChunks[0].size < 1000) {
          return;
        }
        const audioBlob = new Blob(audioChunks);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(audioBlob);
        fileReader.onloadend = function () {
          const base64VoiceMsgString = fileReader.result;
          props.handleSendMessage(base64VoiceMsgString);

          // var newData = base64String.split(";");
          // newData[0] = "data:audio/ogg;";
          // newData = newData[0] + newData[1];
          // var audio = new Audio(newData);
          // audio.play();
        };
      });

      setMediaRecorder(mediaRecorder);
    });
  };

  const handleAudioMouseUp = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(undefined);
    }
  };

  return (
    <div className="chat-message clearfix">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-0">
          <div
            className="input-group-prepend"
            onMouseDown={(_e) => handleAudioMouseDown()}
            onMouseUp={(_e) => handleAudioMouseUp()}
          >
            <span className="input-group-text microphone">
              <i className="fa fa-microphone"></i>
            </span>
          </div>
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
