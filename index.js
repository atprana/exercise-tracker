const express = require('express')
const colors = require('colors')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./backend/db')
const { User } = require('./backend/models/User')

connectDB()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', require('./backend/routes/userRoutes'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
