const { Model, UserAdmin } = require("../dataBase/dataBaseConfig")

const generateToken = () => {
    const { v4: uuidv4 } = require('uuid');
    return uuidv4();
};

const loadStreamers = async () => {
    try {
        const lives = await Model.find();

        const data = await Promise.all(lives.map(el => el));
        return data
    } catch (err) {
        console.error('Erro ao carregar streamers:', err);
        throw err;
    }
}

const checkAuthentication = async (req, res, next) => {
    try {
        const token = req.query.validate;
        const urlVerific = req.url
        
        const verificTokenAccess = await UserAdmin.findOne({ access_painel: token })
        if (!verificTokenAccess || urlVerific === "/painel") return res.redirect("/login")

        await UserAdmin.updateOne(
            { access_painel: token },
            { $set: { access_painel: null } }
        )

        return next()
    } catch (error) {
        console.log(error);
    }
}

const AddLinksLive = async (name, twitchURL, instagramURL, twitterURL) => {
    try {
        const ModelLive = Model
        const verificLinkLive = await ModelLive.findOne({ name, twitchURL, instagramURL, twitterURL })
        if (!verificLinkLive) {
            return await ModelLive.create({
                name, twitchURL, instagramURL, twitterURL
            })
        }

        return await ModelLive.updateOne(
            { name, twitchURL, instagramURL, twitterURL },
            { $set: name, twitchURL, instagramURL, twitterURL }
        )
    } catch (error) {

    }
}

module.exports = {
    generateToken,
    loadStreamers,
    checkAuthentication,
    AddLinksLive
}