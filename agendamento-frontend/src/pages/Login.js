import { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !senha) {
            setError("Preencha todos os campos!");
            return;
        }

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

            // Verifique se a resposta foi recebida corretamente
            console.log('Resposta da API:', response);

            const { token, usuario } = response.data;

            // Exibindo o token no console
            console.log('Token:', token);

            localStorage.setItem('token', token);  // Salvando o token no localStorage
            login(usuario);  // Salvando o usuário no contexto
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;  // Configura o axios para usar o token nas futuras requisições

            navigate('/');  // Redireciona para a página inicial
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
            {error && <Alert variant="danger">{error}</Alert>}
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
                        {loading ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                </div>
            </Form>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-center mt-3">
                    Não tem uma conta?{' '}
                    <a href="/cadastro">Cadastre-se aqui</a>
                </p>
            </motion.div>
        </Container>
    );
}

export default Login;
