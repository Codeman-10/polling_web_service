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

const deletePoll = (req, res) => {
  const id = req.body.pollId;

  const idx = polls.findIndex((v) => v.id === id);
  polls.splice(idx, 1);
  res.status(201).send({ msg: "success" });
};

const getAllPolls = (req, res) => {
  res.json(polls);
};

module.exports = {
  createPoll,
  getAllPolls,
  deletePoll,
  polls,
};
