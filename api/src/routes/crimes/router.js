const { Router } = require('express')
const { getAllCrimes, showCrimeById } = require('./controller')

// create a new Router instance
const router = new Router()

// define routes
router.get('/', getAllCrimes)
router.get('/:id', showCrimeById)

// exporting router
module.exports = router