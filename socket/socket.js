const { Server } = require("socket.io");
const { polls } = require("../controller/poll.controller");
function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://react-poll-app.onrender.com",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
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
