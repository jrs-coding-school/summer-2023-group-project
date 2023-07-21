const { Router } = require('express')
const { createNewReport, showAllReports, showCountyReports, showReportById, showReportByUserId, updateUserReports, deleteUserReport } = require('./controller')

//import middleware
const { authenticate } = require('../../middleware/auth')

// create a new Router instance
const router = new Router()

// define routes
router.get('/:id', showReportById)
router.post('/new', createNewReport)
router.get('/', showAllReports)
router.get('/:id', showReportById)
router.get('/userid/:userId', showReportByUserId)
router.get('/county/:county', showCountyReports)
router.put('/update/:id', authenticate, updateUserReports )
router.delete('/delete/:id', authenticate, deleteUserReport)

// exporting router
module.exports = router