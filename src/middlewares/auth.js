const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const adminAuth = (req, res, next) => {
    const token = "xyza";

    const isAuth = (token === "xyz")

    if (!isAuth) res.status(401)
        .send("Unauthorized")

    else next();
}

const userAuth = async (req, res, next) => {
    try {
        // Read the token from the cookies
        const { token } = req.cookies

        const decodedObj = await jwt.verify(token, "DEV@tinder$123")

        const { _id } = decodedObj

        const user = await UserModel.findById(_id)
        if (!user) {
            throw new Error("User not found")
        }

        req.user = user

        next();
    }

    catch (err) {
        res.status(401)
            .send("Something went wrong")
    }

}

module.exports = {
    adminAuth, userAuth
}