    import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
    import { Link, useNavigate } from 'react-router-dom';
    import { useState } from 'react';
    import { useAuth } from '../contexts/AuthContext';
    import { motion, AnimatePresence } from 'framer-motion';

    function NavigationBar() {
    const { usuario, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setShowModal(false); // Fecha o modal
        await new Promise(resolve => setTimeout(resolve, 300)); // Espera a animação terminar
        logout();
        navigate('/');
    };

    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand as={Link} to="/">AgendaPro</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                {usuario ? (
                    <>
                    <Nav.Link as={Link} to="/">Início</Nav.Link>
                    {usuario.tipo === "cliente" && (
                        <Nav.Link as={Link} to="/agendamentos">Agendar</Nav.Link>
                    )}
                    {usuario.tipo === "profissional" && (
                        <Nav.Link as={Link} to="/meus-agendamentos">Meus Agendamentos</Nav.Link>
                    )}
                    {usuario.tipo === "cliente" ||  (
                        <Nav.Link as={Link} to="/editar-perfil">Meu Perfil</Nav.Link>
                    )}
                    <Button variant="outline-danger" onClick={() => setShowModal(true)}>Sair</Button>
                    </>
                ) : (
                    <>
                    <Nav.Link as={Link} to="/">Início</Nav.Link>
                    </>
                )}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        {/* Modal dentro do NavigationBar */}
        <AnimatePresence>
            {showModal && (
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-fade"
            >
                <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar saída</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja sair?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                    Sair
                    </Button>
                </Modal.Footer>
                </motion.div>
            </Modal>
            )}
        </AnimatePresence>
        </>
    );
    }

    export default NavigationBar;
