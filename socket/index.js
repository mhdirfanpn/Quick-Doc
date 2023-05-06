const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId == userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log(users);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("socket connected");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    try {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    } catch (error) {
      console.log(error);
    }
  });

  //send and get messages
  socket.on("sendMessage", ({ senderId, recieverId, text }) => {
    try {
      console.log(senderId, recieverId, text);
      const user = getUser(recieverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } catch (error) {
      console.log(error);
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    try {
      removeUser(socket.id);
      io.emit("getUsers", users);
    } catch (error) {
      console.log(error);
    }
  });
});
