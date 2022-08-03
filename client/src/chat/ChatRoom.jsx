import React, { useEffect, useRef } from "react";
import useChat from "../utils/useChat";
import ChatHeader from "./ChatHeader";
import MyMessage from "./MyMessage";
import SendBox from "./SendBox";
import YourMessage from "./YourMessage";
import useTyping from "../utils/useTyping";
import MessageTyping from "./MessageTyping";

const Chat = () => {
  const chatBoxRef = useRef();

  const {
    messages,
    participant,
    participants,
    typingUsers,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
    updateParticipantProfile,
  } = useChat();

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  const handleSendMessage = (newMessage) => {
    cancelTyping();
    sendMessage(newMessage);
  };

  // useEffect(() => {
  //   if (isTyping) startTypingMessage();
  //   else stopTypingMessage();
  // }, [isTyping]);

  useEffect(() => {
    chatBoxRef.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, []);

  return (
    <div className="chat-app">
      <div className="chat">
        <ChatHeader participant={participant} updateParticipantProfile={updateParticipantProfile} />

        <div className="chat-history" ref={chatBoxRef}>
          <ul className="m-b-0">
            {messages &&
              messages.map((message, index) => {
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
            {typingUsers &&
              typingUsers.map((user, index) => (
                <li key={index}>
                  <MessageTyping user={user} />
                </li>
              ))}
          </ul>
        </div>

        <SendBox
          handleSendMessage={handleSendMessage}
          startTyping={startTyping}
          stopTyping={stopTyping}
        />
      </div>
    </div>
  );
};

export default Chat;
