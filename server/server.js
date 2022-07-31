const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);

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

  socket.on("broadcast_message", ({ socketId, text }) => {
    const time = new Date();
    const date = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    io.emit("receive_message", { socketId, date, text });
  });
});

process.on("exit", function (code) {
  server.close();
  console.log("Server exit", code);
});
