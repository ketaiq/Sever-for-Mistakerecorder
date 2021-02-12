var mongoose = require("mongoose")
var Schema = mongoose.Schema

var mistakeSchema = new Schema({
    subject: String,
    category: String,
    questionDescription: String,
    questionItems: [{ 
        question: String, 
        rightAnswer: String 
    }]
})

const Mistake = mongoose.model("Mistake", mistakeSchema)
module.exports = Mistake