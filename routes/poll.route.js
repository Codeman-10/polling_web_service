const express = require('express');
const router = express.Router();
const { createPoll, getAllPolls, deletePoll } = require('../controller/poll.controller');


router.delete('/', deletePoll);

router.post('/', createPoll);

router.get('/', getAllPolls);

module.exports = router;