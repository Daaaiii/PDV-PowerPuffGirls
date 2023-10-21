const knex = require("../db");

const cadastrarCliente = async (req, res) => {
	const {nome, email, cpf, cep, rua, numero, bairro, cidade, estado} = req.body;

	try {
		const emailExistente = await knex("clientes").where({email}).first();

		if (emailExistente) {
			return res.status(400).json("O email já está em uso por outro cliente");
		}
		const cpfExistente = await knex("clientes").where({cpf}).first();

		if (cpfExistente) {
			return res.status(400).json("Cpf já cadastrado");
		}

		const cliente = await knex("clientes")
			.insert({nome, email, cpf, cep, rua, numero, bairro, cidade, estado})
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
	try {
		const cliente = await knex("clientes");

		return res.status(200).json(cliente);
	} catch (error) {
		return res.status(400).json(error.message);
	}
};

const editarCliente = async (req, res) => {
	const {nome, email, cpf, cep, rua, numero, bairro, cidade, estado} = req.body;
	const id = req.params.id;

	try {
		const clienteExiste = await knex("clientes").where({id}).first();
		if (!clienteExiste) {
			return res.status(404).json({mensagem: "Cliente não encontrado"});
		}
		if (email) {
			
			const emailExistente = await knex("clientes").where({email}).first();
			if (emailExistente) {
				return res.status(400).json("O email já está em uso por outro cliente");
			}
		}
		if (cpf) {
			const cpfExistente = await knex("clientes").where({cpf}).first();

			if (cpfExistente) {
				return res.status(400).json("Cpf já cadastrado");
			}
		}

		await knex("clientes").where({id}).update({
			nome,
			email,
			cpf,
			cep,
			rua,
			numero,
			bairro,
			cidade,
			estado,
		});

		res.status(204).send();
		return;
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

module.exports = {
	cadastrarCliente,
	listarClientes,
	editarCliente,
};
