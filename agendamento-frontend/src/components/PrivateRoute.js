    import { Navigate } from 'react-router-dom';
    import { useContext } from 'react';
    import { AuthContext } from '../contexts/AuthContext';

    const PrivateRoute = ({ children }) => {
    const { usuario } = useContext(AuthContext);

    if (!usuario) {
        return <Navigate to="/login" />;  // Redireciona para login se não houver usuário
    }

    return children;
    };

    export default PrivateRoute;
