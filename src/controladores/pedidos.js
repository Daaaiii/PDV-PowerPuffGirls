const knex = require("../db");

const listarPedidos = async (req, res) => {
	const {cliente_id} = req.query;

	try {
		if (cliente_id) {
			const encontrarCliente = await knex("clientes").where("id", cliente_id);

			if (encontrarCliente) {
				const pedidosCliente = await knex("pedidos").where(
					"cliente_id",
					cliente_id
				);

				const todosPedidosArray = [];

				for (let pedido of pedidosCliente) {
					const pedido_produtos = await knex("pedido_produtos").where(
						"pedido_id",
						pedido.id
					);

					todosPedidosArray.push({pedido, pedido_produtos});
				}

				return res.status(200).json(todosPedidosArray);
			} else {
				return res.status(404).json({mensagem: "Cliente não encontrado"});
			}
		}

		const todosPedidos = await knex("pedidos");

		const todosPedidosArray = [];

		for (let pedido of todosPedidos) {
			const pedido_produtos = await knex("pedido_produtos").where(
				"pedido_id",
				pedido.id
			);

			todosPedidosArray.push({pedido, pedido_produtos});
		}

		return res.status(200).json(todosPedidosArray);
	} catch (error) {
		return res.status(500).json({mensagem: "Erro ao listar todos os pedidos"});
	}
};

const cadastrarPedido = async (req, res) => {
	const {cliente_id, observacao, pedido_produtos} = req.body;

	try {
		const clienteExiste = await knex("clientes").where({id: cliente_id});
		if (!clienteExiste) {
			return res.status(404).json("O cliente informado não existe.");
		}
		let valorTotal = 0;
		//Verificar se produto existe
		for (let i = 0; i < pedido_produtos.length; i++) {
			let idProduto = pedido_produtos[i].produto_id;

			const produtoExiste = await knex("produtos").where({
				id: idProduto,
			});

			if (!produtoExiste) {
				return res.status(404).json("O produto informado não existe.");
			}

			//verificar se estoque é suficiente
			const quantidadeSolicitada = pedido_produtos[i].quantidade_produto;

			const estoque = produtoExiste[0].quantidade_estoque;

			if (estoque < quantidadeSolicitada) {
				return res
					.status(400)
					.json(
						"A quantidade de produtos requisitada não está disponível no estoque"
					);
			}

			//Calcular o valor do pedido
			const precoProduto = produtoExiste[0].valor;
			valorTotal += precoProduto * quantidadeSolicitada;
		}
		const pedido = await knex("pedidos")
			.insert({
				cliente_id,
				observacao,
				valor_total: valorTotal,
			})
			.returning("*");

		for (let i = 0; i < pedido_produtos.length; i++) {
			const idProduto = pedido_produtos[i].produto_id;
			const produtoExiste = await knex("produtos").where({
				id: idProduto,
			});
			const quantidadeSolicitada = pedido_produtos[i].quantidade_produto;
			const precoProduto = produtoExiste[0].valor;

			await knex("pedido_produtos").insert({
				pedido_id: pedido[0].id,
				produto_id: idProduto,
				quantidade_produto: quantidadeSolicitada,
				valor_produto: precoProduto,
			});
		}

		return res.status(201).json(pedido);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error.message);
	}
};

module.exports = {
	listarPedidos,
	cadastrarPedido,
};
