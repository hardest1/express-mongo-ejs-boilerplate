const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const moment = require('moment')
const app = express()

require('dotenv').config()

global._log = (...message) => {
  let [ title, ...msg ] = message
  console.log(  
    chalk.gray( new Date().toLocaleString() ), 
    chalk.cyan(title),
    ...msg
  )
}

global._error = (...message) => {
  let [ title, ...msg ] = message
  console.error(  
    chalk.gray( new Date().toLocaleString() ), 
    chalk.red(title),
    chalk.bgRed(...msg)
  )
}

const db = require('./services/Database')
const models = require('./Models');
const pjson = require('../package.json');

const routerAPI = require('./routes/router.api')
const routerWeb = require('./routes/router.web')

global.APP_VERSION = pjson.version

global.Config = require('./Config')

global.BASE_DIR = __dirname

global.shutDown = (code = 0) => {
  _log('SYSTEM', 'Shutdown')
  process.exit(code);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.once('SIGUSR2', shutDown);

if(!process.env.MONGO_URL){
  _error('DB', 'No connection string provided in env');
  shutDown(1);
}

//db.init();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use((req, res, next) => {
  _log('HTTP', req.method, req.originalUrl)
  next()
})

app.use(Config.ENDPOINTS.API, cors())

app.use(Config.ENDPOINTS.API, routerAPI)
app.use(Config.ENDPOINTS.WEB, routerWeb)

app.use(express.static(__dirname + '/../public'))

app.use((req, res, next) => {
  _error('404', req.method, req.originalUrl)
  return res.redirect('/error/NDA0IC0gUGFnZSBub3QgZm91bmQ=')
})


module.exports = { app, db, models }