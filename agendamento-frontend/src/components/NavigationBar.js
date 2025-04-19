    import { Navbar, Nav, Container, Button } from 'react-bootstrap';
    import { Link, useNavigate } from 'react-router-dom';
    import { useState } from 'react';
    import { useAuth } from '../contexts/AuthContext';
    import ModalConfirmarSair from './ModalConfirmarSair';


    function NavigationBar() {
    const { usuario, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand as={Link} to="/">Sistema de Agendamento</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                {usuario ? (
                    <>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {usuario.tipo === "cliente" && (
                        <Nav.Link as={Link} to="/agendamentos">Agendar</Nav.Link>
                    )}
                    {usuario.tipo === "profissional" && (
                        <Nav.Link as={Link} to="/meus-agendamentos">Meus Agendamentos</Nav.Link>
                    )}
                    <Button variant="outline-danger" onClick={() => setShowModal(true)}>Sair</Button>
                    </>
                ) : (
                    <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/cadastro">Cadastro</Nav.Link>
                    </>
                )}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        <ModalConfirmarSair show={showModal} onClose={() => setShowModal(false)} onConfirm={handleLogout} />
        </>
    );
    }

    export default NavigationBar;
