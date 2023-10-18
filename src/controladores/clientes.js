
const knex = require("../db");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const clienteExistente = await knex("clientes").where({ email }).first();

        if (clienteExistente) {
            return res.status(400).json("O email já está em uso por outro cliente");
        }

        const cliente = await knex("clientes")
            .insert({ nome, email,cpf, cep, rua, numero, bairro, cidade, estado })
            .returning("*");

        if (!cliente) {
            return res.status(400).json("O cliente não foi cadastrado.");
        }

        return res.status(200).json("O cliente foi cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {cadastrarCliente}