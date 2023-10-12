const bcrypt = require("bcrypt");
const knex = require("../db");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const usuarioExistente = await knex("users").where({ email }).first();

        if (usuarioExistente) {
            return res.status(400).json("O email já está em uso por outro usuário");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex("users")
            .insert({ nome, email, senha: senhaCriptografada })
            .returning("*");

        if (!usuario) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json("O usuario foi cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const editarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    try {
        const usuarioExiste = await knex("users").where({ id }).first();

        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: "Usuario não encontrado" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        if (email !== req.usuario.email) {
            const emailUsuarioExiste = await knex("users").where({ email }).first();

            if (emailUsuarioExiste) {
                res.status(400).json({ mensagem: "O Email já existe." });
                return;
            }
        }

        await knex("users").where({ id }).update({
            nome,
            email,
            senha: senhaCriptografada,
        });

        res.status(204).send();
        return;
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};
const detalharUsuario = async (req, res) => {
    try {
        const usuarioAutenticado = req.usuario;

        if (!usuarioAutenticado) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        const { id, nome, email } = usuarioAutenticado;

        return res.status(200).json({
            id,
            nome,
            email,
        });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    cadastrarUsuario,
    editarUsuario,
    detalharUsuario,
};
