const { planModel } = require('../Models/planModel');

const create = async function(req, res) {
    try {
        let plan = req.body;
        let doc = await planModel.create(plan);
        if(doc) {
            console.log(doc);
            res.json({
                msg: "Plan successfully created in DB!"
            })
        } else {
            res.json({
                msg: "Plan could'nt be created!"
            })
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const updatePlan = async function(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById({ _id: id });
        if(plan) {
            // do stuffs to update.
        } else {
            res.json({ 
                msg: "Plan NOT found!" 
            });    
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const deletePlan = async function(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findByIdAndDelete({ _id: id });
        if(plan) {
            res.json({ 
                msg: "Plan deleted successfully!"
            });
        } else {
            res.json({ 
                msg: "Plan NOT found!"
            });
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const getPlan = async function(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById({ _id: id});
        if(plan) {
            res.json({ 
                msg: "Plan data is received!" ,
                plan
            });    
        } else {
            res.json({ 
                msg: "Plan NOT found!" 
            });    
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const getAllPlan = async function(req, res) {
    try {
        let plans = await planModel.find();
        if(plans) {
            res.json({
                msg: "All plans retrieved!",
                plans
            })
        } else {
            res.json({
                msg: "Plans NOT found!"
            })
        }
    } catch(err) {
        res.json({ err: err.message });
    }
}

const getTop3Plan = async function(req, res) {

}

module.exports = {
    create,
    updatePlan,
    deletePlan,
    getPlan,
    getAllPlan,
    getTop3Plan
}