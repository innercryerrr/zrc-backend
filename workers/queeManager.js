const InfosQueeManager = require('./classes/InfosQueeManager.js')

let queeManager = new InfosQueeManager({
    dbpath: './../db/infosQuee.json'
})

module.exports = queeManager;