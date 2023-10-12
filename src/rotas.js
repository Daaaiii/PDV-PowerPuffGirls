const express = require('express')
const usuarios = require('./controladores/usuarios');
const { login } = require('./intermediarios/login');

const rotas = express()
//TODO: fazer rotas
// rotas.get('/categoria',)

rotas.post('/usuario', usuarios.cadastrarUsuario);
rotas.post('/login', login)
// rotas.post('/login',)
//* A partir daqui precisa verificação
// rotas.use()

// rotas.get('/usuario',)
// rotas.put('/usuario',)

module.exports = rotas