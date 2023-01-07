const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static('public/build'));
app.use(express.json());
app.use(cookieParser());

// app.options('*', cors()) // To allow preflight

const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter = require('./Routers/bookingRouter');

app.use('/user', userRouter);
app.use('/plan', planRouter);
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);

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

const port = process.env.PORT || 5000;
app.listen(port, 'localhost', () => {
    console.log(`Server is listening on port no: ${port}`);
});
