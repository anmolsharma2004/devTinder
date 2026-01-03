const mongoose = require("mongoose")

connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://anmolmolu22:Anmol2004@nodedevelopment.datlfyx.mongodb.net/devT"
    )
}

module.exports = {
    connectDB
}

