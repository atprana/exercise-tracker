const { default: mongoose, models } = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    log: [
        {
            description: String,
            duration: Number,
            date: String
        }
    ]
})



module.exports = mongoose.model('users', UserSchema)