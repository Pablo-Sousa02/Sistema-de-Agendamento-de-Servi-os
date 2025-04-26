    import { useState } from 'react';
    import {
    Form,
    Button,
    Container,
    Card,
    Modal,
    Row,
    Col
    } from 'react-bootstrap';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import { useAuth } from '../contexts/AuthContext';

    function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro('');
        setSucesso('');
        try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/usuarios/login`, { email, senha });
        const usuarioData = response.data.usuario;
        const token = response.data.token;

        localStorage.setItem('authToken', token);
        login(usuarioData, token);

        setSucesso('Login realizado com sucesso!');
        setTimeout(() => {
            navigate('/');
        }, 2000);
        } catch (error) {
        console.error('Erro ao fazer login:', error);
        setErro('Erro ao fazer login: ' + error.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <>
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Card className="p-4 shadow-lg border-0" style={{ width: '24rem' }}>
            <h2 className="text-center mb-4 text-success fw-bold">
                Bem-vindo 👋
            </h2>

            {sucesso && <div className="alert alert-success">{sucesso}</div>}
            {erro && <div className="alert alert-danger">{erro}</div>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="user@gmail.com"
                />
                </Form.Group>
                <Form.Group className="mb-4">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    placeholder="Insira sua senha"
                />
                </Form.Group>

                <Button type="submit" variant="success" className="w-100">
                {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    'Entrar'
                )}
                </Button>
            </Form>

            <div className="mt-3 text-center">
                <Button variant="link" onClick={() => navigate('/cadastro')}>
                Não tem uma conta? Cadastre-se aqui.
                </Button>
            </div>

            <div className="text-center mt-2">
                <Button
                variant="outline-info"
                size="sm"
                onClick={() => setShowModal(true)}
                >
                Como funciona?
                </Button>
            </div>
            </Card>
        </Container>

        {/* Modal explicativo */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
            <Modal.Title>Como funciona o sistema?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row className="mb-3">
                <Col xs={12}>
                <p className="text-muted">
                    Nosso sistema foi feito para conectar <strong>profissionais autônomos</strong> e <strong>clientes</strong> de forma prática e organizada.
                </p>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-3">
                <h5 className="text-primary">
                    <i className="bi bi-briefcase-fill me-2"></i>Sou Profissional
                </h5>
                <p className="small">
                    Se você presta serviços e deseja <strong>gerenciar sua agenda</strong>, visualizar seus agendamentos e organizar seus horários, cadastre-se como <span className="fw-bold">Profissional</span>.
                </p>
                </Col>
                <Col md={6}>
                <h5 className="text-success">
                    <i className="bi bi-person-heart me-2"></i>Sou Cliente
                </h5>
                <p className="small">
                    Se você quer <strong>agendar serviços</strong> com profissionais disponíveis, ver seus compromissos e receber suporte, crie sua conta como <span className="fw-bold">Cliente</span>.
                </p>
                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                Fechar
            </Button>
            <Button variant="primary" onClick={() => {
                setShowModal(false);
                navigate('/cadastro');
            }}>
                Ir para Cadastro
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
    }

    export default Login;
