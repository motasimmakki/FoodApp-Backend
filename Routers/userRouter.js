const express = require('express');
const userRouter = express.Router();
const {
    getAllUsers, getUser, 
    updateUser, deleteUser,
    forgetpassword, resetpassword
} = require('../Controllers/userController');
const { signup, login } = require('../Controllers/authController');
const { protectRoute, isAuthorized } = require('../helper');

// user desired options.
userRouter
    .route("/:id")
    .patch(updateUser)
    .delete(deleteUser);

// For login old user.
userRouter
    .route("/login")
    .post(login);

// For signup new user.
userRouter
    .route("/signup")
    .post(signup);

userRouter.route("/forgetpassword").post(forgetpassword);
userRouter.route("/resetpassword/:token").post(resetpassword);

// Profile page.
userRouter.use(protectRoute); // Middleware for checking authentication.
userRouter
    .route("/profile")
    .get(getUser);

// Admin Specific functions.
userRouter.use(isAuthorized(['admin'])); // Middleware for checking authorization.
userRouter
    .route("/")
    .get(getAllUsers);

module.exports = userRouter;
