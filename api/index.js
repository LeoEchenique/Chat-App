const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./src/routes/index");
require("dotenv").config();
const cors = require("cors");
const { isTokenValid } = require("./src/utils/jwt");
app.use(cors());
app.use(express.json());

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app); // create server

const io = new Server(server, {
  // attach socket connection to server
  cors: {
    origin: "http://localhost:3000", // allow origin
  },
});

app.use("/", routes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected"));

app.listen(process.env.PORT || 3001, () =>
  console.log(`server listening on port ${process.env.PORT}`)
);

server.listen(3002, () => console.log(`server listening on port 3002`));
let messageQueue = {};
let socketIds = {};
io.on("connection", async (socket) => {
  socket.on("online", (username) => {
    let { token } = isTokenValid(username);
    if (token) socketIds[token] = socket.id; // socketIds will contains all the connected users
    console.log(socket.id, "is online");
    console.log("mess", messageQueue);
    // Check if the user has any queued messages
    if (messageQueue[token]) {
      // if user is on the messageQueue means that he has some messages that received when he was offline
      messageQueue[token].forEach((message) => {
        //  if it does, for each msg server emits an event in order for the disconnected (now connected) user to receive
        socket.emit("message", message);
      });
      delete messageQueue[token]; // deletes that msg delivered
    }
  });

  socket.on("new_message", (message) => {
    // io was always the instance, that was the main error
    // socket is ALWAYS linked to the user who dispatchs the event. io is who has all the data to send
    // every time you can scope the value or the id of the current socket that dispatchs the event from the front
    // Look up the recipient's socket ID using the stored mapping
    let { token } = isTokenValid(message.fromId);
    const recipientSocketId = socketIds[message.toId];

    if (recipientSocketId) {
      // Send the message to the recipient
      io.to(recipientSocketId).emit("message", {
        msg: message.text,
        from: token,
      });
    } else {
      //if not exists means that is disconnected
      // Add the message to the user's message queue
      if (!socketIds[message.toId]) {
        if (!messageQueue[message.toId]) messageQueue[message.toId] = []; // creates a messageQueue that later will be cheked by the online method to retrieve msg that has been sent while user is disconnected
        // if not exist on socketIds means that he wasnt online
        // messageQueue[message.toId] = []; // creates a messageQueue that later will be cheked by the online method to retrieve msg that has been sent while user is disconnected
      }
      messageQueue[message.toId].push({
        // if the Function got to here means that user is disconected
        // so.. leaves the message!
        msg: message.text,
        from: token,
      });
      console.log("created", messageQueue);
    }
  });
  socket.on("disconnect", (socket) => {
    console.log(socket, "is offline");
  });
});
