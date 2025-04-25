import { useEffect, useState } from 'react';
import {
    Container,
    Table,
    Card,
    Spinner,
    Alert,
    Row,
    Col,
    Badge
} from 'react-bootstrap';
import api from '../services/api';

function MeusAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarAgendamentos() {
            try {
                const { data } = await api.get('/api/agendamentos/profissional', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('Agendamentos do cliente:', data);
                setAgendamentos(data);
            } catch (error) {
                console.error('Erro ao carregar agendamentos:', error);
                setErro('Erro ao carregar os agendamentos.');
            } finally {
                setLoading(false);
            }
        }

        carregarAgendamentos();
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container className="p-4 rounded shadow bg-white">
                <Row className="mb-4">
                    <Col>
                        <h2 className="text-center text-primary fw-bold">
                            <i className="bi bi-calendar-check me-2"></i>
                            Meus Agendamentos
                        </h2>
                    </Col>
                </Row>

                {erro && (
                    <Row className="mb-3">
                        <Col>
                            <Alert variant="danger" className="text-center">{erro}</Alert>
                        </Col>
                    </Row>
                )}

                <Row>
                    <Col>
                        {agendamentos.length === 0 ? (
                            <Card className="shadow-sm border-0">
                                <Card.Body className="text-center">
                                    <i className="bi bi-emoji-frown fs-1 text-secondary mb-3"></i>
                                    <p className="fs-5">Nenhum agendamento encontrado.</p>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Table striped bordered hover responsive className="shadow-sm table-sm text-center align-middle">
                                <thead className="table-primary">
                                    <tr>
                                        <th>Cliente</th>
                                        <th>Serviço</th>
                                        <th>Data</th>
                                        <th>Hora</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agendamentos.map((a) => (
                                        <tr key={a._id}>
                                            <td className="fw-semibold">
                                                <i className="bi bi-person-circle me-1 text-info"></i>
                                                {a.clienteNome}
                                            </td>
                                            <td>
                                                <Badge bg="secondary" className="p-2">{a.servico}</Badge>
                                            </td>
                                            <td>
                                                <i className="bi bi-calendar-event me-1 text-success"></i>
                                                {new Date(a.data).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <i className="bi bi-clock me-1 text-warning"></i>
                                                {a.hora}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MeusAgendamentos;
