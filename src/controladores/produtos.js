
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

const listarProdutos = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        let produtos;

        if (categoria_id) 
        {
            const categoriaExistente = await knex("categorias").where({ id: categoria_id }).first();

            if (!categoriaExistente) 
            {
                return res.status(400).json("A categoria informada não existe.");
            }

            produtos = await knex("produtos").where({ categoria_id });
        } else 
        {
            produtos = await knex("produtos").select("*");
        }

    return res.status(200).json(produtos);

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

const excluirProduto = async (req, res) => {
    const { id } = req.params;
    
    try {
        const produtoExistente = await knex("produtos").where({id}).first();

        if (!produtoExistente) 
        {
            return res.status(400).json("O produto informado não existe");
        }

        const produtoExcluido = await knex('produtos').del().where({id}).returning('*');
        return res.status(200).json(produtoExcluido);


    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}
const detalharProduto = async (req, res) => {
    const { id } = req.params;
  
    try {
      const produtoEncontrado = await knex
        .select("*")
        .from("produtos")
        .where({ id })
        .first();
  
      if (!produtoEncontrado) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
      }
  
      return res.status(200).json(produtoEncontrado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

module.exports = {
    cadastrarProduto, 
    listarProdutos,
    excluirProduto,
    detalharProduto
}