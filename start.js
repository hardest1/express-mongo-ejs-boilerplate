const http = require('http');
const https = require('https');
const fs = require('fs');
const clear = require('clear')

const { app } = require('./app/server')

const httpPort = process.env.PORT || 3000
const httpsPort = process.env.PORT_SSL || 3001

const credentials = {
  key: fs.readFileSync(__dirname + '/keys/localhost.key', 'utf8'), 
  cert: fs.readFileSync(__dirname + '/keys/localhost.crt', 'utf8')
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

clear()

const server = httpServer.listen(httpPort, () => { 
  _log('SERVER', `HTTP listening on port ${httpPort}!`)
})
const serverSSL = httpsServer.listen(httpsPort, () => { 
  _log('SERVER', `HTTPS listening on port ${httpsPort}!`)
})