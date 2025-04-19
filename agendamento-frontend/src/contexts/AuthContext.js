import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function verificarUsuario() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/usuarios/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUsuario(response.data);
        } catch (error) {
          console.error('Não foi possível verificar o usuário', error);
          localStorage.removeItem('token'); // apaga token inválido
        }
      }
      setLoading(false);
    }

    verificarUsuario();
  }, []);

  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
