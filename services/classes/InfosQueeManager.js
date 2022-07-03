const path = require('path'),
      request = require('request'),
      EventEmitter = require('events');

function InfosQueeManager (opts) {
    
    if (!opts.dbpath) {
        throw new Error(' no .dbpath option defined.')
    }

    if (!opts.urlaunch) {
        throw new Error(' no .urlaunch option defined.')
    }

    this.dbpath = opts.dbpath;
    this.urlaunch = opts.urlaunch;

    this.emitter = new EventEmitter()
    this.on = this.emitter.on;
    this.emit = this.emitter.emit;

    this.lowdb;
    this.currentInfo;

    // defines this.$emitter prototype as this
    Object.setPrototypeOf(this.emitter, this);

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

InfosQueeManager.prototype.all = function () {
    return this.lowdb.data['infosQuee'];
}

// basically removes last item from infosQuee
// then returns it in order to be sent as payload...
InfosQueeManager.prototype.popnext = function () {
    
    let nxtinf = this.lowdb.data['infosQuee'].pop();
    this.currentInfo = nxtinf;
    this.lowdb.write();
    
    return {
        launch: async () => {
            request({
                url: process.env.PERF_SUB_URL,
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' }
            })
        }
    }
}

InfosQueeManager.prototype.push = function (pushinginfo) {
    this.lowdb.data['infosQuee'].unshift(pushinginfo)
    this.lowdb.write();
}

InfosQueeManager.prototype.fetch = async function (wantedInfoid) {
    
    let found = this.lowdb.data['infosQuee'].find(inf => {
        return inf.id === wantedInfoid;
    })
    
    if (!found) {
        return { id: infoid, balance: 0 }
    }

    return found;
}

InfosQueeManager.prototype.upset = async function (infoidToupset, upsets) {
        
    let found = this.lowdb.data['infosQuee'].find(inf => {
        return inf.id === infoidToupset;
    })

    if (!found) {

        this.clog('  No inf set yet persistent json db.')
        this.clog('  ...adding new new ttchat data to json db.')
        
        this.lowdb.data['infosQuee'].push({
            id: infoidToupset,
            ...upsets
        })

    } else {

        this.lowdb.data['infosQuee'] = this.lowdb.data['infosQuee'].map(inf => {
            
            if (inf.id === infoidToupset) {
                return { ...inf, ...upsets}
            } 
            
            return inf;
        })
    }

    this.lowdb.write();
}

module.exports = InfosQueeManager;