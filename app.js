const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

app.use('/user', userRouter);
app.use('/auth', authRouter);
   

// // IIFE (Immediately Invoked Function Expressing),
// for creating new user in DB.
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


app.listen(5000, 'localhost', () => {
    console.log("Server is listening on port no: 5000");
});
