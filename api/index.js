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

let socketIds = {};
io.on("connection", async (socket) => {
  socket.on("online", (username) => {
    let { token } = isTokenValid(username);
    if (token) socketIds[token] = socket.id; // socketIds will contains all the connected users
    console.log(socket.id, "is online: ");
  });

  socket.on("new_message", (message) => {
    // every time you can scope the value or the id of the current socket that dispatchs the event from the front
    // Look up the recipient's socket ID using the stored mapping
    let { token } = isTokenValid(message.fromId);
    const recipientSocketId = socketIds[message.toId];
    // Send the message to the recipient
    // io was always the instance, that was the main error
    // socket is ALWAYS linked to the user who dispatchs the event. io is who has all the data to send
    io.to(recipientSocketId).emit("message", {
      msg: message.text,
      from: token,
    });
    /*  socket.broadcast.emit("new_message", {
      // in every message you already have the socket.id that sends dispatchs the event
      msg: data.text,
      from: socket.id,
    }); */
  });
  socket.on("disconnect", (socket) => {
    console.log(socket, "is offline");
  });
});
