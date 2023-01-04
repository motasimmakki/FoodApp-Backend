let SK = "sk_test_51MMTvvSF0bCqMCc8WSyVQlj0YGiwR27SieCYHVZoD4jFsmToP52fs4vV86JKn4ga8kxX7uf46naCEWqgjCPRgUMG008cKfD6xo"

const stripe = require('stripe')(SK);
// const { userModel } = require('../Models/userModel');
// const { planModel } = require('../Models/planModel');

const createSession = async function(req, res) {
    try {
        // let userId = req.id;
        // let planId = req.params.id;
        // const user = await userModel.findById(userId);
        // const plan = await planModel.findById(planId);

        const session = await stripe.checkout.sessions.create({
            // Need to mentions few keys explicitly.
            payment_method_types: ['card'],
            // customer_email: user.email,
            // client_reference_id: plan.id,
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "inr",
                        unit_amount: 20 * 100,
                        product_data: {
                            description: "My Testing PLan Desc.",
                            name: "My Testing PLan"
                        },
                    }
                },
            ],
            mode: "payment",
            success_url: `${req.protocol}://${req.get("host")}/profile`,
            cancel_url: `${req.protocol}://${req.get("host")}/profile`,
        });        
        
        // res.json({ 
        //     msg: "Success!",
        //     session
        // });
        res.redirect(303, session.url);
    } catch(err) {
        res.json({ err: err.message });
    }
}

const getAcknowledgement = function(req, res) {
    res.sendFile('G:/PepCoding FJP-9/Web Development/Backend/FoodApp-Backend/Views/booking.html');
}

module.exports = { 
    createSession,
    getAcknowledgement
}
