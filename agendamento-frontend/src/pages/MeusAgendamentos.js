    import { useEffect, useState } from 'react';
    import { Container, Table } from 'react-bootstrap';
    import api from '../services/api';

    function MeusAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        async function carregarAgendamentos() {
        try {
            const { data } = await api.get('/agendamentos/meus', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setAgendamentos(data);
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        }
        }
        carregarAgendamentos();
    }, []);

    return (
        <Container className="mt-5">
        <h2 className="text-center mb-4">Meus Agendamentos</h2>
        {agendamentos.length === 0 ? (
            <p className="text-center">Nenhum agendamento encontrado.</p>
        ) : (
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Data</th>
                <th>Hora</th>
                </tr>
            </thead>
            <tbody>
                {agendamentos.map(a => (
                <tr key={a._id}>
                    <td>{a.cliente?.nome || 'Desconhecido'}</td>
                    <td>{a.servico}</td>
                    <td>{a.data}</td>
                    <td>{a.hora}</td>
                </tr>
                ))}
            </tbody>
            </Table>
        )}
        </Container>
    );
    }

    export default MeusAgendamentos;
