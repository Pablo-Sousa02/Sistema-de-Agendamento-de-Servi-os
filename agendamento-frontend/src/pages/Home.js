    import { Container, Button, Row, Col, Card } from 'react-bootstrap';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '../contexts/AuthContext';
    import homeImage from '../assets/agenda.svg'; // Sua imagem

    function Home() {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    return (
        <Container className="mt-5">
        {usuario ? (
            <div className="text-center">
            <h2>Bem-vindo, {usuario.nome}!</h2>
            <p>Utilize o menu para navegar pelo sistema.</p>
            </div>
        ) : (
            <Row className="align-items-center">
            <Col md={6}>
                <h1 className="display-4 mb-4">Organize seus agendamentos com facilidade!</h1>
                <p className="lead mb-4">Crie uma conta ou faça login para começar a utilizar nosso sistema.</p>
                <div className="d-flex gap-2 justify-content-center">
                <Button variant="primary" onClick={() => navigate('/login')} size="lg">Login</Button>
                <Button variant="success" onClick={() => navigate('/cadastro')} size="lg">Cadastro</Button>
                </div>
            </Col>
            <Col md={6}>
                <Card className="shadow-lg">
                <Card.Body className="p-4">
                    <img src={homeImage} alt="Agendamento" className="img-fluid rounded shadow" />
                </Card.Body>
                </Card>
            </Col>
            </Row>
        )}
        </Container>
    );
    }

    export default Home;
