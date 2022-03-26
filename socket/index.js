import { Server } from "socket.io";

const io = new Server(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addNewUser = (username, socketId) => {
  !users.some((user) => user.username === username) &&
    users.push({ username, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return (users = users.filter((user) => user.username === username));
};

io.on("connection", (socket) => {
  // ad new user
  socket.on("addNewUser", (username) => {
    addNewUser(username, socket.id);
    io.emit("getUser", users);
  });

  // remove user
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUser", users);
  });
});
