import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import './Cliente.css';

export default function ClienteList({ clientes = [], onEdit, onDelete, onView, onAdd }) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const clientesValidos = Array.isArray(clientes) ? clientes : [];
  const totalPaginas = Math.ceil(clientesValidos.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const clientesPaginados = clientesValidos.slice(indiceInicial, indiceFinal);

  const formatarData = (data) => {
    if (!data) return '—';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="cliente-list-container">
      <div className="cliente-header">
        <h2>Clientes</h2>
        <button className="novo-btn" onClick={onAdd}>+ Novo Cliente</button>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela-clientes">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Idade</th>
              <th>Altura (cm)</th>
              <th>Peso (kg)</th>
              <th>Data de Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesPaginados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            ) : (
              clientesPaginados.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.idade}</td>
                  <td>{cliente.altura}</td>
                  <td>{cliente.peso}</td>
                  <td>{formatarData(cliente.dataCadastro)}</td>
                  <td className="acoes">
                    <button title="Visualizar" onClick={() => onView(cliente)}>🔍</button>
                    <button title="Editar" onClick={() => onEdit(cliente)}>✏️</button>
                    <button title="Excluir" onClick={() => onDelete(cliente.id)}>🗑️</button>
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