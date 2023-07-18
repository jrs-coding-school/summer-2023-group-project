const { Router } = require('express')
const { showAllReports } = require('./controller')
const { showCountyReports } = require('./controller')
//import middleware
const { logger } = require('../../middleware/logger')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', showAllReports)
router.get('/search', logger, showCountyReports)

// exporting router
module.exports = router