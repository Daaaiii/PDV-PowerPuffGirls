const joi = require("joi");

const clienteSchema = joi.object({
	nome: joi.string().required().messages({
		"any.required": "O campo nome é obrigatório",
		"string.empty": "O campo nome é obrigatório.",
	}),
	email: joi.string().email().required().messages({
		"any.required": "O campo email é obrigatório",
		"string.empty": "O campo email é obrigatório.",
		"string.email": "O campo email precisa ser um email válido",
	}),
	cpf: joi
		.string()
		.regex(/^\d{3}\d{3}\d{3}\d{2}$/)
		.required()
		.messages({
			"any.required": "O campo cpf é obrigatório",
			"string.empty": "O campo cpf é obrigatório.",
		}),
	cep: joi.number(),
	rua: joi.string(),
	numero: joi.string(),
	bairro: joi.string(),
	cidade:joi.string(),
	estado:joi.string()
});

module.exports = clienteSchema;
