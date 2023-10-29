const express = require("express")
const router = express.Router()

const { loadStreamers } = require("../../utils/utils")
const { Model } = require("../../dataBase/dataBaseConfig")

router.post("/joaovictorvx.api.add.lives", async (req, res) => {
    const { nameLive, twitchURL, instagramURL, twitterURL } = req.body

    try {
        if (!nameLive || !twitchURL || !instagramURL || !twitterURL) {
            res.status(422).json({ message: "Todos os campos são necessários!" })
            return;
        }

        await Model.create({
            name: nameLive,
            twitchURL: twitchURL,
            instagramURL: instagramURL,
            twitterURL: twitterURL
        }).then(() => {
            res.status(200).json({ message: "Link's adicionados com sucesso!" })
            return;
        })
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor." })
    }
})

router.get("/joaovictorvx.api.lives", async (req, res) => {
    try {
        const loadStreamer = await loadStreamers();

        res.status(200).json({ loadStreamer })
        return;
    } catch (error) {
        res.status(400).json({ error: "Erro ao tentar receber os links." })
    }
})

router.patch("/joaovictorvx.api.edit.lives", async (req, res) => {
    const { liveEditar, novoNome, novaUrlTwitch, novaUrlInstagram, novaUrlTwitter } = req.query

    try {
        if (!liveEditar || !novoNome || !novaUrlTwitch || !novaUrlInstagram || !novaUrlTwitter) {
            res.status(422).json({ message: "Todos os campos são necessários!" })
            return;
        }

        const verificarLiveEditar = await Model.findOne({ name: liveEditar })
        if (!verificarLiveEditar) {
            res.status(422).json({ message: "Nome live não existe." })
            return;
        }

        await Model.updateOne(
            { name: liveEditar },
            { $set: { name: novoNome, twitchURL: novaUrlTwitch, instagramURL: novaUrlInstagram, twitterURL: novaUrlTwitter } }
        ).then(() => {
            res.status(200).json({ message: "Live atualizada com sucesso!" })
            return;
        })
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor." })
    }
})

router.delete("/joaovictorvx.api.delete.lives", async (req, res) => {
    const { name } = req.query

    try {
        const verificLinkLive = await Model.findOne({ name });

        if (!verificLinkLive) {
            res.status(404).json({ message: "Live não existe." })
            return;
        }

        await Model.deleteOne({ name });
        res.status(200).json({ message: `Live com o nome "${name}" deletado!` })
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
})

module.exports = router