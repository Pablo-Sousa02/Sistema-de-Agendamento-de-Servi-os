const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const { cadastrarAgendamento } = require('./agendamentoController');
const agendamentos = require('../routes/agendamentos');

// Função para login
const getFotoPerfilUrl = (fotoPerfil) => {
    return `https://sistema-de-agendamento-de-servicos.onrender.com/uploads/${fotoPerfil}`;
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensagem: "Usuário não encontrado" });
        }

        const senhaCorreta = await usuario.compararSenha(senha);
        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: "Senha incorreta" });
        }

        const token = jwt.sign(
            { id: usuario._id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            token,
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo,
                fotoPerfil: usuario.fotoPerfil,  // Inclua a foto de perfil aqui
            }
        });
    } catch (error) {
        console.error("Erro no login:", error.message);
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
};


// Função para cadastro
const cadastrar = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensagem: "E-mail já cadastrado" });
        }

        const novoUsuario = new Usuario({
            nome,
            email,
            senha, // Deixa o bcrypt para o pre('save') do mongoose
            tipo
        });

        await novoUsuario.save();
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error.message);
        res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
    }
};

// Função para listar todos os usuários
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Erro ao listar usuários:", error.message);
        res.status(500).json({ mensagem: "Erro ao listar usuários" });
    }
};

// Função para buscar profissionais
const buscarProfissionais = async (req, res) => {
    try {
        const profissionais = await Usuario.find({ tipo: 'profissional' });
        res.status(200).json(profissionais);
    } catch (error) {
        console.error("Erro ao buscar profissionais:", error.message);
        res.status(500).json({ mensagem: "Erro ao buscar profissionais" });
    }
};

// Função para excluir perfil
const excluirPerfil = async (req, res) => {
    const { id } = req.params;

    try {
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({ mensagem: 'Perfil excluído com sucesso.' });
    } catch (error) {
        console.error("Erro ao excluir perfil:", error.message);
        res.status(500).json({ mensagem: 'Erro ao excluir perfil.' });
    }
};

// Função para editar perfil
const editarPerfil = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, fotoPerfil } = req.body;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(400).json({ mensagem: "Usuário não encontrado" });
        }

        usuario.nome = nome || usuario.nome;
        usuario.email = email || usuario.email;
        if (senha) {
            usuario.senha = senha; // Criptografar a nova senha
        }
        if (fotoPerfil) {
            usuario.fotoPerfil = fotoPerfil; // Atualiza a foto de perfil
        }

        await usuario.save();
        res.status(200).json({
            mensagem: "Perfil atualizado com sucesso",
            usuario: {
                nome: usuario.nome,
                email: usuario.email,
                fotoPerfil: getFotoPerfilUrl(usuario.fotoPerfil), // Retorna a URL correta da foto
            }
        });
    } catch (error) {
        console.error("Erro ao editar perfil:", error.message);
        res.status(500).json({ mensagem: "Erro ao editar perfil" });
    }
};

// Função para verificar o usuário autenticado
const verificarUsuario = async (req, res) => {
    try {
        // Alterado para pegar o ID do usuário a partir de req.user.id
        const usuario = await Usuario.findById(req.user.id);  
        if (!usuario) {
            return res.status(400).json({ mensagem: "Usuário não encontrado" });
        }
        res.status(200).json({ id: usuario._id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo });
    } catch (error) {
        console.error("Erro ao verificar o usuário:", error.message);
        res.status(500).json({ mensagem: "Erro ao verificar o usuário" });
    }
};

module.exports = {
    login,
    cadastrar,
    listarUsuarios,
    buscarProfissionais,
    excluirPerfil,
    editarPerfil,
    verificarUsuario,
};
