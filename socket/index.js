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
  return users.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("addNewUser", (username) => {
    addNewUser(username, socket.id);
    io.emit("getUser", users);
  }); // X add new user
  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver?.socketId).emit("getNotification", { senderName, type });
  }); // X notification
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUser", users);
  }); // X remove user
});
