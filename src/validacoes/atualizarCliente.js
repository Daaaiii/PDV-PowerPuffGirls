const joi = require("joi");

const atualizarClienteSchema = joi.object({
	nome: joi.string().messages({
		"any.required": "O campo nome é obrigatório",
		"string.empty": "O campo nome é obrigatório.",
	}),
	email: joi.string().email().messages({
		"any.required": "O campo email é obrigatório",
		"string.empty": "O campo email é obrigatório.",
		"string.email": "O campo email precisa ser um email válido",
	}),
	cpf: joi
		.string()
		.regex(/^\d{3}\d{3}\d{3}\d{2}$/)
		.messages({
			"any.required": "O campo cpf é obrigatório",
			"string.empty": "O campo cpf é obrigatório.",
		}),
	cep: joi.string().length(8),
	rua: joi.string(),
	numero: joi.string(),
	bairro: joi.string(),
	cidade:joi.string(),
	estado:joi.string()
});

module.exports = atualizarClienteSchema;
