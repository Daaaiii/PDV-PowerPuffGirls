const express = require("express");
const usuarios = require("./controladores/usuarios");
const {login} = require("./controladores/login");
const verificaLogin = require("./intermediarios/verificaLogin");
const validarRequisicao = require("./intermediarios/validaRequisicao");
const usuarioSchema = require("./validacoes/usuario");

const rotas = express();

// rotas.get('/categoria',)

rotas.post("/usuario", usuarios.cadastrarUsuario);
rotas.post('/login', login)

rotas.use(verificaLogin);

rotas.put('/usuario', validarRequisicao(usuarioSchema) , usuarios.editarUsuario);
rotas.get('/usuario',usuarios.detalharUsuario )


module.exports = rotas;
