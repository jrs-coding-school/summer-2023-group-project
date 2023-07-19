const { Router } = require('express')
const { showAllReports, showCountyReports } = require('./controller')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', showAllReports)
router.get('/county/:county', showCountyReports)

// exporting router
module.exports = router