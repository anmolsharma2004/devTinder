const mongoose = require("mongoose")

connectDB = async () => {
    await mongoose.connect(
        "/"
    )
}

module.exports = {
    connectDB
}

