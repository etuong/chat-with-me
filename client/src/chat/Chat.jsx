import React, { useEffect, useState } from "react";
import { socket, SocketContext } from "../utils/SocketContext";
import Features from "./Features";
import SendBox from "./SendBox";

const Chat = () => {
  const [name, setName] = useState("Ethan Uong");
  const [isNameEdit, setIsNameEdit] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Handshake established!");
    });

    socket.on("receive_message", ({ socketId, message }) => {
      console.log({ socketId, message });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      <div className="chat">
        <div className="chat-header clearfix">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="avatar"
          />
          <div>
            {isNameEdit ? (
              <React.Fragment>
                <input
                  type="text"
                  value={name}
                  className="name edit"
                  onChange={(e) => setName(e.target.value)}
                  // onKeyUp={(e) => {
                  //   const field = e.target;
                  //   field.style.width = (field.value.length + 5) * 8 + "px";
                  // }}
                />
                <span
                  className="pencil"
                  onClick={(_) => setIsNameEdit(!isNameEdit)}
                >
                  &#9998;
                </span>
              </React.Fragment>
            ) : (
              <div className="name">
                {name}
                <span
                  className="pencil"
                  onClick={(_) => setIsNameEdit(!isNameEdit)}
                >
                  &#9998;
                </span>
              </div>
            )}
          </div>
          <Features />
        </div>

        <div className="chat-history">
          <ul className="m-b-0">
            <li className="clearfix">
              <div className="message-data text-right">
                <span className="message-data-time">10:10 AM</span>
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt="avatar"
                />
              </div>
              <div className="message my-message float-right">
                Hi Aiden, how are you? How is the project coming along?{" "}
              </div>
            </li>

            <li className="clearfix">
              <div className="message-data">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt="avatar"
                />
                <span className="message-data-time">10:12 AM</span>
              </div>
              <div className="message other-message">Are we meeting today?</div>
            </li>
          </ul>
        </div>

        <SendBox />
      </div>
    </SocketContext.Provider>
  );
};

export default Chat;
