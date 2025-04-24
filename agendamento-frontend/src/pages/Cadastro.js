import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('cliente');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aguarde a resposta da requisição
      await axios.post(`${process.env.REACT_APP_API_URL}/api/usuarios/cadastrar`, { nome, email, senha, tipo });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      // Caso haja erro, exibe o erro
      alert('Erro ao cadastrar: ' + error.message);
    }
  };

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Cadastro</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={nome} onChange={e => setNome(e.target.value)} required placeholder='Insira o nome de sua empresa' />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder='user@gmail.com'/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" value={senha} onChange={e => setSenha(e.target.value)} required placeholder='Insira sua senha'/>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Tipo</Form.Label>
            <Form.Select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="cliente">Cliente</option>
              <option value="profissional">Profissional</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="success" className="w-100">Cadastrar</Button>
        </Form>

        {/* Botão para redirecionar para a página de login */}
        <div className="mt-3 text-center">
          <Button variant="link" onClick={handleRedirectToLogin}>
            Já tem uma conta? Faça login aqui.
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default Cadastro;
