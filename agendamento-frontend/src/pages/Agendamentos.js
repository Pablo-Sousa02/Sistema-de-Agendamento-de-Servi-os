    import { useState, useEffect } from 'react';
    import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
    import api from '../services/api';

    function Agendamentos() {
    const [profissionais, setProfissionais] = useState([]);
    const [servico, setServico] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);

    useEffect(() => {
        async function carregarProfissionais() {
        try {
            const { data } = await api.get('/usuarios/profissionais');
            setProfissionais(data);
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
        }
        }
        carregarProfissionais();
    }, []);

    async function handleAgendar() {
        if (!profissionalSelecionado || !servico || !data || !hora) {
        alert('Preencha todos os campos!');
        return;
        }
        try {
        await api.post('/agendamentos/cadastrar', {
            profissionalId: profissionalSelecionado._id,
            servico,
            data,
            hora
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        alert('Agendamento realizado!');
        setServico('');
        setData('');
        setHora('');
        setProfissionalSelecionado(null);
        } catch (error) {
        alert('Erro ao agendar!');
        }
    }

    return (
        <Container className="mt-5">
        <h2 className="text-center mb-4">Escolha um profissional</h2>
        <Row>
            {profissionais.length === 0 ? (
            <p className="text-center">Nenhum profissional disponível no momento.</p>
            ) : (
            profissionais.map((p) => (
                <Col md={4} key={p._id} className="mb-3">
                <Card onClick={() => setProfissionalSelecionado(p)} style={{ cursor: 'pointer' }}>
                    <Card.Body>
                    <Card.Title>{p.nome}</Card.Title>
                    <Card.Text>Especialidade: {p.especialidade || 'Não informado'}</Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))
            )}
        </Row>

        {profissionalSelecionado && (
            <Form className="mt-4">
            <h4>Agendar com {profissionalSelecionado.nome}</h4>
            <Form.Group className="mb-2">
                <Form.Label>Serviço</Form.Label>
                <Form.Control value={servico} onChange={e => setServico(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label>Data</Form.Label>
                <Form.Control type="date" value={data} onChange={e => setData(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Hora</Form.Label>
                <Form.Control type="time" value={hora} onChange={e => setHora(e.target.value)} />
            </Form.Group>
            <Button onClick={handleAgendar}>Confirmar Agendamento</Button>
            </Form>
        )}
        </Container>
    );
    }

    export default Agendamentos;
    // Compare this snippet from agendamento-frontend/src/components/ModalConfirmarSair.js: