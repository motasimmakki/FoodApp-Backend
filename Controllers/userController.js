const userModel = require('../Models/userModel');

// User routes.
// Get all users from db.
const getUsers = async function(req, res) {
    let allUsers = await userModel.find();
    // console.log(allUsers);
    // Get specific user by Id.
    // let allUsers = await userModel.find({name: "Ahkam"});
    res.json({
        msg: "Users Data is retrieved",
        allUsers
    });
}

// User dynamic route.
const getUserById = function(req, res) {
    // console.log(req.params.name);
    // let { id } = req.params;
    // let user = db.findOne(id);
    res.json({ 
        msg: "Dynamic route found! ", 
        obj: req.params 
    });
}

const postUser = function(req, res) {
    // console.log(req.body);
    user.push(req.body);
    res.json({
      message: "User data received successfully",
      user: req.body,
    });
}

const updateUser = async function(req, res) {
    let dataToBeUpdated = req.body;
    let doc = await userModel.findOneAndUpdate(
        {email: "okay.nice@gmail.com"},
        dataToBeUpdated
    );
    res.json({
        msg: "User Data Updated Successfully!"
    })
}

const deleteUser = async function(req, res) {
    let doc = await userModel.deleteOne(
        req.body
    );
    console.log(doc);
    res.json({
        msg: "User data has been deleted Successfully!"
    });
}

// ---------->Learning Setting and Getting Cookies <----------
// function setCookies(req, res) {
//     // res.setHeader('Set-Cookie', "isLoggedIn=true");
    
//     // maxAge: 1000 (cookie will expire after 1 sec)
//     // secure: true (this will make the cookie secure)
//     res.cookie('isLoggedIn', false, {maxAge: 10000, secure: true});
//     res.cookie('password', "1a2b3c4d5e6f", {maxAge: 10000, secure: true});
//     res.send("Cookie has been set!");
// }

// function getCookies(req, res) {
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("Cookie received!");
// }

module.exports = {
    getUsers, 
    getUserById, 
    postUser, 
    updateUser, 
    deleteUser
}
