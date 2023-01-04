const express = require('express');
const bookingRouter = express.Router();
const { protectRoute } = require('../helper');
const { createSession, getAcknowledgement } = require('../Controllers/bookingController');

bookingRouter.use(express.static('public'));

bookingRouter
    .route("/createSession")
    .get(getAcknowledgement);

// bookingRouter.use(protectRoute);
bookingRouter
    .route("/createSession")
    .post(createSession);

module.exports = bookingRouter;
