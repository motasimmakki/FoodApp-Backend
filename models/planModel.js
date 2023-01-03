const mongoose = require('mongoose');
const { db_link } = require('../secrets');

mongoose.set("strictQuery", false);
mongoose.connect(db_link)
.then((db) => {
    console.log("Plan DB Connected!");
}).catch((err) => {
    console.log(err);
})

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        // For better error handling message.
        maxLength: [20, 
            `Plan name should NOT exceed 20 characters!`]
    },
    duration: {
        type: Number,
        required: [true, `Duration is required!`]
    },
    price: {
        type: Number,
        required: [true, `Price is required!`]
    },
    discount: {
        type: Number,
        validate: [function() {
            return this.discount < 100;
        }, `Discount cannot be 100%!`]
    }, 
    ratingAverage: {
        type: Number
    }
});

const planModel = mongoose.model("planModel", planSchema);

module.exports = { planModel }