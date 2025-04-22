import { useEffect, useState } from 'react';
import { Container, Table, Alert, Card, Spinner } from 'react-bootstrap';
import api from '../services/api';

function MeusAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarAgendamentos() {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token); // Verificar o token
                const { data } = await api.get('/agendamentos/meus', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Dados dos agendamentos:', data); // Verificar a resposta da API
                if (data.length === 0) {
                    setMensagem('Nenhum agendamento encontrado.');
                } else {
                    setAgendamentos(data);
                }
            } catch (error) {
                console.error('Erro ao carregar agendamentos:', error);
                setMensagem('Erro ao carregar seus agendamentos.');
            } finally {
                setLoading(false);
            }
        }
        carregarAgendamentos();
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Meus Agendamentos</h2>
            {mensagem && <Alert variant={mensagem.includes('Erro') ? 'danger' : 'info'}>{mensagem}</Alert>}
            {agendamentos.length === 0 ? (
                <Card className="shadow-sm">
                    <Card.Body>
                        <p className="text-center">{mensagem}</p>
                    </Card.Body>
                </Card>
            ) : (
                <Table striped bordered hover responsive className="shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Profissional</th>
                            <th>Serviço</th>
                            <th>Data</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendamentos.map((a) => (
                            <tr key={a._id}>
                                <td>{a.profissional?.nome || 'Desconhecido'}</td>
                                <td>{a.servico}</td>
                                <td>{new Date(a.data).toLocaleDateString()}</td>
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
