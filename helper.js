const jwt = require('jsonwebtoken');
const JWT_KEY = require('./secrets');

// Checking whether the user is signed in or NOT.
// isAdmin cookie can be used to identify b/w user and Admin.
const protectRoute = async function(req, res, next) {
    let token = req.cookies.login;
    if(token) {
        let isVerified = jwt.verify(token, JWT_KEY);
        if(isVerified) {
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
}

module.exports = { protectRoute }
