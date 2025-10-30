import React, { useState } from 'react';
import './Register.css';

export default function Register({ onCadastrar, onVoltar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    // Aqui você pode enviar os dados para o backend ou Firebase
    console.log({ nome, email, senha });

    onCadastrar(); // redireciona após cadastro
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>Christiane Martins</h1>
        <p>Crie sua conta para começar</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit" className="btn-cadastrar">Cadastrar</button>
        <button type="button" className="btn-voltar" onClick={onVoltar}>Voltar</button>
      </form>
    </div>
  );
}