import { useState, useEffect } from "react";
import io from "socket.io-client";

export const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(url);
    if (socket) {
      socket.emit("online", localStorage.getItem("token"));
      setSocket(socket);
    }
    return () => {
      alert("hi");
      socket.disconnect();
    };
  }, [url]);

  return socket;
};
