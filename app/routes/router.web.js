const express = require('express')
const router = express.Router()

router.get('/', require('./web/index'))
router.get('/error/:msg*?', require('./web/error'))

module.exports = router