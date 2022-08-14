const Message = require("../models/MessageModel");
const mongoose = require("mongoose");

const getMessages = async () => {
  const messages = await Message.find({}).sort({ createdAt: 1 });
  return messages;
};

const createMessage = async (sender, text, isAudio = false) => {
  const dateTime = new Date().toLocaleDateString("en-us", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  const senderName = sender.name;
  const senderPic = sender.profilePic;
  const message = {
    dateTime,
    text,
    senderName,
    senderPic,
    isAudio,
  };
  await Message.create(message);

  return { ...message, senderId: sender.id };
};

const deleteAllMessages = async () => {
  await Message.deleteMany();
};

module.exports = {
  getMessages,
  createMessage,
  deleteAllMessages,
};
