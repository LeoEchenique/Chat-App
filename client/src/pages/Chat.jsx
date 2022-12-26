import React from "react";
import Nav from "../components/Nav";
function Chat() {
  return (
    <div className="chat-container">
      <Nav
        props={[
          { li: "Home", redirect: "/" },
          { li: "About", redirect: "/about" },
        ]}
      />
    </div>
  );
}

export default Chat;
