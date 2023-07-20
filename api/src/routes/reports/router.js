const { Router } = require('express')
const { showAllReports, showCountyReports, showReportById, showReportByUserId, updateUserReports, deleteUserReport } = require('./controller')

//import middleware
const { authenticate } = require('../../middleware/auth')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', showAllReports)
router.get('/:id', showReportById)
router.get('/:userId', showReportByUserId)
router.get('/county/:county', showCountyReports)
router.put('/update/', authenticate, updateUserReports )
router.delete('/delete/:id', authenticate, deleteUserReport)

// exporting router
module.exports = router