const bcrypt = require('bcrypt');
const knex = require('../db');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(404).json("É obrigatório preencher o campo nome");
    }

    if (!email) {
        return res.status(404).json("É obrigatório preencher o campo email");
    }

    if (!senha) {
        return res.status(404).json("É obrigatório preencher o campo senha");
    }

    try {
        const usuarioExistente = await knex('users').where({ email });

        if (!usuarioExistente) {
            return res.status(400).json("O email já está em uso por outro usuário");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('users').insert({ nome, email, senha: senhaCriptografada }).returning('*');

        if (!usuario) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json("O usuario foi cadastrado com sucesso!");

    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    cadastrarUsuario
}