const { Router } = require('express')
const {showReportById} = require('./controller')
const {createNewReport} = require('./controller')
// create a new Router instance
const router = new Router()

// define routes

router.get('/:id', showReportById)
router.post('/new', createNewReport)
// exporting router
module.exports = router