const { Server } = require("socket.io");
const { polls } = require("../controller/poll.controller");
function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });


  io.on("connection", (socket) => {
    console.log(socket,'---')
    socket.on("vote", (pollId, optionIndex) => {
      const poll = polls.find((p) => p.id === pollId);
      if (poll) {
        poll.votes[optionIndex]++;
        io.emit("pollUpdated", poll);
      }
    });

  });

  return io;
}

module.exports = { initializeSocket };
