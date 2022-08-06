import React, { useEffect, useRef, useState } from "react";
import useChat from "../hooks/useChat";
import ChatHeader from "./ChatHeader";
import MyMessage from "./MyMessage";
import SendBox from "./SendBox";
import YourMessage from "./YourMessage";
import useTyping from "../hooks/useTyping";
import MessageTyping from "./MessageTyping";
import Participants from "./Participants";
import Features from "./Features";
import Message from "./Message";
import FileSaver from "file-saver";

const renderMessage = (message, index, showSender) => {
  if (!message || !message.text) {
    return null;
  }

  return (
    <li
      key={index}
      className={`clearfix ${message.fromMe ? "flush-right" : ""}`}
    >
      <Message
        mine={message.fromMe}
        text={message.text}
        showSender={showSender}
      />
      {showSender && (
        <React.Fragment>
          {message.fromMe ? (
            <MyMessage message={message} />
          ) : (
            <YourMessage message={message} />
          )}
        </React.Fragment>
      )}
    </li>
  );
};

const Chat = () => {
  const chatBoxRef = useRef();
  const messageBoxRef = useRef();
  const [showPreferences, setShowPreferences] = useState(true);
  const [showSender, setShowSender] = useState(true);

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

  const handleSendMessage = (newMessage) => {
    cancelTyping();
    sendMessage(newMessage);
  };

  const handleSaveChat = () => {
    var blob = new Blob(
      [
        messages
          .map((m) => `(${m.dateTime}) ${m.sender.name}: ${m.text}`)
          .join("\r\n"),
      ],
      {
        type: "text/plain;charset=utf-8",
      }
    );
    FileSaver.saveAs(blob, "chat-with-me.txt");
  };

  return (
    <div className="chat-app">
      <div className="chat">
        <div className="chat-header clearfix">
          <ChatHeader
            participant={participant}
            updateParticipantProfile={updateParticipantProfile}
          />
          <Features
            messageBoxRef={messageBoxRef}
            handleSaveChat={handleSaveChat}
            sendMessage={sendMessage}
            showPreferences={showPreferences}
            setShowPreferences={() =>
              setShowPreferences((showPreferences) => !showPreferences)
            }
            showSender={showSender}
            setShowSender={() => setShowSender((showSender) => !showSender)}
          />
        </div>

        {showPreferences && participants.length > 0 && (
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
              messages.map((message, index) =>
                renderMessage(message, index, showSender)
              )}
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
