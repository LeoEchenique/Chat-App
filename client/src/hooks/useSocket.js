import { useState, useEffect } from "react";
import io from "socket.io-client";

export const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(url);
    if (socket) {
      socket.emit("online", localStorage.getItem("token")); // when is connected to the server adds a socketIds object into the socket connection with the server
      setSocket(socket); // object socketIds will be: { user_id : socket.id}
    }
    return () => {
      socket.disconnect();
    };
  }, [url]);

  return socket;
};
