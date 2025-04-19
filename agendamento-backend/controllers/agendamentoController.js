const Agendamento = require('../models/Agendamento');
const Usuario = require('../models/Usuario');

exports.cadastrarAgendamento = async (req, res) => {
    try {
        const { clienteId, profissionalId, data, hora, servico } = req.body;

        const novoAgendamento = new Agendamento({
            clienteId,
            profissionalId,
            data,
            hora,
            servico
        });

        await novoAgendamento.save();
        res.status(201).json({ mensagem: "Agendamento realizado com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar agendamento:", error);
        res.status(500).json({ mensagem: "Erro ao cadastrar agendamento" });
    }
};

exports.buscarAgendamentosPorProfissional = async (req, res) => {
    try {
        const profissionalId = req.params.profissionalId;
        const agendamentos = await Agendamento.find({ profissionalId }).populate('clienteId', 'nome email');
        res.json(agendamentos);
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        res.status(500).json({ mensagem: "Erro ao buscar agendamentos" });
    }
};

    exports.buscarAgendamentos = async (req, res) => {
        try {
        const agendamentos = await Agendamento.find().populate('clienteId profissionalId', 'nome email');
        res.json(agendamentos);
        } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        res.status(500).json({ mensagem: "Erro ao buscar agendamentos" });
        }
    };
        exports.excluirAgendamento = async (req, res) => {
            try {
            const { id } = req.params;
            await Agendamento.findByIdAndDelete(id);
            res.json({ mensagem: "Agendamento excluído com sucesso" });
            } catch (error) {
            console.error("Erro ao excluir agendamento:", error);
            res.status(500).json({ mensagem: "Erro ao excluir agendamento" });
            }
        };