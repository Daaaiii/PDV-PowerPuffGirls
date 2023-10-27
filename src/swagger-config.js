const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		version: "1.0.0",
		title: "The PowerPuff Girls",
		description: "API de um PDV desenvolvida no Desafio Final da Cubos Academy",
	},
	host: "faithful-bonnet-elk.cyclic.app",
	basePath: "/",
	schemes: ["http", "https"],
	consumes: ["application/json", "multipart/form-data"],
	produces: ["application/json", "multipart/form-data"],
	tags: [],
	description: [],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./rotas.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
	require("./src/index");
});
