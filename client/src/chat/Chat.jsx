import Participant from "./Participant";
import SendBox from "./SendBox";
import Features from "./Features";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-header clearfix">
        <div className="row">
          <div className="col-lg-6">
            <Participant showName={true} />
          </div>
          <Features />
        </div>
      </div>

      <div className="chat-history">
        <ul className="m-b-0">
          <li className="clearfix">
            <div className="message-data text-right">
              <span className="message-data-time">10:10 AM</span>
              <Participant />
            </div>
            <div className="message my-message float-right">
              Hi Aiden, how are you? How is the project coming along?{" "}
            </div>
          </li>

          <li className="clearfix">
            <div className="message-data">
              <Participant />
              <span className="message-data-time">10:12 AM</span>
            </div>
            <div className="message other-message">Are we meeting today?</div>
          </li>
        </ul>
      </div>

      <SendBox />
    </div>
  );
};

export default Chat;
