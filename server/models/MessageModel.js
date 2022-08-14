const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageModel = new Schema(
  {
    dateTime: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderPic: {
      type: String,
      required: true,
    },
    isAudio: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageModel);
