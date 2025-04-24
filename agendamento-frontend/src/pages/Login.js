import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/usuarios/login`, { email, senha });
            const usuarioData = response.data.usuario;
            const token = response.data.token;

            // Salva a foto de perfil junto com o usuário e o token
            localStorage.setItem('authToken', token);
            localStorage.setItem('usuario', JSON.stringify(usuarioData));  // Salva o usuário no localStorage

            login(usuarioData, token);  // Salva o usuário no contexto e no localStorage

            setSucesso('Login realizado com sucesso!');
            setTimeout(() => {
                navigate('/');  // Redireciona para a página inicial após o login
            }, 2000);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setErro('Erro ao fazer login: ' + error.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow" style={{ width: '24rem' }}>
                <h2 className="text-center mb-4">Login</h2>
                {sucesso && <div className="alert alert-success">{sucesso}</div>}
                {erro && <div className="alert alert-danger">{erro}</div>}
                <Form onSubmit={handleSubmit}>
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
                    <Button type="submit" variant="success" className="w-100">
                        Login
                    </Button>
                </Form>

                <div className="mt-3 text-center">
                    <Button variant="link" onClick={() => navigate('/cadastro')}>
                        Não tem uma conta? Cadastre-se aqui.
                    </Button>
                </div>
            </Card>
        </Container>
    );
}

export default Login;
