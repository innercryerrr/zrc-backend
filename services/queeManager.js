const InfosQueeManager = require('./../classes/InfosQueeManager.js')

let queeManager = new InfosQueeManager({
    auto: false,
    urlaunch: process.env.PERF_SUB_URL,
    dbpath: process.env.DBS_PATH + 'infosQuee.json'
})

queeManager.on('new-info-to-quee', async function (newinf) {
    if (!this.auto) {
        this.push(newinf);
    }
})

queeManager.on('performing-submit', async function (currinf) {
    if (!this.auto) {
        // what what
    }
})

queeManager.on('submit-success', async function (currinf) {
    if (!this.auto) {
        // what what
    }
})

queeManager.on('submit-error', async function (currinf) {
    if (!this.auto) {
        // what what
    }
})

queeManager.on('ready-for-next', async function (currinf) {
    if (!this.auto) { // instruct cycle restart
        this.popnext().launch()
    }
})

module.exports = queeManager;