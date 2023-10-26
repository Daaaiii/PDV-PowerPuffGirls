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

module.exports = {
    listarPedidos
};
