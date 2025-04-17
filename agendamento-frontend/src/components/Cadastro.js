import React, { useState } from "react";
import axios from "axios";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("cliente");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/usuarios/cadastrar", {
        nome,
        email,
        senha,
        tipo,
      });
      setMensagem("Usuário cadastrado com sucesso!");
    } catch (err) {
      setMensagem("Erro ao cadastrar o usuário");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro</h2>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <form onSubmit={handleCadastro}>
        <div className="mb-3">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Senha</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Tipo</label>
          <select
            className="form-control"
            onChange={(e) => setTipo(e.target.value)}
            value={tipo}
          >
            <option value="cliente">Cliente</option>
            <option value="profissional">Profissional</option>
          </select>
        </div>
        <button className="btn btn-success">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
