import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const savedUser = localStorage.getItem('usuario');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (usuarioData, token) => {
        setUsuario(usuarioData);
        localStorage.setItem('usuario', JSON.stringify(usuarioData));  // Salva todos os dados do usuário, incluindo foto
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
    };

    const value = {
        usuario,
        setUsuario,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
