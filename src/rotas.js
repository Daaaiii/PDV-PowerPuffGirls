const express = require("express");
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

const loginSchema = require("./validacoes/login");
const usuarioSchema = require("./validacoes/usuario");
const clienteSchema = require("./validacoes/cliente");
const produtoSchema = require("./validacoes/produto");
const atualizarClienteSchema = require("./validacoes/atualizarCliente");
const atualizarProdutoSchema = require("./validacoes/atualizarproduto");

const rotas = express();

rotas.get("/categoria", categoria);

rotas.post("/usuario", validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.post("/login", validarRequisicao(loginSchema), login);

rotas.use(verificaLogin);

rotas.put("/usuario", validarRequisicao(usuarioSchema), editarUsuario);
rotas.get("/usuario", detalharUsuario);

rotas.post("/produto", validarRequisicao(produtoSchema), cadastrarProduto);
rotas.put(
	"/produto/:id",
	validarRequisicao(atualizarProdutoSchema),
	editarProduto
);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);
rotas.delete("produto/:id", excluirProduto);

rotas.post("/cliente", validarRequisicao(clienteSchema), cadastrarCliente);
rotas.put(
	"/cliente/:id",
	validarRequisicao(atualizarClienteSchema),
	editarCliente
);
rotas.get("/cliente", listarClientes);
rotas.get("/cliente/:id?", detalharCliente);

module.exports = rotas;
