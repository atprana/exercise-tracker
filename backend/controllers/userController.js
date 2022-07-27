const User = require('../models/User')
/* -------------- 
@desc GET users 
@route /api/users 
@access Private 
-----------------*/

const getUser = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
}

/* -------------- 
@desc POST users 
@route /api/users 
@access Private 
-----------------*/

const createUser = async (req, res) => {
    if (!req.body.username) {
        res.status(400)
        throw new Error('Please add a username field')
    }
    const user = await User.create({
        username: req.body.username,
    })
    res.status(200).json(user)
}

/* -------------- 
@desc create Exercise 
@route /api/users/:id/exercises 
@access Private 
-----------------*/
const createExercises = async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found!')
    }

    if (!req.body.description || !req.body.duration) {
        res.status(400)
        throw new Error('Please add description and duration field')
    } 
    
    // this format is essential to PASS the TEST !!!
    const date = req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString()

    // user.description = req.body.description
    // user.duration = req.body.duration
    // user.date = date

    user.log.push({
        description: req.body.description,
        duration: req.body.duration,
        date: date
    })
    const count = user.log.length -1

    await user.save()
  
    res.status(200).json({
        _id: user._id,
        username: user.username,
        description: user.log[count].description,
        duration: user.log[count].duration,
        date:  date
    })
}

/* ---------------------------- 
@desc GET User Exercises log 
@route /api/users/:id/log
@access Private 
-------------------------------*/
const userLog = async (req, res) => {
    let from = req.query.from
    let to = req.query.to
    let limit = parseInt(req.query.limit)  
    const userId = req.params.id

    const user = await User.findById(userId)
    .select({ username: 1, _id: 1, log: 1 })
    if (!user) {
        res.status(400)
        throw new Error('User not found!')
    }
    
    if (from) {
        user.log = user.log.filter( val => new Date(val.date) > new Date(from))
    }
    if (to) {
        user.log = user.log.filter( val => new Date(val.date) < new Date(to))
    }
    if (limit){
        user.log = user.log.slice(0, limit)
    } 
    
    const userlog = {
        _id: userId,
        username: user.username ,
        count: user.log.length,
        log: user.log
    }
    
    res.json (userlog)
     
}



module.exports = { getUser, createUser, createExercises, userLog }