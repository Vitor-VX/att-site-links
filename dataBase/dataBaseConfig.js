const mongoose = require("mongoose")

const Model_Stream = new mongoose.Schema({
    name: {
        type: String
    },
    twitchURL: {
        type: String
    },
    instagramURL: {
        type: String
    },
    twitterURL: {
        type: String
    },
})

const User_Admin_Painel = new mongoose.Schema({
    user: {
        type: String
    },
    password: {
        type: String
    },
    access_painel: {
        type: String
    }
})

const Model = mongoose.connection.useDb("site_elements").model("links_stream", Model_Stream)
const UserAdmin = mongoose.connection.useDb("site_elements").model("acesso_painel", User_Admin_Painel)

module.exports = {
    Model,
    UserAdmin
}