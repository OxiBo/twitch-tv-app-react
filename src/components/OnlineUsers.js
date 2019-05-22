import React from "react";

const OnlineUsers = props => {
  const handleClick = event => {
    props.handleButtons(event.target, true);
  };
  return (
    <button id="online" className="" onClick={handleClick}>
      Online
    </button>
  );
};

export default OnlineUsers;
