const joi = require("joi");

const usuarioSchema = joi.object({
	nome: joi.string().required().messages({
		"any.required": "O campo nome é obrigatório",
		"string.empty": "O campo nome é obrigatório.",
	}),
	email: joi.string().email().required().messages({
		"any.required": "O campo email é obrigatório",
		"string.empty": "O campo email é obrigatório.",
		"string.email": "O campo email precisa ser um email válido",
	}),
	senha: joi.string().required().messages({
		"any.required": "O campo senha é obrigatório",
		"string.empty": "O campo senha é obrigatório.",
	})
});

module.exports = usuarioSchema