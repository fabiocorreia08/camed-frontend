import React, { useState, useEffect } from 'react';
import './Aplicacao.css';

export default function AplicacaoEditar({ aplicacao, clientes, medicamentos, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    clienteId: '',
    medicamentoId: '',
    dose: '',
    valorPago: '',
    data: '',
  });

  useEffect(() => {
    if (aplicacao) {
      setFormData({
        clienteId: aplicacao.clienteId,
        medicamentoId: aplicacao.medicamentoId,
        dose: aplicacao.dose,
        valorPago: aplicacao.valorPago,
        data: aplicacao.data,
      });
    }
  }, [aplicacao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: aplicacao.id });
  };

  return (
    <div className="aplicacao-form-container">
      <h2>Editar Aplicação</h2>
      <form onSubmit={handleSubmit} className="aplicacao-form">
        <label>
          Cliente:
          <select name="clienteId" value={formData.clienteId} onChange={handleChange} required>
            <option value="">Selecione</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Medicamento:
          <select name="medicamentoId" value={formData.medicamentoId} onChange={handleChange} required>
            <option value="">Selecione</option>
            {medicamentos.map((medicamento) => (
              <option key={medicamento.id} value={medicamento.id}>
                {medicamento.nome} ({medicamento.identificador})
              </option>
            ))}
          </select>
        </label>

        <label>
          Dose aplicada (ml):
          <input type="number" name="dose" value={formData.dose} onChange={handleChange} step="0.1" required />
        </label>

        <label>
          Valor pago (R$):
          <input type="number" name="valorPago" value={formData.valorPago} onChange={handleChange} required />
        </label>

        <label>
          Data da aplicação:
          <input type="date" name="data" value={formData.data} onChange={handleChange} required />
        </label>

        <div className="form-actions">
          <button type="submit">💾 Salvar</button>
          <button type="button" onClick={onCancel}>❌ Cancelar</button>
        </div>
      </form>
    </div>
  );
}