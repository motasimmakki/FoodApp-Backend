const { userModel } = require('../Models/userModel');
const { sendMail } = require('../utility/nodemailer');

// User routes.
// Getting data of all users.
const getAllUsers = async function(req, res) {
    try {
        let allUsers = await userModel.find();
        res.json({
            msg: "Users Data is retrieved!",
            allUsers
        });
    } catch(err) {
        res.json({ err: err.message });
    }
}

// Getting specific user.
const getUser = async function(req, res) {
    try {
        let id = req.id;
        let user = await userModel.findOne({ _id: id });
        if(user) {
            res.json({ 
                msg: "User data is received!", 
                user 
            });
        } else {
            res.json({ 
                msg: "User NOT found!", 
                obj: req.params 
            });
        }

    } catch(err) {
        res.json({ err: err.message });
    }
}

// Updating data of specific user.
const updateUser = async function(req, res) {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    /**
     * {
     *  name: "Motasim",
     *  email: "dev.motasim@gmail.com"
     * }
     */
    try {
        if(user) {
            let keys = []; //['name', 'email']
            for(key in dataToBeUpdated) {
                keys.push(key);
            }
            for(let i = 0; i < keys.length; i++) {
                // name: 'Motasim'
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedUser = await user.save();
            res.json({
                msg: "User Data Updated Successfully!"
            })
        } else {
            res.json({
                msg: "User NOT found!"
            })
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

// Deleting specific user.
const deleteUser = async function(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(user) {
            res.json({
                msg: "User data has been deleted!"
            })
        } else {
            res.json({
                msg: "User NOT found!"
            })
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const forgetpassword = async function(req, res) {
    let { email } = req.body;
    try {
        let user = await userModel.findOne({ email: email });
        if(user) {
            // create reset token.
            const resetToken = user.createResetToken();
            // create reset link. | https://xyz.com/resetPassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            // send email to user. | using nodemailer
            await sendMail("forgetpassword", { email, resetPasswordLink });
            // db save
            res.json({
                msg: "E-mail sent successfully!"
            })
        } else {
            res.json({
                msg: "User NOT found!"
            })
        }
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
}

const resetpassword = async function(req, res) {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    try {
        const user = await userModel.find({ resetToken: token });
        if(user) {
            // resetPasswordHandler() will update user in db.
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
            res.json({
                msg: "Password changed successfully!"
            })
        } else {
            res.json({
                msg: "User NOT found!"
            })
        }
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
}

module.exports = {
    getAllUsers, 
    getUser,
    updateUser, 
    deleteUser,
    forgetpassword,
    resetpassword
}
