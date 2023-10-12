const express = require("express");
const usuarios = require("./controladores/usuarios");
const {login} = require("./controladores/login");
const verificaLogin = require("./intermediarios/verificaLogin");

const rotas = express();

// rotas.get('/categoria',)

rotas.post("/usuario", usuarios.cadastrarUsuario);
rotas.post('/login', login)

rotas.use(verificaLogin);

// rotas.get('/usuario',)
// rotas.put('/usuario',)

module.exports = rotas;
