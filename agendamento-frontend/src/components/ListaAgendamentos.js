    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import { Table, Button, Container } from "react-bootstrap";

    const ListaAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
        .get("http://localhost:5000/api/agendamentos", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            setAgendamentos(res.data);
        })
        .catch((err) => {
            console.error("Erro ao buscar agendamentos:", err);
        });
    }, []);

    return (
        <Container className="mt-4">
        <h3>Seus Agendamentos</h3>
        <Table striped bordered hover responsive className="mt-3">
            <thead>
            <tr>
                <th>Serviço</th>
                <th>Data</th>
                <th>Hora</th>
            </tr>
            </thead>
            <tbody>
            {agendamentos.map((item) => (
                <tr key={item._id}>
                <td>{item.servico}</td>
                <td>{new Date(item.data).toLocaleDateString()}</td>
                <td>{item.hora}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        </Container>
    );
    };

    export default ListaAgendamentos;
