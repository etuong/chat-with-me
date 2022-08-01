const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const {
  addParticipant,
  removeParticipant,
  getParticipants,
} = require("./participants");
const { addMessage, getMessages } = require("./messages");

app.use(logger("dev"));
app.use(cors());
app.get("/", (_, res) => {
  res.redirect("/");
});
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const port = process.env.PORT || 8081;

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

const USER_JOIN = "USER_JOIN";
const USER_LEAVE = "USER_LEAVE";
const NEW_MESSAGE = "NEW_MESSAGE";
const START_TYPING = "START_TYPING";
const STOP_TYPING = "STOP_TYPING";

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "https://etuong.github.io"],
    credentials: true,
  },
  transports: ["polling", "websocket"],
  allowEIO3: true,
  pingTimeout: 10000, // Shut down socket after 10 minutes of inactivity
});

io.on("connection", (socket) => {
  // Ping a response from handshake
  socket.emit("connected");

  const { name, picture } = socket.handshake.participant;

  const participant = addParticipant(socket.id, name, picture);
  io.emit(USER_JOIN, participant);

  socket.on(NEW_MESSAGE, (data) => {
    const message = addMessage(data);
    io.emit(NEW_MESSAGE, message);
  });

  socket.on(START_TYPING, (data) => {
    io.emit(START_TYPING, data);
  });

  socket.on(STOP_TYPING, (data) => {
    io.emit(STOP_TYPING, data);
  });

  socket.on("disconnect", () => {
    removeParticipant(socket.id);
    io.emit(USER_LEAVE, participant);
  });

  // socket.on("broadcast_message", ({ socketId, text }) => {
  //   const time = new Date();
  //   const date = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
  //   io.emit("receive_message", { socketId, date, text });
  // });
});

app.get("/participants", (req, res) => {
  const participants = getParticipants();
  return res.json({ participants });
});

app.get("/messages", (req, res) => {
  const messages = getMessages();
  return res.json({ messages });
});

process.on("exit", function (code) {
  server.close();
  console.log("Server exit", code);
});
