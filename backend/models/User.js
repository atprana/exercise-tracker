const { default: mongoose, models } = require("mongoose");

const UserSchema = mongoose.Schema ({
    username: String,
    description: String,
    duration: Number,
    date: String,
    count:Number,
    log: {
        alias: 'exercises',
        type:
        [{
         description: String,
         duration: Number,
         date: String
    }]}
})



module.exports = mongoose.model('users', UserSchema)