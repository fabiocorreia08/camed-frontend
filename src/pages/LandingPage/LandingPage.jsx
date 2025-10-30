import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-header">
        <h1>Christiane Martins</h1>
        <p>Beleza, cosméticos e cuidados pessoais</p>
      </div>

      <div className="landing-actions">
        <button className="btn-entrar" onClick={() => navigate('/login')}>Entrar</button>
        <button className="btn-cadastrar" onClick={() => navigate('/register')}>Cadastrar</button>
      </div>
    </div>
  );
}