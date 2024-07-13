// Import required modules
const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { initializeSocket } = require("./socket/socket");
const pollsRouter = require("./routes/poll.route");
require('dotenv').config();
const corsOptions = {
  origin: 'https://react-poll-app.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
const app = express();
const server = http.createServer(app);

// Initialize socket.io
const io = initializeSocket(server);

app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api/polls", (req, res, next) => {
  console.log("Middleware: Attaching io instance to request object");
  req.io = io;
  next();
}, pollsRouter);

// const indexPath = path.join(__dirname, '../client/dist/index.html');
// app.get("/", (req, res) => {
//   console.log("Logger home: Serving index.html");
//   res.sendFile(indexPath);
// });

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Adding a process event listener to check if the process is being restarted
process.on('exit', (code) => {
  console.log(`Process exit event with code: ${code}`);
});

module.exports = app;
