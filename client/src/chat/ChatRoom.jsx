import React, { useEffect, useRef } from "react";
import useChat from "../hooks/useChat";
import ChatHeader from "./ChatHeader";
import MyMessage from "./MyMessage";
import SendBox from "./SendBox";
import YourMessage from "./YourMessage";
import useTyping from "../hooks/useTyping";
import MessageTyping from "./MessageTyping";
import Participants from "./Participants";

const Chat = () => {
  const chatBoxRef = useRef();
  const messageBoxRef = useRef();

  const {
    messages,
    participant,
    participants,
    typingParticipants,
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

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  useEffect(() => {
    chatBoxRef.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, []);

  return (
    <div className="chat-app">
      <div className="chat">
        <ChatHeader
          messageBoxRef={messageBoxRef}
          participant={participant}
          updateParticipantProfile={updateParticipantProfile}
        />

        {participants.length > 0 && (
          <div className="chat-participants-container">
            <h6 className="participants-title-desc">
              Other Participants in the Chat
            </h6>
            <div className="chat-participants">
              {participants.map((participant, index) => {
                return (
                  <Participants
                    key={index}
                    profilePic={participant.profilePic}
                    name={participant.name}
                  />
                );
              })}
            </div>
          </div>
        )}

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
            {typingParticipants &&
              typingParticipants.map((typist, index) => (
                <li key={index}>
                  <MessageTyping typist={typist} />
                </li>
              ))}
          </ul>
        </div>

        <SendBox
          messageBoxRef={messageBoxRef}
          handleSendMessage={handleSendMessage}
          startTyping={startTyping}
          stopTyping={stopTyping}
        />
      </div>
    </div>
  );
};

export default Chat;
