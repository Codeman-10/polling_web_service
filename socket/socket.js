const { Server } = require("socket.io");
const { polls } = require("../controller/poll.controller");
const { allowedOrigins } = require("../server");
function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        const allowedOrigins = [
          "https://react-poll-app.onrender.com",
          "http://localhost:5173",
        ];

        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(socket, "---");
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
