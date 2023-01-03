const express = require('express');
const planRouter = express.Router();
const { 
    create, updatePlan,
    deletePlan, getPlan,
    getAllPlan, getTop3Plan
} = require('../Controllers/planController');
const { protectRoute, isAuthorized } = require('../helper');

planRouter
    .route("/")
    .get(getTop3Plan);
    
planRouter
    .route("/allPlans")
    .get(getAllPlan);

planRouter.use(protectRoute); // checks isLoggedIn?
planRouter
    .route("/:id")
    .get(getPlan);

planRouter.use(
    // checks isLoggedIn with role?
    isAuthorized(['admin', 'restaurant_owner'])
);
planRouter
    .route("/crudPlan")
    .post(create);

planRouter
    .route("/crudPlan/:id")
    .patch(updatePlan)
    .delete(deletePlan);

module.exports = planRouter;