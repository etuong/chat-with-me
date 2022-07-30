const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const Constant = require("./Constants");

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
    origin: ["http://localhost:8080", "https://etuong.github.io"],
    credentials: true,
  },
  transports: ["polling", "websocket"],
  allowEIO3: true,
  pingTimeout: 10000, // Shut down socket after 10 minutes of inactivity
});

io.on("connection", (socket) => {
  // Ping a response from handshake
  socket.emit("connected");
});

process.on("exit", function (code) {
  server.close();
  console.log("Server exit", code);
});
