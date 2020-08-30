const express = require('express')
const router = express.Router()

router.get('/info', require('./api/info'))

module.exports = router