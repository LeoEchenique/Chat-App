import React from "react";
import Nav from "../components/Nav";
import io from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import Message from "./Message";
const socket = io.connect("http://localhost:3001");
function Chat() {
  const [text, setText] = useState("");
  const [chatResponse, setChatResponse] = useState([]);
  /*   // escuchar por nuevos mensajes
  socket.on("new message", (message) => {
    console.log(`mensaje recibido: ${message}`);
  });

  // Enviar un nuevo mensaje
  socket.emit("new message", "Hola a todos!");
*/
  useEffect(() => {
    socket.on("new_message", (msg) =>
      setChatResponse((prev) => [...prev, msg])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  const handleText = (e) => {
    setText(e);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("new_message", text);
  };
  // socket.on("new message", (message) => {
  //   console.log(`mensaje recibido: ${message}`);
  // });
  return (
    <div className="chat-container">
      <Nav
        props={[
          { li: "Home", redirect: "/" },
          { li: "About", redirect: "/about" },
        ]}
      />
      <form id="chat-form">
        <input
          type="text"
          id="message-input"
          placeholder="Escribe tu mensaje aquí"
          onChange={(e) => handleText(e.target.value)}
        />
        <button type="submit" onClick={(e) => sendMessage(e)}>
          Enviar
        </button>
      </form>
      {chatResponse?.length
        ? chatResponse.map((message, index) => (
            <Message key={index} message={message} />
          ))
        : null}
    </div>
  );
}

export default Chat;
