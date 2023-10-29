const mongoose = require("mongoose")
require("dotenv").config()

async function conexaoBancoDeDados() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USERNAME_DATA_BASE}:${process.env.PASSWORD_DATA_BASE}@bancodedadosvitor-vx.6awlvqi.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.log(error);
    }

}

module.exports = conexaoBancoDeDados