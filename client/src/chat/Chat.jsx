import React, { useEffect, useRef } from "react";
import useChat from "../utils/useChat";
import ChatHeader from "./ChatHeader";
import MyMessage from "./MyMessage";
import SendBox from "./SendBox";
import YourMessage from "./YourMessage";

const Chat = () => {
  const chatBoxRef = useRef();

  const {
    messages,
    user,
    users,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  } = useChat();

  useEffect(() => {
    chatBoxRef.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, []);

  return (
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
  );
};

export default Chat;
