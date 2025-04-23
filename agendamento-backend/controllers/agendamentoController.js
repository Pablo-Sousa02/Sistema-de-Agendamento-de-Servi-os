const Agendamento = require('../models/Agendamento');

// Criar agendamento
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

// Listar agendamentos do cliente logado
const listarMeusAgendamentos = async (req, res) => {
    try {
        const clienteId = req.userId;

        // Verifica se o clienteId está presente e válido
        if (!clienteId) {
            return res.status(400).json({ mensagem: 'ID do cliente não fornecido.' });
        }

        const agendamentos = await Agendamento.find({ cliente: clienteId })
            .populate('profissional', 'nome')
            .sort({ data: 1, hora: 1 });

        // Verifica se há agendamentos encontrados
        if (!agendamentos || agendamentos.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum agendamento encontrado.' });
        }

        const lista = agendamentos.map(agendamento => ({
            _id: agendamento._id,
            profissionalNome: agendamento.profissional ? agendamento.profissional.nome : 'Profissional não encontrado',
            servico: agendamento.servico,
            // Personalizando a data para o formato 'dd/mm/yyyy'
            data: new Date(agendamento.data).toLocaleDateString('pt-BR'),
            hora: agendamento.hora
        }));

        res.json(lista);
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error);
        res.status(500).json({ mensagem: 'Erro ao listar agendamentos.' });
    }
};


// Listar agendamentos do profissional logado
const listarAgendamentosDoProfissional = async (req, res) => {
    try {
        console.log('Profissional logado:', req.userId); // <-- isso aqui

        const profissionalId = req.usuarioId; // ID do profissional logado

        const agendamentos = await Agendamento.find({ profissional: profissionalId })
            .populate('cliente', 'nome')
            .sort({ data: 1, hora: 1 });

        console.log('Agendamentos encontrados:', agendamentos); // <-- e isso aqui

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
