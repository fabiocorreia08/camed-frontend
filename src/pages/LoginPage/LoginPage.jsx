import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/Login';

export default function LoginPage({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleEntrar = (email, senha) => {
    // Verifica credenciais fixas
    if (email === 'admin' && senha === '123456') {
      localStorage.setItem('auth', 'true');
      setIsAuthenticated(true);
      navigate('/home'); // ou qualquer rota protegida
    } else {
      alert('Usuário ou senha inválidos!');
    }
  };

  const handleCadastrar = () => {
    navigate('/register');
  };

  return (
    <Login onEntrar={handleEntrar} onCadastrar={handleCadastrar} />
  );
}