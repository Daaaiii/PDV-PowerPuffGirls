
const knex = require("../db");

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaExistente = await knex("categorias").where({ id: categoria_id }).first();

        if (!categoriaExistente) {
            return res.status(404).json("A categoria informada não existe.");
        }

        const produto = await knex("produtos")
            .insert({ descricao, quantidade_estoque, valor, categoria_id })
            .returning("*");

        if (!produto) {
            return res.status(400).json("O produto não foi cadastrado.");
        }

        return res.status(201).json("O produto foi cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {cadastrarProduto}