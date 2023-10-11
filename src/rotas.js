const express = require('express')
const usuarios = require('./controladores/usuarios');

const rotas = express()
//TODO: fazer rotas
// rotas.get('/categoria',)

rotas.post('/usuario', usuarios.cadastrarUsuario);
// rotas.post('/login',)
//* A partir daqui precisa verificação
// rotas.use()

// rotas.get('/usuario',)
// rotas.put('/usuario',)

module.exports = rotas