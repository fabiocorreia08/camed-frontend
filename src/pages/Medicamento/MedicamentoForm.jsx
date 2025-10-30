import React, { useEffect, useState } from 'react';
import './Medicamento.css';

// Verifica se o identificador já foi cadastrado
const identificadorDuplicado = (identificador, medicamentosExistentes, medicamentoSelecionado) => {
  const idNormalizado = identificador.trim().toLowerCase();
  return medicamentosExistentes.some(
    (m) =>
      m.identificador?.trim().toLowerCase() === idNormalizado &&
      (!medicamentoSelecionado || m.id !== medicamentoSelecionado.id)
  );
};

export default function MedicamentoForm({
  medicamentoSelecionado,
  medicamentosExistentes,
  onSave,
  onCancel,
}) {
  const [medicamento, setMedicamento] = useState({
    id: null,
    nome: '',
    identificador: '',
    quantidadeInicial: '',
    preco: '',
  });

  const [erroIdentificador, setErroIdentificador] = useState('');

  // Carrega dados do medicamento selecionado (edição)
  useEffect(() => {
    if (medicamentoSelecionado) {
      setMedicamento(medicamentoSelecionado);
    } else {
      setMedicamento({
        id: null,
        nome: '',
        identificador: '',
        quantidadeInicial: '',
        preco: '',
      });
    }
    setErroIdentificador('');
  }, [medicamentoSelecionado]);

  // Atualiza campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    const valorFormatado = name === 'nome' ? value.toUpperCase() : value;

    setMedicamento((prev) => ({
      ...prev,
      [name]: valorFormatado,
    }));

    if (name === 'identificador') {
      const duplicado = identificadorDuplicado(value, medicamentosExistentes, medicamentoSelecionado);
      setErroIdentificador(duplicado ? 'Identificador já cadastrado.' : '');
    }
  };

  // Submete o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (erroIdentificador) return;

    const medicamentoFormatado = {
      ...medicamento,
      nome: medicamento.nome.toUpperCase(),
      quantidadeDisponivel: medicamentoSelecionado
        ? medicamentoSelecionado.quantidadeDisponivel
        : medicamento.quantidadeInicial,
    };

    onSave(medicamentoFormatado);
  };

  return (
    <div className="form-container">
      <h2>{medicamentoSelecionado ? 'Editar Medicamento' : 'Novo Medicamento'}</h2>

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="form-group">
          <label>Nome:</label>
          <input
            name="nome"
            value={medicamento.nome}
            onChange={handleChange}
            required
          />
        </div>

        {/* Identificador */}
        <div className="form-group">
          <label>Identificador:</label>
          <input
            name="identificador"
            value={medicamento.identificador}
            onChange={handleChange}
            required
          />
          {erroIdentificador && (
            <span className="form-error">{erroIdentificador}</span>
          )}
        </div>

        {/* Quantidade Inicial */}
        <div className="form-group">
          <label>Quantidade Inicial (ml):</label>
          <input
            name="quantidadeInicial"
            type="number"
            step="0.01"
            min="0"
            value={medicamento.quantidadeInicial}
            onChange={handleChange}
            required
          />
        </div>

        {/* Preço */}
        <div className="form-group">
          <label>Preço (R$):</label>
          <input
            name="preco"
            type="number"
            step="0.01"
            min="0"
            value={medicamento.preco}
            onChange={handleChange}
            required
          />
        </div>

        {/* Estoque Disponível (somente na edição) */}
        {medicamentoSelecionado && (
          <div className="form-group">
            <label>Estoque Disponível (ml):</label>
            <input
              name="quantidadeDisponivel"
              type="number"
              value={medicamentoSelecionado.quantidadeDisponivel}
              readOnly
            />
          </div>
        )}

        {/* Ações */}
        <div className="form-botoes">          
          <button type="submit" className="novo-btn" disabled={!!erroIdentificador}>
            💾 {medicamentoSelecionado ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
          <button type="button" className="novo-btn" onClick={onCancel}>↩️ Cancelar</button>
        </div>
      </form>
    </div>
  );
}