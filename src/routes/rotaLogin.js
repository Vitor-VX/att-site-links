const express = require("express")
const router = express.Router()

const { UserAdmin } = require("../../dataBase/dataBaseConfig")
const { generateToken } = require("../../utils/utils")

router.post("/login", async (req, res) => {
    const { user, password } = req.body

    try {
        if (!user || !password) {
            res.status(422).json({ message: "Todos os campos são necessários." })
            return;
        }

        const token_validate = generateToken()

        const verificClientDataBase = await UserAdmin.findOne({ user, password })
        if (!verificClientDataBase) {
            res.status(401).json({ message: "Usuário e senha não encontrados." })
            return;
        }

        await UserAdmin.updateOne(
            { user: user },
            { $set: { access_painel: token_validate } }
        )

        res.status(201).json({ message: "Login efetuado!", url: `/painel?validate=${token_validate}` })
        return;
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor." })
        return;
    }
})

module.exports = router