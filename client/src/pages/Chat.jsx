import React from "react";
import Nav from "../components/Nav";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import Message from "./Message";

function Chat() {
  const socket = useSocket("http://localhost:3002");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [text, setText] = useState("");
  const [chatResponse, setChatResponse] = useState([
    {
      sender: "",
      content: "",
    },
  ]);
  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatResponse]);

  useEffect(() => {
    if (socket) {
      socket.on("new_message", (msg) => {
        setChatResponse((prev) => [
          ...prev,
          {
            sender: "other",
            content: msg,
          },
        ]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleText = (e) => {
    setText(e);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("new_message", text);
    setChatResponse((prev) => [
      ...prev,
      {
        sender: "user",
        content: text,
      },
    ]);
    setText("");
    inputRef.current.value = "";
  };

  return (
    <div className="chat-container">
      <Nav
        props={[
          { li: "Home", redirect: "/" },
          { li: "About", redirect: "/about" },
        ]}
      />

      <div className="chat-area" ref={scrollRef} id="chat-areas">
        {chatResponse?.length
          ? chatResponse.map((message, index) => {
              return (
                <div key={index}>
                  <Message key={index} message={message} />
                </div>
              );
            })
          : null}
        <form id="chat-form" onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            ref={inputRef}
            id="message-input"
            placeholder="Escribe tu mensaje aquí"
            onChange={(e) => handleText(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
