import React from "react";

function Message({ message }) {
  return (
    <div className={message.sender}>
      <h1>{message.content}</h1>
    </div>
  );
}

export default Message;
