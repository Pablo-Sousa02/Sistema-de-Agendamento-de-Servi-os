    import React, { useEffect, useState } from "react";
    import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
    Alert,
    Modal,
    Form,
    } from "react-bootstrap";
    import { useNavigate } from "react-router-dom";
    import { motion } from "framer-motion";
    import api from "../services/api";
    import { jwtDecode } from "jwt-decode";

    function Agendamentos() {
    const navigate = useNavigate();
    const [profissionais, setProfissionais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedProfissional, setSelectedProfissional] = useState(null);
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [dia, setDia] = useState("");
    const [servico, setServico] = useState("");

    const [sucessoAgendamento, setSucessoAgendamento] = useState(false);

    useEffect(() => {
        const fetchProfissionais = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); // Redireciona para o login se não estiver logado
            return;
        }
        try {
            const response = await api.get(`${process.env.REACT_APP_API_URL}/api/usuarios/profissionais`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
            setProfissionais(response.data);
        } catch (error) {
            console.error("Erro ao buscar profissionais:", error);
            setErro("Erro ao carregar profissionais. Faça login novamente.");
        } finally {
            setLoading(false);
        }
        };

        fetchProfissionais();
    }, [navigate]);

    const handleAgendar = (profissional) => {
        setSelectedProfissional(profissional);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setData("");
        setHora("");
        setDia("");
        setServico("");
    };

    const handleConfirmarAgendamento = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
        setErro("Você precisa estar logado para agendar um serviço.");
        return; // Não prosseguir sem o token
        }

        try {
        const decodedToken = jwtDecode(token); // Decodificando o token para obter o ID do cliente
        const clienteId = decodedToken.id;

        const response = await api.post(
            `${process.env.REACT_APP_API_URL}/api/agendamentos`, // URL da API em produção
            {
                cliente: clienteId, // Usando o ID do cliente do token
                profissional: selectedProfissional._id,
                servico,
                data,
                hora,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        console.log("Agendamento confirmado:", response.data);
        setSucessoAgendamento(true);
        setTimeout(() => setSucessoAgendamento(false), 3000); // Mensagem desaparece após 3 segundos
        handleCloseModal();
        } catch (error) {
        console.error("Erro ao agendar:", error);
        }
    };

    if (loading) {
        return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
        </Container>
        );
    }

    if (erro) {
        return (
        <Container className="mt-5">
            <Alert variant="danger" className="text-center">
            {erro}
            </Alert>
        </Container>
        );
    }

    if (profissionais.length === 0) {
        return (
        <Container className="mt-5 text-center">
            <h3 className="mb-3">Nenhum profissional disponível no momento.</h3>
            <Button variant="primary" onClick={() => navigate("/")}>
            Voltar para o início
            </Button>
        </Container>
        );
    }

    return (
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
        >
        <Container className="mt-5">
            {sucessoAgendamento && (
            <Alert variant="success" className="text-center">
                Agendamento realizado com sucesso!
            </Alert>
            )}
            <h2 className="text-center mb-4">Escolha um Profissional para Agendar</h2>
            <Row className="g-4">
            {profissionais.map((profissional) => (
                <Col key={profissional._id} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm">
                    <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-primary">
                        {profissional.nome}
                    </Card.Title>
                    <Card.Text>Email: {profissional.email}</Card.Text>
                    <Button
                        variant="success"
                        className="mt-auto"
                        onClick={() => handleAgendar(profissional)}
                    >
                        Agendar com {profissional.nome}
                    </Button>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agendar com {selectedProfissional?.nome}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Hora</Form.Label>
                    <Form.Control
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Dia</Form.Label>
                    <Form.Control
                    type="text"
                    value={dia}
                    onChange={(e) => setDia(e.target.value)}
                    placeholder="Exemplo: Segunda-feira"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Serviço</Form.Label>
                    <Form.Control
                    as="textarea"
                    value={servico}
                    onChange={(e) => setServico(e.target.value)}
                    placeholder="Descrição do serviço"
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleConfirmarAgendamento}>
                    Confirmar Agendamento
                </Button>
                </Form>
            </Modal.Body>
            </Modal>
        </Container>
        </motion.div>
    );
    }

    export default Agendamentos;
