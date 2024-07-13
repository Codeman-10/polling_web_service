let polls = [];

const createPoll = (req, res) => {
  const poll = {
    id: polls.length + 1,
    question: req.body.question,
    options: req.body.options,
    votes: Array(req.body.options.length).fill(0),
  };
  polls.unshift(poll);
  req.io.emit("pollCreated", poll);
  res.status(201).send(poll);
};

const getAllPolls = (req, res) => {
  res.json(polls);
};

module.exports = {
  createPoll,
  getAllPolls,
  polls,
};
