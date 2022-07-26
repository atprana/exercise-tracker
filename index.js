const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const { User } = require('./backend/models/User')

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

/*
/api/users/ GET, POST
/api/users/:_id/exercise  GET POST
/api/users/:_id/logs GET  
*/

app.route('/api/users').get((req, res) => 
{console.log('/api/users GET')})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
