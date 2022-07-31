import { socket, SocketContext } from "../utils/SocketContext";
import ChatHeader from "./ChatHeader";
import MyMessage from "./MyMessage";
import React, { useEffect, useRef, useState } from "react";
import SendBox from "./SendBox";
import YourMessage from "./YourMessage";

const Chat = () => {
  const chatBoxRef = useRef();

  const [messages, setMessages] = useState([
    { fromMe: true, date: "10:10 AM", text: "How are you?" },
    {
      fromMe: false,
      date: "10:16 AM",
      text: "I am fine, thank you for asking!",
    },
  ]);

  useEffect(() => {
    chatBoxRef.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });

    socket.on("connect", () => {
      console.log("Handshake established!");
    });

    socket.on("receive_message", ({ socketId, date, text }) => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          fromMe: socketId === socket.id,
          date,
          text,
        },
      ]);
    });
  }, []);

  // useEffect(() => {
  //   // 👇️ scroll to bottom every time messages change
  //   chatBoxRef.current.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <SocketContext.Provider value={{ socket }}>
      <div className="chat">
        <ChatHeader />

        <div className="chat-history" ref={chatBoxRef}>
          <ul className="m-b-0">
            {messages.map((message, index) => {
              return (
                <React.Fragment key={index}>
                  {message.fromMe ? (
                    <MyMessage message={message} />
                  ) : (
                    <YourMessage message={message} />
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>

        <SendBox />
      </div>
    </SocketContext.Provider>
  );
};

export default Chat;
