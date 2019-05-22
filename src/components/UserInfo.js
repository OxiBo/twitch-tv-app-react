import React from "react";

const UserInfo = props => {
  const {
    user: { stream, icon, name, status, urlStream }
  } = props;

  const offline = stream === "" ? "offline" : "online";

  return (
    <div className={`user ${offline}`}>
      <div className="userLogo">
        <img src={icon} alt="logo" />
      </div>
      <div className="userUrl">
        <p>
          <a target="_blank" rel="noopener noreferrer" href={urlStream}>
            {name}
          </a>
        </p>
      </div>
      <div className="userStream">
        {stream ? <p>{stream}</p> : status ? <p>{status}</p> : <p>Offline</p>}
      </div>
    </div>
  );
};

export default UserInfo;
