const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);

const {
  addParticipant,
  removeParticipant,
  getParticipant,
  getParticipants,
} = require("./participants");

const {
  getMessages,
  createMessage,
  deleteAllMessages,
} = require("./controllers/MessageController");

app.use(cors());
app.get("/", (_, res) => {
  res.redirect("https://spiffy-crostata-ab1518.netlify.app/");
});
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const USER_JOIN = "USER_JOIN";
const USER_LEAVE = "USER_LEAVE";
const NEW_MESSAGE = "NEW_MESSAGE";
const START_TYPING = "START_TYPING";
const STOP_TYPING = "STOP_TYPING";
const UPDATE_PARTICIPANT_PROFILE = "UPDATE_PARTICIPANT_PROFILE";

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://spiffy-crostata-ab1518.netlify.app",
    ],
    credentials: true,
  },
  transports: ["polling", "websocket"],
  allowEIO3: true,
  pingTimeout: 30000, // Shut down socket after 30 minutes of inactivity
});

io.on("connection", (socket) => {
  // Ping a response from handshake
  socket.emit("connected");

  socket.on(USER_JOIN, (data) => {
    const name = data?.name;
    const profilePic = data?.profilePic;
    const participant = addParticipant(socket.id, name, profilePic);
    if (participant) {
      console.log(`${participant.name} has joined the chat`);
      io.emit(USER_JOIN, participant);
    }
  });

  socket.on(NEW_MESSAGE, async (data) => {
    const sender = getParticipant(data.senderId);
    let text = data.text;
    let isAudio = false;
    try {
      if (text.includes("data:application/octet-stream;base64")) {
        let newData = text.split(";");
        newData[0] = "data:audio/mp3;";
        newData = newData[0] + newData[1];
        text = newData;
        isAudio = true;
        console.log(`${sender.name} sent an audio`);
      } else {
        console.log(`${sender.name} sent "${text}"`);
      }
      const message = await createMessage(sender, text, isAudio);
      io.emit(NEW_MESSAGE, message);
    } catch (error) {
      console.error("Something went wrong..", error);
    }
  });

  socket.on(UPDATE_PARTICIPANT_PROFILE, (updatedParticipant) => {
    const participant = getParticipant(updatedParticipant.id);
    if (participant) {
      participant.name = updatedParticipant.name;
      participant.profilePic = updatedParticipant.profilePic;
      console.log(participant);
      io.emit(UPDATE_PARTICIPANT_PROFILE, participant);
    }
  });

  socket.on(START_TYPING, (data) => {
    io.emit(START_TYPING, data);
  });

  socket.on(STOP_TYPING, (data) => {
    io.emit(STOP_TYPING, data);
  });

  socket.on("disconnect", () => {
    const participant = removeParticipant(socket.id);
    if (participant) {
      console.log(`${participant.name} has left the chat`);
      io.emit(USER_LEAVE, participant);
    }
  });
});

app.get("/participants", (req, res) => {
  const participants = getParticipants();
  return res.json({ participants });
});

app.get("/messages", async (_req, res) => {
  const messages = await getMessages();
  return res.json({ messages });
});

app.get("/delete-all-messages", (_req, res) => {
  deleteAllMessages().then(() => {
    res.status(200).send("All messages have been deleted!");
  });
});

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    const port = process.env.PORT || 8081;
    server.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on("exit", function (code) {
  server.close();
  console.log("Server exit", code);
});
