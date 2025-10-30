import { useState, useEffect } from 'react';
import './Medicamento.css';

export default function MedicamentoEditar({ medicamento, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    identificador: '',
    quantidadeInicial: '',
    preco: '',
    quantidadeDisponivel: 0
  });

  useEffect(() => {
    if (medicamento) {
      setFormData({
        nome: medicamento.nome || '',
        identificador: medicamento.identificador || '',
        quantidadeInicial: medicamento.quantidadeInicial || '',
        preco: medicamento.preco || '',
        quantidadeDisponivel: medicamento.quantidadeDisponivel || 0
      });
    }
  }, [medicamento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const medicamentoAtualizado = { ...medicamento, ...formData };
    onSave(medicamentoAtualizado);
  };

  return (
    <div className="medicamento-form-container">
      <h2>Editar Medicamento</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Medicamento:</label>
        <input
          id="nome"
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="identificador">Identificador:</label>
        <input
          id="identificador"
          type="text"
          name="identificador"
          value={formData.identificador}
          onChange={handleChange}
          required
        />

        <label htmlFor="quantidadeInicial">Quantidade Inicial (ml):</label>
        <input
          id="quantidadeInicial"
          type="number"
          name="quantidadeInicial"
          value={formData.quantidadeInicial}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />

        <label htmlFor="preco">Preço (R$):</label>
        <input
          id="preco"
          type="number"
          name="preco"
          value={formData.preco}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />

        <label htmlFor="quantidadeDisponivel">Estoque Atual (ml):</label>
        <input
          id="quantidadeDisponivel"
          type="number"
          name="quantidadeDisponivel"
          value={formData.quantidadeDisponivel}
          readOnly
        />

        <div className="form-actions">
          <button type="submit">Salvar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}