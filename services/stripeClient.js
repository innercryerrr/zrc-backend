const Stripe = require('stripe');

let stripeClient = new Stripe(process.env.STRIPE_SK);

module.exports = stripeClient;