const express = require('express');
const router = express.Router();

/* FEEDBACK */
const feedbackController = require('./controllers/feedback');

/* FEEDBACK */
router.post('/feedback', feedbackController);

exports.routes = router;