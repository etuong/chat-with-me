import { createContext } from "react";

import io from "socket.io-client";

const SERVER =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:8081"
    : "https://chat-with-ethan.herokuapp.com";

const socket = io(SERVER);
const SocketContext = createContext(socket);

export { socket, SocketContext };
