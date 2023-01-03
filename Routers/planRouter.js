const express = require('express');
const planRouter = express.Router();
const { create } = require('../Controllers/planController');

planRouter
    .route("/create")
    .post(create);

module.exports = planRouter;