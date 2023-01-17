const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./src/routes/index");
require("dotenv").config();
const cors = require("cors");
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

server.listen(3002, () =>
  console.log(`server listening on port ${process.env.PORT}`)
);

io.on("connection", (socket) => {
  // socket listener
  console.log(`socket ${socket.id} has entered`);
  socket.on("new_message", (data) => {
    console.log("new message");
    socket.broadcast.emit("new_message", data); // on new message this will return that to all users connected to the socket -> need to change this to be more private
  });
}); // when someone connects to the socket this is executed
