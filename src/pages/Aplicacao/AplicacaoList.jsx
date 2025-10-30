import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import './Aplicacao.css';

export default function AplicacaoList({
  aplicacoes,
  clientes,
  medicamentos,
  onEdit,
  onDelete,
  onView,
  onAdd,
}) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const totalPaginas = Math.ceil(aplicacoes.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const aplicacoesPaginadas = aplicacoes.slice(inicio, fim);

  const getNomeCliente = (id) => {
    const cliente = clientes.find((c) => c.id === id);
    return cliente ? cliente.nome : '—';
  };

  const getNomeMedicamento = (id) => {
    const medicamento = medicamentos.find((m) => m.id === id);
    return medicamento ? medicamento.nome : '—';
  };

  return (
    <div className="aplicacao-list-container">
      <div className="aplicacao-header">
        <h2>Aplicações</h2>
        <button className="novo-btn" onClick={onAdd}>+ Nova Aplicação</button>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela-aplicacoes">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Medicamento</th>
              <th>Dose Aplicada (ml)</th>
              <th>Valor Pago (R$)</th>
              <th>Data Aplicação</th>
              <th>Qtd. Disponível após Aplicação (ml)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {aplicacoesPaginadas.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  Nenhuma aplicação registrada.
                </td>
              </tr>
            ) : (
              aplicacoesPaginadas.map((aplicacao) => (
                <tr key={aplicacao.id}>
                  <td>{getNomeCliente(aplicacao.clienteId)}</td>
                  <td>{getNomeMedicamento(aplicacao.medicamentoId)}</td>
                  <td>{aplicacao.dose}</td>
                  <td>{aplicacao.valorPago?.toFixed(2)}</td>
                  <td>{new Date(aplicacao.data).toLocaleDateString()}</td>
                  <td>{aplicacao.quantidadeDisponivelAposAplicacao}</td>
                  <td className="acoes">
                    <button title="Visualizar" onClick={() => onView(aplicacao)}>🔍</button>
                    <button title="Editar" onClick={() => onEdit(aplicacao)}>✏️</button>
                    <button title="Excluir" onClick={() => onDelete(aplicacao.id)}>🗑️</button>
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