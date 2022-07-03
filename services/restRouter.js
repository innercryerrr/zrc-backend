const express = require('express'),
      router = express.Router();

// performs server to server charge of a Stripe token made on public env (browser)
router.post('/charge-public-token', async function (req, res) {
    
    const ptoken = req.body.token;

    let charge = await global.stripeClient.charge(ptoken, {
        // opts
    })
})

// 
router.post('/push-info-to-quee', async function (req, res) {
    
    const info = req.body;
    await global.queeManager.push(info)
})

module.exports = router;
