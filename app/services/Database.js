const mongoose = require('mongoose');
const db = mongoose.connection;

module.exports.connection = db;

module.exports.init = () => {

  mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
  })

  db.on('error', (error) => {
    _error('DATABASE', 'Connection error')
    shutDown(1)
  });

  db.once('open', () => {
    if(process.env.ENV !== 'test') _log('DATABASE', 'Connected')
  });

}