//TODO: cadastrar pedido
const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    if(!cliente_id) {
        return res.status(400).json({mensagem: "O campo cliente_id é obrigatório."});
    }

    if(!pedido_produtos) {
        return res.status(400).json({mensagem: "O campo pedido_produtos é obrigatório."});
    }

    const clienteExiste = await knex("clientes").where({id: cliente_id}).first();
    if (!clienteExiste) {
        return res.status(404).json({mensagem: "Cliente não encontrado"});
    }

}
//TODO: Listar pedidos

module.exports = {
    cadastrarPedido
}