import React from "react";
import Nav from "../components/Nav";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import Message from "../components/Message";
import { instance, auth_instance } from "../instance/instance";

function Chat() {
  const socket = useSocket("http://localhost:3002");
  const [contacts, setContacts] = useState([]);
  const [toId, setToId] = useState("");
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

  const getContacts = async () => {
    let allUsers = await auth_instance(localStorage.getItem("token"))
      .get(`${instance}/contact/all`) // this is for the explorer, in chat only must show the real contact accepted req
      .then((res) => res.data);
    setContacts(allUsers);
  };
  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        setChatResponse((prev) => [
          ...prev,
          {
            sender: "other",
            content: msg.msg,
          },
        ]);
        setToId(msg.from); // to automatically enabled chat we set where to sent the msg, this is also implemented when you select a user that you want to send a msg
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleText = (e) => {
    setText(e);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.length) return;
    socket.emit("new_message", {
      // from id is needed for the comment above.
      text,
      toId, // used to access the correct user to send the msg
      fromId: localStorage.getItem("token"),
    });
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

  const initializeChat = (toId) => {
    setToId(toId);
  };

  return (
    <div className="chat-container">
      <div className="nav-chat">
        <Nav
          props={[
            { li: "Home", redirect: "/" },
            { li: "About", redirect: "/about" },
          ]}
        />
      </div>

      <div className="content-chat">
        <div>
          {contacts?.length
            ? contacts.map((contact, i) => (
                <div key={i}>
                  <h1> {contact.profile.username}</h1>
                  <h2>{contact.profile.email} </h2>
                  <p onClick={(e) => initializeChat(e.target.innerHTML)}>
                    {contact._id}
                  </p>
                </div>
              ))
            : null}
        </div>

        <div className="chat-area" ref={scrollRef} id="chat-areas">
          {chatResponse?.length
            ? chatResponse.map((message, index) => {
                //console.log(message);
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
    </div>
  );
}

export default Chat;
