import "./index.scss";
import ChatRoom from "./chat/ChatRoom";
import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/js/bootstrap.js';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<ChatRoom />);
