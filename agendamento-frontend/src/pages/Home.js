import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Button, Row, Col, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import homeImage from '../assets/agenda.svg';

function Home() {
    const { usuario } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0f4ff, #d6e0f5)',
                paddingTop: '50px',
            }}
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
                                    <h2 className="mb-3 fw-bold text-primary">
                                        <span
                                            style={{
                                                fontSize: '2.5rem',
                                                fontWeight: '700',
                                                color: '#1abc9c',
                                                backgroundColor: '#f0f4ff',
                                                padding: '5px 15px',
                                                borderRadius: '25px',
                                                boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)',
                                            }}
                                        >
                                            Bem-vindo, {usuario.nome} 👋
                                        </span>
                                    </h2>
                                    <p className="lead mb-4">
                                        <strong>
                                            Aqui você pode gerenciar todos os seus compromissos e acompanhar os agendamentos em tempo real.
                                        </strong>
                                    </p>

                                    {/* Cards Informativos */}
                                    <Row className="mt-4">
                                        <Col sm={12} md={4} className="mb-4">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 1 }}
                                            >
                                                <Card className="shadow-lg border-0 h-100">
                                                    <Card.Body>
                                                        <h5 className="text-primary">Meus Agendamentos</h5>
                                                        <p className="text-muted">Acesse todos os agendamentos realizados e acompanhe suas atividades.</p>
                                                        {usuario.tipo === 'cliente' ? (
                                                            <Button
                                                                variant="outline-primary"
                                                                onClick={() => navigate('/agendamentos')}
                                                                className="w-100 mt-2"
                                                            >
                                                                Agendar
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="outline-primary"
                                                                onClick={() => navigate('/agendamentos')}
                                                                className="w-100 mt-2"
                                                            >
                                                                Ver Agendamentos
                                                            </Button>
                                                        )}
                                                    </Card.Body>
                                                </Card>
                                            </motion.div>
                                        </Col>

                                        <Col sm={12} md={4} className="mb-4">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 1 }}
                                            >
                                                <Card className="shadow-lg border-0 h-100">
                                                    <Card.Body>
                                                        <h5 className="text-success">Perfil</h5>
                                                        <p className="text-muted">Gerencie suas informações e preferências de forma fácil e segura.</p>
                                                        <Button
                                                            variant="outline-success"
                                                            onClick={() => navigate('/editar-perfil')}
                                                            className="w-100 mt-2"
                                                        >
                                                            Editar Perfil
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            </motion.div>
                                        </Col>

                                        <Col sm={12} md={4} className="mb-4">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 1 }}
                                            >
                                                <Card className="shadow-lg border-0 h-100">
                                                    <Card.Body>
                                                        <h5 className="text-warning">Histórico de Serviços</h5>
                                                        <p className="text-muted">Consulte o histórico dos serviços realizados e os detalhes de cada um.</p>
                                                        <Button
                                                            variant="outline-warning"
                                                            onClick={() => navigate('/historico')}
                                                            className="w-100 mt-2"
                                                        >
                                                            Ver Histórico
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            </motion.div>
                                        </Col>
                                    </Row>

                                    {/* Informações adicionais */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <div className="mt-4">
                                            <h4 className="text-primary">Dicas para uma boa gestão de agenda</h4>
                                            <ul className="text-muted">
                                                <li>Mantenha seus compromissos organizados e não se esqueça de confirmar suas reservas.</li>
                                                <li>Utilize as notificações para garantir que não perca nenhum evento importante.</li>
                                                <li>Personalize sua agenda para se adequar melhor à sua rotina diária.</li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <Row className="align-items-center">
                        <Col md={6} className="mb-4 mb-md-0">
                            <div className="text-center text-md-start">
                                <motion.h1
                                    className="display-4 fw-bold mb-3"
                                    initial={{ x: -100 }}
                                    animate={{ x: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    Gerencie sua agenda de forma simples!
                                </motion.h1>
                                <motion.p
                                    className="lead mb-4"
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    Crie uma conta e comece agora mesmo a organizar seus compromissos de forma prática e rápida.
                                </motion.p>
                                <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-md-start">
                                    <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
                                        Entrar
                                    </Button>
                                    <Button variant="success" size="lg" onClick={() => navigate('/cadastro')}>
                                        Cadastrar-se
                                    </Button>
                                    <Button variant="outline-info" size="lg" onClick={() => setShowModal(true)}>
                                        Como funciona?
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <Card className="border-0 shadow-lg">
                                <Card.Body className="p-0">
                                    <motion.img
                                        src={homeImage}
                                        alt="Agendamento"
                                        className="img-fluid rounded"
                                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1 }}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>

            {/* Modal explicativo */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Como funciona o sistema?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted">
                        Este sistema conecta <strong>clientes</strong> e <strong>profissionais autônomos</strong> de forma prática e eficiente.
                    </p>
                    <hr />
                    <h5 className="text-primary">👤 Cliente</h5>
                    <p className="small mb-3">
                        Você pode navegar pela lista de profissionais e agendar serviços conforme sua necessidade. Tudo é salvo no seu painel pessoal.
                    </p>
                    <h5 className="text-success">💼 Profissional</h5>
                    <p className="small">
                        Você terá uma área para visualizar seus agendamentos e controlar os horários disponíveis para seus clientes.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </motion.div>
    );
}

export default Home;
