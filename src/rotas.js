const express = require("express");
const multer = require('./intermediarios/multer');

const {
	cadastrarUsuario,
	editarUsuario,
	detalharUsuario,
} = require("./controladores/usuarios");
const {login} = require("./controladores/login");
const {categoria} = require("./controladores/categoria");
const verificaLogin = require("./intermediarios/verificaLogin");
const validarRequisicao = require("./intermediarios/validaRequisicao");

const {
	cadastrarCliente,
	listarClientes,
	editarCliente,
	detalharCliente,
} = require("./controladores/clientes");
const {
	cadastrarProduto,
	listarProdutos,
	excluirProduto,
	detalharProduto,
	editarProduto,
} = require("./controladores/produtos");
const {
	cadastrarPedido
} = require("./controladores/pedidos");

const loginSchema = require("./validacoes/login");
const usuarioSchema = require("./validacoes/usuario");
const clienteSchema = require("./validacoes/cliente");
const produtoSchema = require("./validacoes/produto");
const atualizarClienteSchema = require("./validacoes/atualizarCliente");
const atualizarProdutoSchema = require("./validacoes/atualizarproduto");


const rotas = express();

rotas.get(
	"/categoria",
	categoria
	// #swagger.tags = ['Categoria']
	// #swagger.description = 'Endpoint para listar categorias.'
);

rotas.post(
	"/usuario",
	validarRequisicao(usuarioSchema),
	cadastrarUsuario
	// #swagger.tags = ['Usuários']
	// #swagger.description = 'Endpoint para cadastrar usuário.'
);
rotas.post(
	"/login",
	validarRequisicao(loginSchema),
	login
	// #swagger.tags = ['Login']
	// #swagger.description = 'Endpoint para realizar o Login.'
);

rotas.use(verificaLogin);

rotas.put(
	"/usuario",
	validarRequisicao(usuarioSchema),
	editarUsuario
	// #swagger.tags = ['Usuários']
	// #swagger.description = 'Endpoint para editar usuário.
);
rotas.get(
	"/usuario",
	detalharUsuario
	// #swagger.tags = ['Usuários']
	// #swagger.description = 'Endpoint para detalhar usuário.
);

rotas.post(
	"/produto",
	validarRequisicao(produtoSchema),multer.single('produto_imagem'),
	cadastrarProduto
	// #swagger.tags = ['Produto']
	// #swagger.description = 'Endpoint para cadastrar produto.
);
rotas.put(
	"/produto/:id",
	validarRequisicao(atualizarProdutoSchema),multer.single('produto_imagem'),
	editarProduto
	// #swagger.tags = ['Produto']
	// #swagger.description = 'Endpoint para editar produto.
);
rotas.get(
	"/produto",
	listarProdutos
	// #swagger.tags = ['Produto']
	// #swagger.description = 'Endpoint para listar produto.
);
rotas.get("/produto/:id", detalharProduto 
// #swagger.tags = ['Produto']
// #swagger.description = 'Endpoint para detalhar produto.
);
rotas.delete("produto/:id", excluirProduto 
// #swagger.tags = ['Produto']
// #swagger.description = 'Endpoint para excluir produto.
);

rotas.post("/cliente", validarRequisicao(clienteSchema), cadastrarCliente 
// #swagger.tags = ['Cliente']
// #swagger.description = 'Endpoint para cadastrar cliente.
);
rotas.put(
	"/cliente/:id",
	validarRequisicao(atualizarClienteSchema),
	editarCliente
	// #swagger.tags = ['Cliente']
// #swagger.description = 'Endpoint para atualizar cliente.
);
rotas.get("/cliente", listarClientes
// #swagger.tags = ['Cliente']
// #swagger.description = 'Endpoint para listar clientes.
);
rotas.get("/cliente/:id?", detalharCliente
// #swagger.tags = ['Cliente']
// #swagger.description = 'Endpoint para detalhar cliente.
);

rotas.post('/pedido',
	cadastrarPedido
// #swagger.tags = ['Pedido']
// #swagger.description = 'Endpoint para cadastrar pedido.
)
rotas.get('/pedido',
// #swagger.tags = ['Pedido']
// #swagger.description = 'Endpoint para listar pedidos.
)

module.exports = rotas;
