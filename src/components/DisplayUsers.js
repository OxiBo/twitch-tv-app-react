import React from "react";
import UserInfo from "./UserInfo";

const DisplayUsers = props => {
  
  const display = props.users.map((user, index) => {
    return (
      <UserInfo user={user} key={index} />
    );
  });
  return (
    <div className="users main-flex-item" id="content">
        
      {props.isLoading ? 
      <div className="spinner">
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
      
        : display}
    </div>
  );
};

export default DisplayUsers;
