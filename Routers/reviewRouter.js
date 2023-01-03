const express = require('express');
const reviewRouter = express.Router();
const { 
    getTop3Reviews, getAllReviews,
    getPlanReview, createReview,
    updateReview, deleteReview
 } = require('../Controllers/reviewController');
const { protectRoute, isAuthorized } = require('../helper');

reviewRouter
    .route("/")
    .get(getTop3Reviews);

reviewRouter
    .route("/allReviews")
    .get(getAllReviews);

// All reviews of particular plan.
reviewRouter
    .route("/:plan")
    .get(getPlanReview)

reviewRouter.use(protectRoute);
reviewRouter
    .route("/crud/:plan")
    .post(createReview)

reviewRouter
    .route("/crud/:plan/:id")
    .patch(updateReview)
    .delete(deleteReview);

module.exports = reviewRouter;