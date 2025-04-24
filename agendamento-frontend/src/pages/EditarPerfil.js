import React, { useState, useEffect } from "react";
import { Container, Form, Button, Image, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function EditarPerfil() {
    const { usuario, setUsuario } = useAuth();
    const [nome, setNome] = useState(usuario?.nome || "");
    const [email, setEmail] = useState(usuario?.email || "");
    const [foto, setFoto] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(usuario?.fotoPerfil || ""); // Foto atual do perfil
    const [loading, setLoading] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState(""); // Para armazenar a mensagem de sucesso

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };

    // Atualiza a foto de perfil quando o componente for montado ou quando o usuário mudar
    useEffect(() => {
        setFotoPerfil(usuario?.fotoPerfil || ""); // Atualiza a foto de perfil se o usuário for alterado
    }, [usuario]);

    const handleSalvar = async () => {
        setLoading(true); // Define loading como true
        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("nome", nome);
            formData.append("email", email);
            if (foto) formData.append("foto", foto);

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/usuarios/perfil`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // Atualiza a foto do perfil com o novo nome da foto retornado do backend
            if (response.data.usuario && response.data.usuario.fotoPerfil) {
                setUsuario(response.data.usuario);
                setFotoPerfil(response.data.usuario.fotoPerfil);
            }

            // Atualize o estado do usuário no contexto
            setUsuario(response.data.usuario); // Atualizando o estado global com o novo perfil

            setMensagemSucesso("Perfil atualizado com sucesso!"); // Exibe a mensagem de sucesso
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            setMensagemSucesso("Erro ao atualizar perfil."); // Exibe a mensagem de erro
        } finally {
            setLoading(false); // Desativa o loading
        }
    };

    return (
        <Container fluid className="p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-light p-5 rounded shadow-sm"
            >
                <h2 className="text-center mb-4 text-primary">Editar Perfil</h2>
                
                {/* Exibição da foto de perfil atual ou selecionada */}
                <div className="d-flex justify-content-center mb-4">
                    <Image
                        src={fotoPerfil ? `${process.env.REACT_APP_API_URL}/uploads/${fotoPerfil}` : '/default-avatar.png'}
                        roundedCircle
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                </div>

                {/* Exibição da mensagem de sucesso ou erro */}
                {mensagemSucesso && (
                    <Alert variant={mensagemSucesso === "Perfil atualizado com sucesso!" ? "success" : "danger"} className="mb-4">
                        {mensagemSucesso}
                    </Alert>
                )}

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite seu nome"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Foto de Perfil</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFotoChange}
                            className="form-control-file"
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button 
                            variant="primary" 
                            onClick={handleSalvar} 
                            disabled={loading}
                            className="w-50"
                        >
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                    </div>
                </Form>
            </motion.div>
        </Container>
    );
}

export default EditarPerfil;
