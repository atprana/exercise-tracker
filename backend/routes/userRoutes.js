const express = require('express')
const router = express.Router()
const { 
    getUser, 
    createUser,
    createExercises,
    userLog } = require('../controllers/userController')

router.route('/').get(getUser).post(createUser)

router.route('/:id/exercises').post(createExercises)
router.route('/:id/logs').get(userLog)
module.exports = router

/*
/api/users/ GET, POST
/api/users/:_id/exercise  GET POST
/api/users/:_id/logs GET  
*/
