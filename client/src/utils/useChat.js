import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const USER_JOIN = "USER_JOIN";
const USER_LEAVE = "USER_LEAVE";
const NEW_MESSAGE = "NEW_MESSAGE";
const START_TYPING = "START_TYPING";
const STOP_TYPING = "STOP_TYPING";

const SOCKET_SERVER_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:8081"
    : "https://chat-with-ethan.herokuapp.com";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [typingParticipants, setTypingParticipants] = useState([]);
  const [participant, setParticipant] = useState();
  const socketRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`${SOCKET_SERVER_URL}/messages`);
      const result = response.data.messages;
      setMessages(result);
    };
    fetchMessages();

    const fetchParticipants = async () => {
      const response = await axios.get(`${SOCKET_SERVER_URL}/participants`);
      const result = response.data.participants;
      setParticipants(result);
    };
    fetchParticipants();

    let savedParticipant = localStorage.getItem("user");
    if (savedParticipant) {
      savedParticipant = JSON.parse(savedParticipant);
      setParticipant(savedParticipant);
    }

    if (!participant) {
      return;
    }

    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { name: participant.name, picture: participant.picture },
    });

    socketRef.current.on("connect", () => {
      console.log("Handshake established!");
    });

    socketRef.current.on(USER_JOIN, (participant) => {
      if (participant.id === socketRef.current.id) return;
      setParticipants((participants) => [...participants, participant]);
    });

    socketRef.current.on(USER_LEAVE, (participant) => {
      setParticipants((participants) =>
        participants.filter((p) => p.id !== participant.id)
      );
    });

    socketRef.current.on(NEW_MESSAGE, (message) => {
      const incomingMessage = {
        ...message,
        fromMe: message.senderId === socketRef.current.id,
      };

      setMessages((currentMessages) => [...currentMessages, incomingMessage]);
    });

    socketRef.current.on(START_TYPING, (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const participant = typingInfo.participant;
        setTypingParticipants((participants) => [...participants, participant]);
      }
    });

    socketRef.current.on(STOP_TYPING, (typingInfo) => {
      if (typingInfo.senderId !== socketRef.current.id) {
        const participant = typingInfo.participant;
        setTypingParticipants((participants) =>
          participants.filter((p) => p.name !== participant.name)
        );
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (newMessage) => {
    if (!socketRef.current) return;

    socketRef.current.emit(NEW_MESSAGE, {
      body: newMessage,
      senderId: socketRef.current.id,
      participant: participant,
    });
  };

  const startTypingMessage = () => {
    if (!socketRef.current) return;

    socketRef.current.emit(START_TYPING, {
      senderId: socketRef.current.id,
      participant,
    });
  };

  const stopTypingMessage = () => {
    if (!socketRef.current) return;

    socketRef.current.emit(STOP_TYPING, {
      senderId: socketRef.current.id,
      participant,
    });
  };

  return {
    messages,
    participant,
    participants,
    typingParticipants,
    sendMessage,
    startTypingMessage,
    stopTypingMessage,
  };
};

export default useChat;
