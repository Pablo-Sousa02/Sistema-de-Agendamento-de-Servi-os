    import { motion } from 'framer-motion';
    import { Container, Button, Row, Col, Card } from 'react-bootstrap';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';
    import homeImage from '../assets/agenda.svg';
    import homeImage2 from '../assets/agenda2.jpg';

    function Home() {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4ff, #d6e0f5)', paddingTop: '50px' }}
        >
        <Container>
            {usuario ? (
            <Row className="justify-content-center text-center">
                <Col md={8}>
                <Card className="shadow-lg p-4 border-0">
                    <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    >
                    <h2 className="mb-3 fw-bold text-primary">Olá, {usuario.nome} 👋</h2>
                    <p className="lead mb-4"><strong>Estamos felizes em te ver por aqui! Aproveite para gerenciar seus agendamentos
                        pelo menu de navegação.</strong></p>

                    

                    <img
                        src={homeImage2}
                        alt="Organização"
                        className="img-fluid rounded mt-4 shadow-sm"
                        style={{ maxWidth: '70%' }}
                    />
                    </motion.div>
                </Card>
                </Col>
            </Row>
            ) : (
            <Row className="align-items-center">
                <Col md={6} className="mb-4 mb-md-0">
                <div className="text-center text-md-start">
                    <h1 className="display-4 fw-bold mb-3">Gerencie sua agenda de forma simples!</h1>
                    <p className="lead mb-4">Crie uma conta e comece agora mesmo a organizar seus compromissos de forma prática e rápida.</p>
                    <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                    <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
                        Entrar
                    </Button>
                    <Button variant="success" size="lg" onClick={() => navigate('/cadastro')}>
                        Cadastrar-se
                    </Button>
                    </div>
                </div>
                </Col>
                <Col md={6}>
                <Card className="border-0 shadow-lg">
                    <Card.Body className="p-0">
                    <img
                        src={homeImage}
                        alt="Agendamento"
                        className="img-fluid rounded"
                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                    />
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            )}
        </Container>
        </motion.div>
    );
    }

export default Home;
