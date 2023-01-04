const mongoose = require('mongoose');
const { db_link } = require('../secrets');

mongoose.set("strictQuery", false);
mongoose.connect(db_link)
.then((db) => {
    console.log("Review DB Connected!");
}).catch((err) => {
    console.log(err);
})

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        required: [true, `Review is required!`]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, `Rating is required!`],
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true, `Review must belong to a user!`]
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        required: [true, `Plan must belong to a user!`]
    }
});

// find, findOne, findById, findOneAndUpdate, etc
// when any of these methods will be called, 
// this hook will gets invoked.
reviewSchema.pre(/^find/, function(next) {
    // We use populate whenever we can to integrate
    // two or more schema together.
    this.populate({
        // which field we wanna populate.
        path: 'user',
        // what fields we want, we provide it in select.
        select: 'name profileImage'
    }).populate('plan');
    next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = { reviewModel };
