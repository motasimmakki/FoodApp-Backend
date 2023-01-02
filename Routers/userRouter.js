const express = require('express');
const userRouter = express.Router();
const {
    getUsers, 
    getUserById, 
    postUser, 
    updateUser, 
    deleteUser
} = require('../Controllers/userController');
const { protectRoute } = require('../helper');

// Routing mini-app
userRouter
    .route("/")
    .get(protectRoute, getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

// --------> Routes for setting & getting cookies <--------------
// userRouter
//     .route("/setcookies")
//     .get(setCookies);

// userRouter
//     .route("/getcookies")
//     .get(getCookies);

/**
 * Always write dynamic routes in the end.
 */
userRouter
    .route("/:name")
    .get(getUserById);

module.exports = userRouter;
