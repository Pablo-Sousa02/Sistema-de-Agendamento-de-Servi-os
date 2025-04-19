import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Menu = () => {
    const { usuario, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!usuario) {
            navigate('/login');
        }
    }, [usuario, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!usuario) {
        return null; // Espera o useEffect redirecionar
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Sistema de Agendamento</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/agendamentos">Agendamentos</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={usuario.nome} id="basic-nav-dropdown" align="end">
                            <NavDropdown.Item as={Link} to="/editar-perfil">Editar Perfil</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/perfil">Visualizar Perfil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
