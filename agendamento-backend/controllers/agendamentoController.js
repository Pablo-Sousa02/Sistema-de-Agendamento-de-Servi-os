const Agendamento = require('../models/Agendamento');

// Função para criar agendamento
const criarAgendamento = async (req, res) => {
    try {
        const { cliente, servico, data, hora, profissional } = req.body;
        const agendamento = new Agendamento({
            cliente,
            servico,
            data,
            hora,
            profissional
        });

        await agendamento.save();
        res.status(201).json({ mensagem: 'Agendamento criado com sucesso', agendamento });
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        res.status(500).json({ mensagem: 'Erro ao criar agendamento.' });
    }
};

// Função para listar os agendamentos do cliente logado
const listarMeusAgendamentos = async (req, res) => {
    try {
        const clienteId = req.userId;

        const agendamentos = await Agendamento.find({ cliente: clienteId })
            .populate('profissional', 'nome')
            .sort({ data: 1, hora: 1 });

        const lista = agendamentos.map(agendamento => ({
            _id: agendamento._id,
            profissionalNome: agendamento.profissional ? agendamento.profissional.nome : 'Profissional não encontrado',
            servico: agendamento.servico,
            data: new Date(agendamento.data).toLocaleDateString(),
            hora: agendamento.hora
        }));

        res.json(lista);
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error);
        res.status(500).json({ mensagem: 'Erro ao listar agendamentos.' });
    }
};

// Função para listar os agendamentos do profissional logado
const listarAgendamentosDoProfissional = async (req, res) => {
    try {
        const profissionalId = req.usuarioId;

        const agendamentos = await Agendamento.find({ profissional: profissionalId })
            .populate('cliente', 'nome')
            .sort({ data: 1, hora: 1 });

        const lista = agendamentos.map(agendamento => ({
            _id: agendamento._id,
            clienteNome: agendamento.cliente ? agendamento.cliente.nome : 'Cliente não encontrado',
            servico: agendamento.servico,
            data: new Date(agendamento.data).toLocaleDateString(),
            hora: agendamento.hora
        }));

        res.json(lista);
    } catch (error) {
        console.error('Erro ao listar agendamentos do profissional:', error);
        res.status(500).json({ mensagem: 'Erro ao listar agendamentos.' });
    }
};

module.exports = {
    criarAgendamento,
    listarMeusAgendamentos,
    listarAgendamentosDoProfissional
};
