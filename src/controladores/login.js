
const knex = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const {email, senha} = req.body

    try{
        
        const usuario = await knex ('users').where({email}).first();
	
      
        if (!usuario){
            return res.status(404).json({mensagem:'E-mail ou senha inválido'})
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValida){
            return res.status(404).json({mensagem:'E-mail ou senha inválido'})
        }
       
		const token = jwt.sign({ id: usuario.id}, process.env.KEY_JWT, {
			expiresIn: '8h',
		})

		const { senha: _, ...usuarioLogado } = usuario;

		return res.json({ usuario: usuarioLogado, token })

    } catch(error) {
		return res.status(500).json({ mensagem: 'Erro interno do servidor' })
	}
}
 module.exports = {
    login
 }

 