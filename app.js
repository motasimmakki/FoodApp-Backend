const express = require('express');
const app = express();
app.use(express.json());
const userRouter = express.Router();
app.use('/auth', userRouter);

// Routing mini-app
userRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup);

let user = [
    {
        id: 1,
        name: "Apple",
        age: 12
    },
    {
        id: 2,
        name: "Mango",
        age: 15
    },
    {
        id: 3,
        name: "Guava",
        age: 20
    }
]

function getSignup(req, res) {
    res.sendFile("public/index.html", {root: __dirname});
}

function postSignup(req, res) {
    let {email, name, password} = req.body;
    console.log(req.body);
    res.json({
        msg: "User Signed Up!",
        email, name, password
    });
}

app.listen(5000, 'localhost', () => {
    console.log("Server is listening on port no: 5000");
});