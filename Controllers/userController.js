const { userModel } = require('../Models/userModel');

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
        res.json({ err: err });
    }
}

// Getting specific user.
const getUser = async function(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findOne(id);
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
        res.json({ err: err });
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
        res.json({ err: err});
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
        res.json({ err: err});
    }
}

module.exports = {
    getAllUsers, 
    getUser,
    updateUser, 
    deleteUser
}
