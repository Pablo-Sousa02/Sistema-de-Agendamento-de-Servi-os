    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import { Button, Card, } from "react-bootstrap";

    function MeusAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);

    const carregarAgendamentos = async () => {
        try {
        const response = await axios.get("http://localhost:5000/api/agendamentos");
        setAgendamentos(response.data);
        } catch (error) {
        console.error("Erro ao buscar agendamentos", error);
        }
    };

    const excluirAgendamento = async (id) => {
        try {
        await axios.delete(`http://localhost:5000/api/agendamentos/${id}`);
        setAgendamentos((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
        console.error("Erro ao excluir agendamento", error);
        }
    };

    useEffect(() => {
        carregarAgendamentos();
    }, []);

    return (
        <div className="container mt-4">
        <h3>Meus Agendamentos</h3>
        {agendamentos.map((agendamento) => (
            <Card key={agendamento._id} className="mb-3">
            <Card.Body>
                <Card.Title>{agendamento.servico}</Card.Title>
                <Card.Text>Data: {agendamento.data}</Card.Text>
                <Card.Text>Horário: {agendamento.horario}</Card.Text>
                <Button variant="danger" onClick={() => excluirAgendamento(agendamento._id)}>
                Excluir
                </Button>
            </Card.Body>
            </Card>
        ))}
        </div>
    );
    }

    export default MeusAgendamentos;
