var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: String,
    nickname: String,
    realname: String,
    idcard: String,
    emailaddress: String,
    password: String,
    avatar: Buffer,
    mistakeList: [{
        subject: String,
        category: String,
        questionDescription: String,
        questionItems: [{ 
            question: String, 
            rightAnswer: String 
        }],
        createdDate: String,
        revisedRecords: [{
            revisedDate: String,
            revisedPerformance: String
        }],
        nextRevisionDate: String,
        isRevising: Boolean
    }]
})

const User = mongoose.model("User", userSchema)
module.exports = User