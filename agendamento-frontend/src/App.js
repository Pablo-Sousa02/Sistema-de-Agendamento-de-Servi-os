import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Agendamento from './components/Agendamentos.js';
import MeusAgendamentos from './components/MeusAgendamentos';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Sistema de Agendamento</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Login</Nav.Link>
            <Nav.Link as={Link} to="/cadastro">Cadastro</Nav.Link>
            <Nav.Link as={Link} to="/agendamento">Agendar</Nav.Link>
            <Nav.Link as={Link} to="/meus-agendamentos">Meus Agendamentos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;