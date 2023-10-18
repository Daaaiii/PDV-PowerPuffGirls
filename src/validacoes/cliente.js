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
    cpf: joi.string().required().length(11).messages({
		"any.required": "O campo cpf é obrigatório",
		"string.empty": "O campo cpf é obrigatório.",
	}),
   
});

module.exports = clienteSchema