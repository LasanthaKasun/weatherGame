import React from "react";
import "./message.css";

const Message = ({ message, onPress }) => {
  return (
    <div>
      <div className={message === "WIN" ? "win-text" : "loss-text"}>
        {message === "WIN" ? "Wow you are win" : "Sorry you are loss"}
      </div>
      <button className="btn-wrap" onClick={onPress}>
        Replay
      </button>
    </div>
  );
};

export default Message;
