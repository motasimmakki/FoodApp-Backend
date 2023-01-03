const { planModel } = require('../Models/planModel');
const { reviewModel } = require('../Models/reviewModel');

const getTop3Reviews = async function(req, res) {
    try {
        let topReviews = await reviewModel.find().sort(
            { rating: -1}
        ).limit(3);
        if(topReviews) {
            res.json({ 
                msg: "Top reviews received!",
                topReviews
            });
        } else {
            res.json({ 
                msg: "Reviews NOT found!" 
            });    
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const getAllReviews = async function(req, res) {
    try {
        let reviews = await reviewModel.find();
        if(reviews) {
            res.json({
                msg: "All reviews are retrieved!",
                reviews
            })
        } else {
            res.json({
                msg: "Reviews NOT found!"
            })
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const getPlanReview = async function(req, res) {
    try {
        let planId = req.params.plan;
        let planReviews = await reviewModel.findById(planId);
        if(planReviews) {
            res.json({
                msg: "Plan reviews are retrieved!",
                planReviews
            })
        } else {
            res.json({
                msg: "Review NOT found!"
            })
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const createReview = async function(req, res) {
    try {
        let planId = req.params.plan;
        const plan = await planModel.findById(planId);
        let review = req.body;
        let postReview = await reviewModel.create(review);
        if(postReview) {
            plan.ratingAverage = (plan.ratingAverage * plan.noOfRatings + req.body.rating) / (plan.noOfRatings + 1);
            plan.noOfRatings += 1;
            await plan.save();
            res.json({
                msg: "Review is successfully created!"
            })
        } else {
            res.json({
                msg: "Review couldn't be created!"
            })
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const updateReview = async function(req, res) {
    try {
        // Which plan's review is been updated.
        let planId = req.params.plan;
        // Which review need to be updated.
        let id = req.params.id;
        let review = await reviewModel.findById(planId);
        if(review) {
            let dataToBeUpdated = req.body;
            let keys = [];
            for(key in dataToBeUpdated) {
                keys.push(key);
            }
            for(let i = 0; i < keys.length; i++) {
                review[keys[i]] = dataToBeUpdated[keys[i]];
            }
            await review.save();
            res.json({
                msg: "Review updated successfully!"
            })
        } else {
            res.json({
                msg: "Review NOT found!"
            })
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const deleteReview = async function(req, res) {
    try {
        let planId = req.params.plan;
        let doc = await reviewModel.findByIdAndDelete(planId);
        if(doc) {
            res.json({
                msg: "Review deleted successfully!"
            })
        } else {
            res.json({
                msg: "Review NOT deleted!"
            })
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

module.exports = {
    getTop3Reviews,
    getAllReviews,
    getPlanReview,
    createReview,
    updateReview,
    deleteReview
}