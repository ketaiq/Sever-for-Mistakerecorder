var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: String,
    nickname: String,
    realname: String,
    idcard: String,
    emailaddress: String,
    password: String,
    avatar: String
})

const User = mongoose.model("User", userSchema)
module.exports = User