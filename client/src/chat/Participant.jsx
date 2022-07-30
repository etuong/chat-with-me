import React from "react";

const Participant = (props) => {
  return (
    <React.Fragment>
      <img
        src="https://bootdey.com/img/Content/avatar/avatar1.png"
        alt="avatar"
      />
      {props.showName && (
        <div className="about">
          <div className="name">Vincent Porter</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Participant;
