import React, { useState, } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const PerfilMenu = () => {
    const { usuario, logout } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false); // Controla a exibição do modal de confirmação

    const handleConfirmDelete = async () => {
        try {
            // Enviar a requisição DELETE para o backend para excluir o perfil
            const response = await api.delete('/usuarios/perfil', {
                data: { userId: usuario._id }
            });
            alert(response.data.mensagem);
            logout(); // Logout após a exclusão
        } catch (error) {
            console.error("Erro ao excluir perfil:", error);
            alert('Erro ao excluir perfil');
        }
    };

    const handleShowConfirm = () => setShowConfirm(true);
    const handleCloseConfirm = () => setShowConfirm(false);

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Perfil
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/editar-perfil">Editar Perfil</Dropdown.Item>
                    <Dropdown.Item onClick={handleShowConfirm}>Excluir Perfil</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Modal de confirmação para excluir perfil */}
            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Você tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PerfilMenu;
