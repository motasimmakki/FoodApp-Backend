const express = require('express');
const userRouter = express.Router();
const {
    getAllUsers, 
    getUser, 
    updateUser, 
    deleteUser
} = require('../Controllers/userController');
const { protectRoute } = require('../helper');

// user desired options.
userRouter
    .route("/:id")
    .patch(updateUser)
    .delete(deleteUser);

// Profile page.
app.use(protectRoute);
userRouter
    .route("/userProfile")
    .get(getUser);

// Admin Specific functions.
app.use(isAuthorised(['Admin']));
userRouter
    .route("")
    .get(getAllUsers);

module.exports = userRouter;
