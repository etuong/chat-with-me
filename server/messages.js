var uuid = require("uuid");

const messages = [];

const addMessage = (sender, text) => {
  const msg = { id: uuid.v4(), sender, text };
  messages.push(msg);
  return msg;
};

const removeMessage = (id) => {
  const index = messages.findIndex((message) => message.id === id);

  if (index !== -1) return messages.splice(index, 1)[0];
};

const getMessage = (id) => messages.find((message) => message.id === id);

const getMessages = () => messages;

module.exports = { addMessage, removeMessage, getMessage, getMessages };
