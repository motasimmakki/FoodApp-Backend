const mongoose = require('mongoose');
const { db_link } = require('../secrets');
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

mongoose.set("strictQuery", false);
mongoose.connect(db_link)
.then((db) => {
    console.log("User DB Connected!");
}).catch((err) => {
    console.log(err);
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function() {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 7,
        validate: function() {
            return (this.confirmPassword == this.password);
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurant_owner', 'delivery_person'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: '' //Provide image path here.
    },
    resetToken: String
});

// ---------->Learning Hooks (Mongoose Middleware)<----------
// **Always write hook(middleware) 
// before compiling the schema into model.

// // Mongoose Pre-hook.
// userSchema.pre('save', function() {
//     console.log("Before creating new user!");
// });

// // Mongoose Post-hook.
// userSchema.post('save', function() {
//     console.log("After creating new user!");
// });


// Calling 'pre()' using 'userSchema', therefore
// 'this' inside 'pre()' definition will also point to 'userSchema' object.
userSchema.pre('save', function() {
    // console.log("Before creating new user!");
    this.confirmPassword = undefined;
})

userSchema.pre('save', async function() {
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password = hashedString;
    console.log(hashedString);
});

userSchema.methods.createResetToken = function() {
    const resetToken = uuidv4();
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password, confirmPassword) {
    this.password = password;
    this.confirmPassword = confirmPassword;
    // So that resetToken won't save further in db.
    // Mongoose won't store any key with undefined value.
    this.resetToken = undefined;
}

// Compiling a model from schema.
const userModel = mongoose.model("userModel", userSchema);

module.exports = { userModel }
