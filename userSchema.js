var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: String,
    nickname: String,
    realname: String,
    idcard: String,
    emailaddress: String,
    password: String,
    avatar: String,
    mistakeList: [{
        subject: String,
        category: String,
        questionDescription: String,
        questionItems: [{ 
            question: String, 
            rightAnswer: String 
        }]
    }]
})

const User = mongoose.model("User", userSchema)
module.exports = User