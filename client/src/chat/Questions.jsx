import React from "react";
import Popup from "reactjs-popup";

const Questions = () => (
  <Popup
    contentStyle={{ width: "280px" }}
    trigger={
      <button className="btn btn-outline-primary">
        <i className="fa fa-question"></i>
      </button>
    }
    position="bottom right"
    nested
  >
    {(close) => (
      <div className="popup">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">Chat With Me!</div>
        <div className="content">
          <p>
            Chat With Me with a public chatroom where any participant can send
            messages, images, emojis, and even selfies! Online communication can
            help young people build and develop social skills and gives them a
            platform to share their skills and help each other out.
          </p>
          <p>
            The first time you enter the chatroom you will be given a random
            avatar and profile name. Go ahead and personalize them if you want!
            This chat also supports HTML.
            <code> &lt;h1&gt;Try me!&lt;/h1&gt; </code>
            will give you a larger header.
          </p>
          <p>
            Messages are never stored anywhere. They will be deleted every time
            my server restarts. And this happens every 30 minutes of inactivity.
          </p>
          <p>
            This web app was designed and built by{" "}
            <a
              href="https://www.ethanuong.com"
              target="_blank"
              rel="noreferrer"
            >
              Ethan Uong
            </a>
            . If you are a developer and would like to contribute to this
            project, please visit the{" "}
            <a
              href="https://github.com/etuong/chat-with-me"
              target="_blank"
              rel="noreferrer"
            >
              Github repository
            </a>
            . Thank you!
          </p>
          <div>
            <span>Tech Stack:</span>
            <ul>
              <li>React</li>
              <li>Node.js and Express</li>
              <li>Socket.io</li>
              <li>Cloudinary</li>
            </ul>
          </div>
        </div>
      </div>
    )}
  </Popup>
);

export default Questions;
