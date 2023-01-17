import { useState, useEffect } from "react";
import io from "socket.io-client";

export const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(url);
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [url]);

  return socket;
};
