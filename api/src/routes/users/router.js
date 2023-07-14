const { Router } = require('express')
const {showAll, showById, register, login, updateUserById, destroyUserById} = require('./controller')

//import middleware
const { authenticate } = require('../../middleware/auth')

// create a new Router instance
const router = new Router()

// define routes

router.get('/', authenticate, showAll)
router.get('/id/:id', showById)
router.post('/register', register)
router.post('/login', login)
router.put('/update/:id', updateUserById)
router.delete('/delete/:id', destroyUserById)

// exporting router
module.exports = router

