import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios'; // Importando Axios para fazer requisições HTTP

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Estado para mensagens de erro

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Limpa mensagens de erro anteriores

        if (!email || !senha) {
            setError("Preencha todos os campos!");
            return;
        }

        // Validação simples de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Digite um email válido!");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/usuarios/login',
                { email, senha },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const { token, usuario } = response.data;
            localStorage.setItem('token', token); // Armazena o token
            login(usuario); // Atualiza o contexto de autenticação
            navigate('/'); // Redireciona para a página inicial
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            if (error.response && error.response.status === 400) {
                setError('Email ou senha incorretos!');
            } else {
                setError('Erro no servidor. Tente novamente mais tarde.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>} {/* Exibe mensagens de erro */}
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite sua senha"
                    />
                </Form.Group>

                <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Login;