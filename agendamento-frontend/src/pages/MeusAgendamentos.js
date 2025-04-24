import { useEffect, useState } from 'react';
import { Container, Table, Card, Spinner, Alert, Image } from 'react-bootstrap';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function MeusAgendamentos() {
    const { usuario } = useAuth();  // Acessando os dados do usuário logado
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
                setAgendamentos(data);
            } catch (error) {
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
            <Container className="p-4 rounded shadow-sm bg-white">
                <h2 className="text-center mb-4 text-primary">Meus Agendamentos</h2>

                {erro && <Alert variant="danger">{erro}</Alert>}

                {/* Exibindo a foto de perfil do profissional logado */}
                {usuario && usuario.fotoPerfil ? (
                    <div className="text-center mb-4">
                        <Image
                            src={usuario.fotoPerfil}
                            roundedCircle
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>
                ) : (
                    <div className="text-center mb-4">
                        <span>Sem foto de perfil</span>
                    </div>
                )}

                {agendamentos.length === 0 ? (
                    <Card className="shadow-sm">
                        <Card.Body>
                            <p className="text-center m-0">Nenhum agendamento encontrado.</p>
                        </Card.Body>
                    </Card>
                ) : (
                    <Table striped bordered hover responsive className="shadow-sm table-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Cliente</th>
                                <th>Serviço</th>
                                <th>Data</th>
                                <th>Hora</th>
                                <th>Foto</th> {/* Coluna de foto */}
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map((a) => (
                                <tr key={a._id}>
                                    <td>{a.clienteNome}</td>
                                    <td>{a.servico}</td>
                                    <td>{new Date(a.data).toLocaleDateString()}</td>
                                    <td>{a.hora}</td>
                                    <td>
                                        {/* Verifica se o cliente tem uma foto */}
                                        {a.clienteFotoPerfil ? (
                                            <img
                                                src={a.clienteFotoPerfil}
                                                alt="Foto do cliente"
                                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                            />
                                        ) : (
                                            <span>Sem foto</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>
        </div>
    );
}

export default MeusAgendamentos;
