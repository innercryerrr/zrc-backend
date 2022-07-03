const express = require('express'),
      router = express.Router();

// performs server to server charge of a Stripe token made on public env (browser)
router.post('/charge-public-token', function (req, res, next) {
    const token = req.body;
})

// performs puppeteer webdrive tech to perform 
// ...emulated human request on landing page form
router.post('/push-info-to-quee', function (req, res, next) {
    const info = req.body;
})

// performs puppeteer webdrive tech to perform 
// ...emulated human request on landing page form
router.post('/perform-landing-submit', function (req, res, next) {
    const info = req.body;
})


module.exports = router;
