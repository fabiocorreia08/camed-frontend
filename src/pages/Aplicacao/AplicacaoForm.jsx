import React, { useState, useEffect } from 'react';
import './Aplicacao.css';

export default function AplicacaoForm({
  clientes = [],
  medicamentos = [],
  dadosIniciais,
  onSave,
  onCancel
}) {
  const [dados, setDados] = useState({
    clienteId: '',
    medicamentoId: '',
    dose: '',
    valorPago: '',
    data: '',
  });

  useEffect(() => {
    if (dadosIniciais) {
      setDados({
        clienteId: dadosIniciais.clienteId || '',
        medicamentoId: dadosIniciais.medicamentoId || '',
        dose: dadosIniciais.dose || '',
        valorPago: dadosIniciais.valorPago || '',
        data: dadosIniciais.data?.slice(0, 10) || '', // ISO format
      });
    }
  }, [dadosIniciais]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(dados);
  };

  const medicamentoSelecionado = medicamentos.find(
    m => String(m.id) === String(dados.medicamentoId)
  );

  return (
    <div className="aplicacao-form-container">
      <h2>{dadosIniciais ? 'Editar Aplicação' : 'Nova Aplicação'}</h2>

      <form onSubmit={handleSubmit} className="form-aplicacao">
        <label>Cliente:</label>
        <select
          name="clienteId"
          value={dados.clienteId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>

        <label>Medicamento:</label>
        <select
          name="medicamentoId"
          value={dados.medicamentoId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione</option>
          {medicamentos.map(medicamento => (
            <option key={medicamento.id} value={medicamento.id}>
              {medicamento.nome}
            </option>
          ))}
        </select>

        {medicamentoSelecionado && (
          <p>
            <strong>Identificador:</strong> {medicamentoSelecionado.identificador}
          </p>
        )}

        <label>Dose Aplicada (ml):</label>
        <input
          type="number"
          name="dose"
          value={dados.dose}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />

        <label>Valor Pago (R$):</label>
        <input
          type="number"
          name="valorPago"
          value={dados.valorPago}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />

        <label>Data da Aplicação:</label>
        <input
          type="date"
          name="data"
          value={dados.data}
          onChange={handleChange}
          required
        />

        <div className="form-botoes">
          <button type="submit" className="novo-btn">💾 Salvar Aplicação</button>
          <button type="button" className="novo-btn" onClick={onCancel}>↩️ Cancelar</button>
        </div>
      </form>
    </div>
  );
}