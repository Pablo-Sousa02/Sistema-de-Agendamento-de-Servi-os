    import React, { useState } from "react";
    import { Container, Form, Button } from "react-bootstrap";
    import { motion } from "framer-motion";
    import { useAuth } from "../contexts/AuthContext";
    import axios from "axios";

    function EditarPerfil() {
    const { usuario } = useAuth();
    const [nome, setNome] = useState(usuario?.nome || "");
    const [email, setEmail] = useState(usuario?.email || "");

    const handleSalvar = async () => {
        try {
        const token = localStorage.getItem("token");
        await axios.put(
            "/api/usuarios/editar",
            { nome, email },
            {
            headers: { Authorization: `Bearer ${token}` }
            }
        );
        alert("Perfil atualizado com sucesso!");
        } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        alert("Erro ao atualizar perfil.");
        }
    };

    return (
        <Container className="mt-5">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-center mb-4">Editar Perfil</h2>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={handleSalvar}>
                Salvar Alterações
                </Button>
            </div>
            </Form>
        </motion.div>
        </Container>
    );
    }

    export default EditarPerfil;
