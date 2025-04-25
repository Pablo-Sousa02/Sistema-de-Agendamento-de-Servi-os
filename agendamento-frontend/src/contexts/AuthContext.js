    import { createContext, useState, useContext } from 'react';

    export const AuthContext = createContext();  // Exporte o AuthContext

    export function useAuth() {
    return useContext(AuthContext);
    }

    export function AuthProvider({ children }) {
    // Verifica se há um usuário salvo no localStorage ao iniciar
    const [usuario, setUsuario] = useState(() => {
        const savedUser = localStorage.getItem('usuario');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Função para login
    const login = (usuarioData, token) => {
        setUsuario(usuarioData);
        localStorage.setItem('usuario', JSON.stringify(usuarioData));  // Salva o usuário no localStorage
        localStorage.setItem('token', token);  // Salva o token no localStorage
    };

    // Função para logout
    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
    };

    const value = {
        usuario,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }
