    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { Form, Button, Container, Table } from 'react-bootstrap';

    const Agendamentos = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        data: '',
        hora: '',
        servico: '',
    });

    useEffect(() => {
        buscarAgendamentos();
    }, []);

    const buscarAgendamentos = async () => {
        try {
        const response = await axios.get('http://localhost:5000/api/agendamentos');
        setAgendamentos(response.data);
        } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post('http://localhost:5000/api/agendamentos', formData);
        setFormData({ nome: '', data: '', hora: '', servico: '' });
        buscarAgendamentos();
        } catch (error) {
        console.error('Erro ao cadastrar agendamento:', error);
        }
    };

    return (
        <Container className="mt-4">
        <h2>Agendamentos</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Data</Form.Label>
            <Form.Control type="date" name="data" value={formData.data} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Hora</Form.Label>
            <Form.Control type="time" name="hora" value={formData.hora} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Serviço</Form.Label>
            <Form.Control type="text" name="servico" value={formData.servico} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
            Agendar
            </Button>
        </Form>

        <hr />

        <h4 className="mt-4">Lista de Agendamentos</h4>
        <Table striped bordered hover className="mt-3">
            <thead>
            <tr>
                <th>Nome</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Serviço</th>
            </tr>
            </thead>
            <tbody>
            {agendamentos.map((ag, index) => (
                <tr key={index}>
                <td>{ag.nome}</td>
                <td>{new Date(ag.data).toLocaleDateString()}</td>
                <td>{ag.hora}</td>
                <td>{ag.servico}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        </Container>
    );
    };

    export default Agendamentos;
