require('dotenv').config();

const express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan');
    
global.restRouter = require('./services/restRouter.js')
global.queeManager = require('./services/queeManager.js')
global.stripeClient = require('./services/stripeClient.js')

const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'services/public')))

// route index
app.use('/', restRouter)

// export express app
module.exports = app;
