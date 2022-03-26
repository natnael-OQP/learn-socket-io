import { Server } from "socket.io";

const io = new Server(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("someone has connected");
  socket.on("disconnect", () => {
    console.log("someone has disconnected");
  });
});
