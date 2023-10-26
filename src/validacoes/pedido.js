const joi = require("joi");

const pedidoSchema = joi.object({
	cliente_id: joi.number().integer().positive().required().messages({
		"any.required": "O campo id do cliente é obrigatório",
		"number.base": "O campo id do cliente é obrigatório.",
		"number.integer": "O campo de id do cliente deve ser um número inteiro",
		"number.positivo": "O campo de id do cliente deve ser um número positivo",
	}),
	observacao: joi.string(),
	pedido_produtos: joi.array().items(
		joi.object({
			produto_id: joi.number().positive().integer().required().messages({
				"any.required": "O campo de id da produto é obrigatório",
				"number.base": "O campo de id da produto deve ser um número",
				"number.integer": "O campo de id da produto deve ser um número inteiro",
				"number.positive":
					"O campo de id da produto deve ser um número positivo",
			}),
			quantidade_produto: joi
				.number()
				.positive()
				.integer()
				.required()
				.messages({
					"any.required": "O campo de quantidade do produto é obrigatório",
					"number.base": "O campo de quantidade do produto deve ser um número",
					"number.integer":
						"O campo de quantidade do produto deve ser um número inteiro",
					"number.positive":
						"O campo de quantidade do produto deve ser um número positivo",
				}),
		})
	),
});

module.exports = pedidoSchema;

