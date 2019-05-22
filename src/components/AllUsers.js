import React from "react";

const AllUsers = props => {
  const getUsersInfo = event => {
    props.handleButtons(event.target);
  };
  return (
    <button id="all" className="active" onClick={getUsersInfo}>
      All
    </button>
  );
};

export default AllUsers;
