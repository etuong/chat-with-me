import { useRef, useContext } from "react";
import { SocketContext } from "../utils/SocketContext";

const SendBox = () => {
  
  const { socket } = useContext(SocketContext);

  const messageRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageField = messageRef.current;
    socket.emit("broadcast_message", {
      socketId: socket.id,
      message: messageField.value,
    });
    messageField.value = "";
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
            ref={messageRef}
            type="text"
            className="form-control"
            placeholder="Enter message here..."
          />
        </div>
      </form>
    </div>
  );
};

export default SendBox;
