const validator = require("validator")

const validateSignUpData = (req) => {
    // extracting the credentials from the req.body
    const {firstName, lastName, emailID, password} = req.body;

    if (!firstName || !lastName) {
        throw new Error("Error")
    }
    else if (!validator.isEmail(emailID)){
        throw new Error("Error")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Error")
    }
}
module.exports = {
    validateSignUpData
}