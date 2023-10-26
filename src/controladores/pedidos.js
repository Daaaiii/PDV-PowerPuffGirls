const knex = require("../db");

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        if (cliente_id) {
            const encontrarCliente = await knex('clientes').where('id', cliente_id);

            if (encontrarCliente) {
                const pedidosCliente = await knex('pedidos').where(
                    'cliente_id',
                    cliente_id
                );

                const todosPedidosArray = [];

                for (let pedido of pedidosCliente) {
                    const pedido_produtos = await knex('pedido_produtos').where(
                        'pedido_id',
                        pedido.id
                    );

                    todosPedidosArray.push({ pedido, pedido_produtos });
                }

                return res.status(200).json(todosPedidosArray);
            } else {
                return res.status(404).json({ mensagem: 'Cliente não encontrado' });
            }
        }

        const todosPedidos = await knex('pedidos');

        const todosPedidosArray = [];

        for (let pedido of todosPedidos) {
            const pedido_produtos = await knex('pedido_produtos').where(
                'pedido_id',
                pedido.id
            );

            todosPedidosArray.push({ pedido, pedido_produtos });
        }

        return res.status(200).json(todosPedidosArray);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao listar todos os pedidos' });
    }
};


const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        const valor_total = 0;
        for(let pedido of pedido_produtos) {
            let produto_id = pedido[0];
            let quantidade_produto = pedido[1];

            const produto = await knex('produtos').where({id: produto_id});

            if(!produto) {
                return res.status(404).json('O produto informado não existe.');
            };

            if(estoque < produto.quantidade_produto) {
                return res.status(400).json('A quantidade de produtos requisitada não tem no estoque');
            }

            valor_total += produto.valor * quantidade_produto;
        }

        const pedido = await knex("pedidos")
				.insert({
                    cliente_id,
                    observacao,
                    valor_total
				})
				.returning("*");

        return res.status(201).json(pedido);
        
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao cadastrar o pedido' });
    }
    
}

module.exports = {
    listarPedidos,
    cadastrarPedido
};
