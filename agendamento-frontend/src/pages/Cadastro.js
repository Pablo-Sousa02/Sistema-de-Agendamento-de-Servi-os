import { useState } from 'react';
import {
  Form,
  Button,
  Container,
  Card,
  Modal,
  Row,
  Col
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('cliente');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/usuarios/cadastrar`, {
        nome, email, senha, tipo
      });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert('Erro ao cadastrar: ' + error.message);
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Card className="p-4 shadow-lg border-0" style={{ width: '24rem' }}>
          <h2 className="text-center mb-4 text-success fw-bold">Cadastro</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Insira o nome de sua empresa"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@gmail.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Insira sua senha"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Tipo</Form.Label>
              <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="cliente">Cliente</option>
                <option value="profissional">Profissional</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              Cadastrar
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <Button variant="link" onClick={() => navigate('/login')}>
              Já tem uma conta? Faça login aqui.
            </Button>
          </div>

          <div className="text-center mt-2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setShowModal(true)}
            >
              Como funciona?
            </Button>
          </div>
        </Card>
      </Container>

      {/* Modal explicativo */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Como funciona o sistema?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col xs={12}>
              <p className="text-muted">
                Nosso sistema foi feito para conectar <strong>profissionais autônomos</strong> e <strong>clientes</strong> de forma prática e organizada.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <h5 className="text-primary">
                <i className="bi bi-briefcase-fill me-2"></i>Sou Profissional
              </h5>
              <p className="small">
                Se você deseja <strong>gerenciar sua agenda de serviços</strong>, receber agendamentos e manter o controle dos horários, selecione <strong>Profissional</strong> como tipo de conta.
              </p>
            </Col>
            <Col md={6}>
              <h5 className="text-success">
                <i className="bi bi-person-heart me-2"></i>Sou Cliente
              </h5>
              <p className="small">
                Se você busca <strong>contratar serviços</strong> de profissionais e acompanhar seus agendamentos, selecione <strong>Cliente</strong> como tipo de conta.
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cadastro;
