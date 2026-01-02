const adminAuth = (req, res, next) => {
    const token = "xyza"; 

    const isAuth = (token === "xyz")

    if (!isAuth) res.status(401)
                    .send("Unauthorized")

    else next();
}

module.exports = {
    adminAuth
}