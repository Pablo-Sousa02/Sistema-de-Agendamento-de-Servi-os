import { Navbar, Nav, Container, Button, Modal, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

function NavigationBar() {
    const { usuario, logout } = useAuth();
    const [showProfileModal, setShowProfileModal] = useState(false); // Controla o estado do modal de perfil
    const navigate = useNavigate();

    const handleLogout = async () => {
        setShowProfileModal(false); // Fecha o modal de perfil
        await new Promise(resolve => setTimeout(resolve, 300)); // Espera a animação terminar
        logout();
        navigate('/');
    };

    const handleEditProfile = () => {
        setShowProfileModal(false); // Fecha o modal de perfil
        navigate('/editar-perfil'); // Redireciona para editar perfil
    };

    const handleAgendar = () => {
        setShowProfileModal(false); // Fecha o modal de perfil
        navigate('/agendamentos'); // Redireciona para a página de agendamentos
    };

    const handleMeusAgendamentos = () => {
        setShowProfileModal(false); // Fecha o modal de perfil
        navigate('/meus-agendamentos'); // Redireciona para a página de "Meus Agendamentos"
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
                                    <Nav.Link className="d-flex align-items-center" onClick={() => setShowProfileModal(true)}>
                                        <Image
                                            src={usuario?.fotoPerfil ? `http://localhost:5000/uploads/${usuario.fotoPerfil}` : '/default-avatar.png'} // Foto de perfil ou avatar padrão
                                            alt="Foto de Perfil"
                                            roundedCircle
                                            style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                                        />
                                    </Nav.Link>
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

            {/* Modal de Perfil */}
            <AnimatePresence>
                {showProfileModal && (
                    <Modal
                        show={showProfileModal}
                        onHide={() => setShowProfileModal(false)}
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
                                <Modal.Title>Opções de Perfil</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {/* Mostrar o botão Agendar apenas se o tipo for cliente */}
                                {usuario.tipo === "cliente" && (
                                    <Button variant="secondary" onClick={handleAgendar} className="w-100 mb-2">
                                        Agendar
                                    </Button>
                                )}
                                
                                {/* Mostrar o botão Meus Agendamentos apenas se o tipo for profissional */}
                                {usuario.tipo === "profissional" && (
                                    <Button variant="secondary" onClick={handleMeusAgendamentos} className="w-100 mb-2">
                                        Meus Agendamentos
                                    </Button>
                                )}

                                {/* Mostrar o botão Editar Perfil */}
                                <Button variant="secondary" onClick={handleEditProfile} className="w-100 mb-2">
                                    Editar Perfil
                                </Button>

                                {/* Botão "Sair" */}
                                <Button variant="danger" onClick={handleLogout} className="w-100">
                                    Sair
                                </Button>
                            </Modal.Body>
                        </motion.div>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
}

export default NavigationBar;
