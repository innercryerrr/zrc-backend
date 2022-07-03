const express = require('express'),
      router = express.Router();

// performs server to server charge of a Stripe token made on public env (browser)
router.post('/charge-public-token', async function (req, res, next) {
    const token = req.body;
})

// performs puppeteer webdrive tech to perform 
// ...emulated human request on landing page form
router.post('/push-info-to-quee', async function (req, res, next) {
    const info = req.body;
    await global.queeManager.emit('push-info-to-quee', info);
})

module.exports = router;
