import Participant from "./Participant";

const ChannelList = () => {
  return (
    <div className="people-list">
      <div className="participant-header clearfix">
        <Participant showName={true} />
      </div>

      <ul className="list-unstyled chat-list mt-2 mb-0">
        <li className="clearfix">
          <Participant showName={true} />
        </li>
        <li className="clearfix">
          <Participant showName={true} />
        </li>        
      </ul>
    </div>
  );
};

export default ChannelList;
