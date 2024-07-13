const express = require('express');
const router = express.Router();
const { createPoll, getAllPolls } = require('../controller/poll.controller');

router.post('/', createPoll);

router.get('/', getAllPolls);

module.exports = router;