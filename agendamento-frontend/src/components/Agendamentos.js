import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

    const Agendamento = () => {
    const [nomeCliente, setNomeCliente] = useState("");
    const [servico, setServico] = useState("");
    const [data, setData] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post(
            "http://localhost:5000/api/agendamentos",
            {
            nomeCliente,
            servico,
            data,
            }
        );

        setMensagem("Agendamento realizado com sucesso!");
        setNomeCliente("");
        setServico("");
        setData("");
        } catch (error) {
        setMensagem("Erro ao agendar. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="mb-4">Novo Agendamento</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Nome do Cliente</label>
            <input
                type="text"
                className="form-control"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Serviço</label>
            <input
                type="text"
                className="form-control"
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Data</label>
            <input
                type="date"
                className="form-control"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
            />
            </div>
            <button type="submit" className="btn btn-primary">
            Agendar
            </button>
        </form>
        {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}
        </div>
    );
};

export default Agendamento;
