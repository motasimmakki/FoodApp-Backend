const express = require('express');
const app = express();
app.use(express.json());
const userRouter = express.Router();
app.use('/user', userRouter);
const { userModel } = require('./models/userModel');

// Routing mini-app
userRouter
    .route("/")
    // .get(getSignup)
    .get(getUsers)
    .post(postSignup)
    .patch(updateUser)
    .delete(deleteUser);

// // IIFE (Immediately Invoked Function Expressing)
// (async function createUser() {
//     let user = {
//         name: "ali",
//         email: "ali.afzal@gmail.com",
//         password: "qwerty123",
//         confirmPassword: "qwerty123"
//     }
//     // Before creating new user! (using middleware)
//     let data = await userModel.create(user);
//     // After creating new user! (using middleware)
//     console.log(data);
// })();

function getSignup(req, res) {
    res.sendFile("public/index.html", {root: __dirname});
}

// Get all users from db.
async function getUsers(req, res) {
    let allUsers = await userModel.find();
    // Get specific user by Id.
    // let allUsers = await userModel.find({name: "Ahkam"});
    console.log(allUsers);
    res.json({
        msg: "Users Data is retrieved",
        allUsers
    });
}

async function postSignup(req, res) {
    // let {email, name, password} = req.body;
    // This log will be console on server terminal,
    // as it is running in backend.
    try {
        let data = req.body;
        let user = await userModel.create(data);
        console.log(data);
        res.json({
            msg: "User Signed Up!",
            user
        });
    } catch (err) {
        res.json({err: err.message});
    }
}

async function updateUser(req, res) {
    let dataToBeUpdated = req.body;
    let doc = await userModel.findOneAndUpdate(
        {email: "okay.nice@gmail.com"},
        dataToBeUpdated
    );
    res.json({
        msg: "User Data Updated Successfully!"
    })
}

async function deleteUser(req, res) {
    let doc = await userModel.deleteOne(
        {email: "dev.shiba@gmail.com"}
    );
    console.log(doc);
    res.json({
        msg: "User data has been deleted Successfully!"
    });
}

app.listen(5000, 'localhost', () => {
    console.log("Server is listening on port no: 5000");
});
