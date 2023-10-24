const joi = require("joi");

const atualizarProdutoSchema = joi.object({
	descricao: joi.string().messages({
		"any.required": "O campo descrição é obrigatório",
		"string.empty": "O campo descrição é obrigatório.",
	}),
	quantidade_estoque: joi.number().integer().messages({
		"any.required": "O campo quantidade do estoque é obrigatório",
		"number.base": "A quantidade do estoque deve ser um número",
		"number.integer": "A quantidade do estoque deve ser um número inteiro",
	}),
	valor: joi.number().messages({
		"any.required": "O campo valor é obrigatório",
		"number.base": "O valor deve ser um número",
	}),
	categoria_id: joi.number().integer().messages({
		"any.required": "O campo de id da categoria é obrigatório",
		"number.base": "O campo de id da categoria deve ser um número",
		"number.integer": "O campo de id da categoria deve ser um número inteiro",
	}),
	produto_imagem: joi.string(),
});

module.exports = atualizarProdutoSchema;
