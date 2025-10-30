import React from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../../components/Register';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleCadastrar = (nome, email, senha) => {
    // Simulação de cadastro (você pode salvar em localStorage ou enviar para backend futuramente)
    console.log('Novo usuário:', { nome, email, senha });

    alert('Cadastro realizado com sucesso!');
    navigate('/login'); // redireciona para login após cadastro
  };

  const handleVoltar = () => {
    navigate('/login');
  };

  return (
    <Register onCadastrar={handleCadastrar} onVoltar={handleVoltar} />
  );
}