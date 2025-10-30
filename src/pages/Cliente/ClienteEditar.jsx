import React, { useState, useEffect } from 'react';
import './Medicamento.css'; // Ou use './Cliente.css' se tiver estilos separados

export default function ClienteEditar({ cliente, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    idade: '',
    altura: '',
    dataCadastro: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome || '',
        telefone: cliente.telefone || '',
        idade: cliente.idade || '',
        altura: cliente.altura || '',
        dataCadastro: cliente.dataCadastro || ''
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteAtualizado = {
      ...cliente,
      ...formData
    };
    onSave(clienteAtualizado);
  };

  return (
    <div className="medicamento-form-container">
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Idade:
          <input
            type="number"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Altura (cm):
          <input
            type="number"
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Data de Cadastro:
          <input
            type="date"
            name="dataCadastro"
            value={formData.dataCadastro}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit">Salvar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}