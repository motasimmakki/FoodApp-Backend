const mongoose = require('mongoose');
const { db_link } = require('../secrets');
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');

mongoose.set("strictQuery", false);
mongoose.connect(db_link)
.then((db) => {
    console.log("DB Connected!");
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
    }
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
    let salt =await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password, salt);
    console.log(hashedString);
});

// Compiling a model from schema.
const userModel = mongoose.model("userModel", userSchema);

module.exports = { userModel };
