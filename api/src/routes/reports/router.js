const { Router } = require('express')

const { createNewReport, showAllReports, showCountyReports, showReportById } = require('./controller')

// create a new Router instance
const router = new Router()

// define routes
router.get('/:id', showReportById)
router.post('/new', createNewReport)
router.get('/', showAllReports)
router.get('/:id', showReportById)
router.get('/county/:county', showCountyReports)

// exporting router
module.exports = router