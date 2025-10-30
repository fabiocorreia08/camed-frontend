import React, { useState } from 'react';
import './Login.css';

export default function Login({ onEntrar, onCadastrar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    // Envia os dados para LoginPage.jsx
    onEntrar(email, senha);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Christiane Martins</h1>
        <p>Beleza, cosméticos e cuidados pessoais</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit" className="btn-entrar">Entrar</button>
        <button type="button" className="btn-cadastrar" onClick={onCadastrar}>Cadastrar</button>
      </form>
    </div>
  );
}