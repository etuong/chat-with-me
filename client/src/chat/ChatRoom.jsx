import ChannelList from "./ChannelList";
import Chat from "./Chat";

const ChatRoom = () => {
  return (
    <div className="chat-app">
      <ChannelList />
      <Chat />
    </div>
  );
};

export default ChatRoom;
