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

module.exports = {
    create
}