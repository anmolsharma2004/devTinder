const mongoose = require("mongoose")
const { isLowercase } = require("validator")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        minLength : 4,
        maxLength : 10
    },
    lastName : {
        type : String
    },
    emailID : {
        type : String,
        lowercase : true,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        min : 18,
        max : 40
    }
})

const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel