const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('./secrets');
const { userModel } = require('./Models/userModel');

// Checking whether the user is signed in or NOT.
// isAdmin cookie can be used to identify b/w user and Admin.
const protectRoute = async function(req, res, next) {
    try {
        let token = req.cookies.login;
        if(token) {
            let payloadObj = jwt.verify(token, JWT_KEY);
            let user = await userModel.findById(payloadObj.payload);
            if(user) {
                req.id = user.id;
                req.role = user.role;
                next();
            } else {
                res.json({
                    msg: "User NOT Verified"
                });
            }
        } else {
            res.json({
                msg: "Operation NOT allowed!"
            })
        }
    } catch(err) {
        res.json({ msg: err.message });
    }
}

// isAuthorized() -> ? | this will checks the user's role
// client will send the role key in the request object.
const isAuthorized = function(roles) {
    return function(req, res, next) {
        let role = req.role;
        if(roles.includes(role)) {
            next();
        } else {
            // status 401: unauthorized access.
            res.status(401).json({
                msg: "Role invalid!"
            })
        }
    }
}

module.exports = { 
    protectRoute, 
    isAuthorized 
}
