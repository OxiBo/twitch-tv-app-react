import React from "react";

const OfflineUsers = props => {
  const handleClick = (event) => {
    props.handleButtons(event.target, false);
  };
  return (
    <button id="offline" className="" onClick={handleClick}>
      Offline
    </button>
  );
};

export default OfflineUsers;
