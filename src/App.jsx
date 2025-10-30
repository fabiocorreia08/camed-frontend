import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Home from './pages/Home/Home';
import MedicamentoPage from './pages/Medicamento/MedicamentoPage';
import ClientePage from './pages/Cliente/ClientePage';
import ProtectedLayout from './components/ProtectedLayout';
import NotFound from './components/NotFound';
import AplicacaoPage from './pages/Aplicacao/AplicacaoPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') === 'true'
  );

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    localStorage.setItem('auth', 'true');
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage setIsAuthenticated={handleLogin} />} />
      <Route path="/login" element={<LoginPage setIsAuthenticated={handleLogin} />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Layout protegido com Navbar e rotas internas */}
      <Route
        element={
          <ProtectedLayout
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/medicamentos" element={<MedicamentoPage />} />
        <Route path="/clientes" element={<ClientePage />} />
        <Route path="/aplicacoes" element={<AplicacaoPage />} />        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;