const knex = require("../db");
const jwt = require("jsonwebtoken");
const senhaHash = process.env.KEY_JWT;

const verificaLogin = async (req, res, next) => {
	const {authorization} = req.headers;

	if (!authorization) {
		return res.status(401).json("Não autorizado");
	}

	try {
		const token = authorization.replace("Bearer ", "").trim();

		const {id} = jwt.verify(token, senhaHash);

		const usuarioExiste = await knex("users").where({id}).first();

		if (!usuarioExiste) {
			return res.status(404).json("Usuario não encontrado");
		}

		const {senha, ...usuario} = usuarioExiste;

		req.usuario = usuario;

		next();
	} catch (error) {
		return res.status(400).json(error.message);
	}
};

module.exports = verificaLogin;
