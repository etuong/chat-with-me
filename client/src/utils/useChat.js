// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const USER_JOIN = "USER_JOIN";
const USER_LEAVE = "USER_LEAVE";
const NEW_MESSAGE = "NEW_MESSAGE";
const START_TYPING = "START_TYPING";
const STOP_TYPING = "STOP_TYPING";
const UPDATE_PARTICIPANT_PROFILE = "UPDATE_PARTICIPANT_PROFILE";

const SOCKET_SERVER_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:8081"
    : "https://chat-with-ethan.herokuapp.com";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [typingParticipants, setTypingParticipants] = useState([]);
  const [participant, setParticipant] = useState(undefined);
  const socketRef = useRef();

  useEffect(() => {
    // At the initial load, get all existing messages in memory
    const fetchMessages = async () => {
      const response = await axios.get(`${SOCKET_SERVER_URL}/messages`);
      const result = response.data.messages;
      setMessages(result);
    };

    // At the initial load, get all current participants in the chat
    const fetchParticipants = async () => {
      const response = await axios.get(`${SOCKET_SERVER_URL}/participants`);
      const result = response.data.participants;
      setParticipants(result || []);
    };

    const fetchSocket = async () => {
      socketRef.current = socketIOClient(SOCKET_SERVER_URL);

      // Restore "this" participant's info
      let chatter = localStorage.getItem("participant");
      if (chatter) {
        chatter = JSON.parse(chatter);
      } else {
        chatter = {
          name: `Participant ${Math.floor(Math.random() * 100)}`,
          profilePic: "",
        };
      }
      socketRef.current.emit(USER_JOIN, chatter);

      socketRef.current.on("connect", () => {
        console.log("Handshake established!");
      });

      socketRef.current.on(USER_JOIN, (newParticipant) => {
        if (newParticipant.id === socketRef.current.id) {
          setParticipant(newParticipant);
        } else {
          setParticipants((participants) => [...participants, newParticipant]);
        }
      });

      socketRef.current.on(UPDATE_PARTICIPANT_PROFILE, (updatedParticipant) => {
        if (updatedParticipant.id === socketRef.current.id) {
          setParticipant(updatedParticipant);
        } else {
          const newList = participants.map((participant) => {
            if (participant.id === updatedParticipant.id) {
              const updatedItem = {
                ...participant,
                name: updatedParticipant.name,
                profilePic: updatedParticipant.profilePic,
              };

              return updatedItem;
            }

            return participant;
          });

          setParticipants(newList);
        }
      });

      socketRef.current.on(USER_LEAVE, (participant) => {
        if (participants.length > 0) {
          setParticipants((participants) =>
            participants.filter((p) => p.id !== participant.id)
          );
        }
      });

      socketRef.current.on(NEW_MESSAGE, ({ sender, text, dateTime }) => {
        const incomingMessage = {
          sender,
          text,
          dateTime,
          fromMe: sender.id === socketRef.current.id,
        };

        setMessages((currentMessages) => [...currentMessages, incomingMessage]);
      });

      socketRef.current.on(START_TYPING, (typingInfo) => {
        if (typingInfo.senderId !== socketRef.current.id) {
          const participant = typingInfo.participant;
          setTypingParticipants((participants) => [
            ...participants,
            participant,
          ]);
        }
      });

      socketRef.current.on(STOP_TYPING, (typingInfo) => {
        if (
          typingInfo &&
          typingInfo.participant &&
          typingInfo.senderId !== socketRef.current.id
        ) {
          const participant = typingInfo.participant;
          setTypingParticipants((participants) =>
            participants.filter((p) => p.name !== participant.name)
          );
        }
      });

      return () => {
        socketRef.current.disconnect();
      };
    };

    fetchMessages();
    fetchParticipants();
    fetchSocket();
  }, []);

  const updateParticipantProfile = ({ name, profilePic }) => {
    if (!socketRef.current) return;
    const updatedParticipant = { ...participant, name, profilePic };
    socketRef.current.emit(UPDATE_PARTICIPANT_PROFILE, updatedParticipant);
  };

  const sendMessage = (newMessage) => {
    if (!socketRef.current) return;

    socketRef.current.emit(NEW_MESSAGE, {
      text: newMessage,
      senderId: socketRef.current.id,
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
    updateParticipantProfile,
  };
};

export default useChat;
