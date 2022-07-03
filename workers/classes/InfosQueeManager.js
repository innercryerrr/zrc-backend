const path = require('path');

function InfosQueeManager (opts) {
    
    if (!opts.dbpath) {
        throw new Error(' no .dbpath option defined.')
    }

    this.lowdb;
    this.quee = [];

    const startLowdb = async () => {
        
        let lowdb = await import('lowdb'),
            pathy = path.join(opts.dbpath),
            adapter = new lowdb.JSONFile(pathy);
    
        this.lowdb = new lowdb.Low(adapter)
        
        if (!this.lowdb.data) {
             this.lowdb.data = {};
        }
       
        await this.lowdb.read()
    }
    
   startLowdb()
}

InfosQueeManager.prototype.push = function (pushinginfo) {
    this.quee.push(pushinginfo);
}

InfosQueeManager.prototype.getNext = function () {
    return this.quee[this.quee.length - 1];
}

InfosQueeManager.prototype.getAll = function () {
    return this.quee;
}

InfosQueeManager.prototype.launchNext = function (newinfo) {
    const nextinf = this.getNext();
    
}

module.exports = InfosQueeManager;