const express = require("express");
const { cadastrarUsuario, editarUsuario, detalharUsuario } = require("./controladores/usuarios");
const { login } = require("./controladores/login");
const { categoria } = require("./controladores/categoria");
const verificaLogin = require("./intermediarios/verificaLogin");
const validarRequisicao = require("./intermediarios/validaRequisicao");
const usuarioSchema = require("./validacoes/usuario");
const loginSchema = require("./validacoes/login");

const rotas = express();

rotas.get('/categoria', categoria);

rotas.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.post('/login', validarRequisicao(loginSchema), login)

rotas.use(verificaLogin);

rotas.put('/usuario', validarRequisicao(usuarioSchema), editarUsuario);
rotas.get('/usuario', detalharUsuario)


module.exports = rotas;
