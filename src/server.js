const express = require('express');
const app = express();

// rotaLogin
const rotaLogin = require("./routes/rotaLogin")
const rotaReqLives = require("./routes/rotaReqLives")

// path
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

app.use("/auth", rotaLogin)
app.use("/lives", rotaReqLives)

// conexao banco de dados
require("../dataBase/connectDataBase")()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

const { checkAuthentication, AddLinksLive } = require("../utils/utils")

const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html', 'index.html'));
  return;
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html', 'login.html'));
  return;
});

app.get('/painel', checkAuthentication, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html', 'painel.html'));
  return;
});