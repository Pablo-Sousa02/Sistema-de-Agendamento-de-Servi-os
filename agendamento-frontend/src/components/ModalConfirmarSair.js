import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalConfirmarSair({ show, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Saída</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza que deseja sair?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Sair
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmarSair;
