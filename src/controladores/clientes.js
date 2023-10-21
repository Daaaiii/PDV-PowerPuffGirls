const bcrypt = require("bcrypt");
const knex = require("../db");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const emailExistente = await knex("clientes").where({ email }).first();

        if (emailExistente) {
            return res.status(400).json("O email já está em uso por outro cliente");
        }
        const cpfExistente = await knex("clientes").where({ cpf }).first();

        if (cpfExistente) {
            return res.status(400).json("Cpf já cadastrado");
        }

        const cliente = await knex("clientes")
            .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .returning("*");

        if (!cliente) {
            return res.status(400).json("O cliente não foi cadastrado.");
        }

        return res.status(200).json("O cliente foi cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const listarClientes = async (req, res) => {
    return res.status(200).json(req.usuario);
};

const editarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body;
    const { id } = req.usuario;

    try {
        const usuarioExiste = await knex("usuarios").where({ id }).first();

        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: "Usuario não encontrado" });
        }

        await knex("usuarios").where({ id }).update({
            nome,
            email,
            cpf
        });

        res.status(204).send();
        return;
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = {
    cadastrarCliente,
    listarClientes,
    editarCliente
}