require('dotenv').config();

const express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      cors = require('cors');
    
global.restRouter = require('./services/restRouter.js')
global.queeManager = require('./services/queeManager.js')
global.stripeClient = require('./services/stripeClient.js')

const app = express();

app.use(cors('*'))
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public'))

// route index
app.use('/rest', restRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    if (err.status === 404) {
        res.redirect('/')
    } else {
        // send the error status
        res.status(err.status || 500)
    }
})

console.log('   ...app was succesfully setup!\n')

if (process.env.NODE_ENV === 'deployment') {
    if (process.env.DEP_LOG === 'false') {
        console.log = (...args) => {}
    }
}

// export express app
module.exports = app;
