import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import './Medicamento.css';

export default function MedicamentoList({ medicamentos, onAdd, onEdit, onDelete, onView }) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const totalPaginas = Math.ceil(medicamentos.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const medicamentosPaginados = medicamentos.slice(inicio, fim);

  return (
    <div className="medicamento-list-container">
      <div className="medicamento-header">
        <h2>Medicamentos</h2>
        <button className="novo-btn" onClick={onAdd}>+ Novo Medicamento</button>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela-medicamentos">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Identificador</th>
              <th>Preço (R$)</th>
              <th>Qtd. Inicial (ml)</th>
              <th>Qtd. Disponível (ml)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {medicamentosPaginados.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  Nenhum medicamento cadastrado.
                </td>
              </tr>
            ) : (
              medicamentosPaginados.map((medicamento) => (
                <tr key={medicamento.id}>
                  <td>{medicamento.nome}</td>
                  <td>{medicamento.identificador}</td>
                  <td>R$ {Number(medicamento.preco).toFixed(2)}</td>
                  <td>{medicamento.quantidadeInicial}</td>
                  <td>{medicamento.quantidadeDisponivel}</td>
                  <td className="acoes">
                    <button title="Visualizar" onClick={() => onView(medicamento)}>🔍</button>
                    <button title="Editar" onClick={() => onEdit(medicamento)}>✏️</button>
                    <button title="Excluir" onClick={() => onDelete(medicamento.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <div className="paginacao-mui">
          <Pagination
            count={totalPaginas}
            page={paginaAtual}
            onChange={(event, value) => setPaginaAtual(value)}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </div>
      )}
    </div>
  );
}