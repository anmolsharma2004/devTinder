const mongoose = require("mongoose")
const validator = require("validator")
const { isLowercase } = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLength: 10
    },
    lastName: {
        type: String
    },
    emailID: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Invalid Email Address" + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if (!validator.isStrongPassword(value)){
                throw new Error("Password is weak" + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 40
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female"].includes(value)) {
                throw new Error("Gender is not valid")
            }
        }
    }
}, 
{
    timestamps : true
}
)

const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel