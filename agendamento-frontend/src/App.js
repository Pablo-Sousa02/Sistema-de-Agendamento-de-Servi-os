import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NavigationBar from './components/NavigationBar';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Agendamentos from './pages/Agendamentos';
import MeusAgendamentos from './pages/MeusAgendamentos';
import EditarPerfil from './pages/EditarPerfil';
import PerfilMenu from './pages/PerfilMenu';

import { AnimatePresence, motion } from 'framer-motion';
import PrivateRoute from './components/PrivateRoute';  // Importando a PrivateRoute

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/cadastro"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Cadastro />
            </motion.div>
          }
        />
        {/* Protegendo as rotas abaixo */}
        <Route
          path="/agendamentos"
          element={
            <PrivateRoute>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Agendamentos />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/meus-agendamentos"
          element={
            <PrivateRoute>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MeusAgendamentos />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-perfil"
          element={
            <PrivateRoute>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <EditarPerfil />
              </motion.div>
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil-menu"
          element={
            <PrivateRoute>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PerfilMenu />
              </motion.div>
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
