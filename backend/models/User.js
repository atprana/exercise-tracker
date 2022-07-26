const { default: mongoose, models } = require("mongoose");

const UserSchema = mongoose.Schema ({
    username: String
})


module.exports = mongoose.model('user', UserSchema)