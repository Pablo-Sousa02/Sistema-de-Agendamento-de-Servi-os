import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/usuarios/login", {
        email,
        senha,
      });
      localStorage.setItem("token", res.data.token);
      setMensagem("Login realizado com sucesso!");
      // Redireciona
      window.location.href = "/agendamentos";
    } catch (err) {
      setMensagem("Erro ao fazer login");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <form onSubmit={handleLogin}>
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
        <button className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
