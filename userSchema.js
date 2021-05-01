var mongoose = require("mongoose")
var Schema = mongoose.Schema
var bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 5

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
            rightAnswer: String,
            answer: String
        }],
        createdDate: String,
        revisedRecords: [{
            revisedDate: String,
            revisedPerformance: String
        }],
        nextRevisionDate: String,
        revisionStatus: String
    }]
})

userSchema.pre('save', function(next) {
    var user = this
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err)
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

userSchema.pre('update', function(next) {
    const password = this.getUpdate().$set.password
    if (!password) {
        return next()
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err)
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return next(err)
            }
            this.getUpdate().$set.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(enteredPassword, cb) {
    bcrypt.compare(enteredPassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}
const User = mongoose.model("User", userSchema)
module.exports = User