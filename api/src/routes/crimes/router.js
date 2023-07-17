const { Router } = require('express')
const { getAllCrimes } = require('./controller')
// create a new Router instance
const router = new Router()

// define routes

router.get('/', getAllCrimes)
// exporting router
module.exports = router