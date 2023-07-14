const { Router } = require('express')
const {showReportById} = require('./controller')

// create a new Router instance
const router = new Router()

// define routes

router.get('/:id', showReportById)

// exporting router
module.exports = router