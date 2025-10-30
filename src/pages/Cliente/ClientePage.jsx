import React, { useEffect, useState } from 'react';
import ClienteList from './ClienteList';
import ClienteForm from './ClienteForm';
import ClienteDetalhar from './ClienteDetalhar';
import {
  buscarClientes,
  excluirCliente,
  cadastrarCliente,
  atualizarCliente,
} from '../../services/clienteService';

export default function ClientePage() {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modo, setModo] = useState('lista'); // 'lista', 'form', 'detalhar'

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const lista = await buscarClientes();
      setClientes(lista);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const iniciarCadastro = () => {
    setClienteSelecionado(null);
    setModo('form');
  };

  const iniciarEdicao = (cliente) => {
    setClienteSelecionado(cliente);
    setModo('form');
  };

  const iniciarDetalhamento = (cliente) => {
    setClienteSelecionado(cliente);
    setModo('detalhar');
  };

  const excluirClienteSelecionado = async (id) => {
    try {
      await excluirCliente(id);
      await carregarClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const salvarCliente = async (cliente) => {
    try {
      if (clienteSelecionado) {
        // Preserva a data original de cadastro
        const clienteAtualizado = {
          ...cliente,
          dataCadastro: clienteSelecionado.dataCadastro,
        };
        await atualizarCliente(clienteAtualizado);
      } else {
        await cadastrarCliente(cliente);
      }
      await carregarClientes();
      setModo('lista');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const cancelar = () => {
    setClienteSelecionado(null);
    setModo('lista');
  };

  return (
    <>
      {modo === 'lista' && (
        <ClienteList
          clientes={clientes}
          onAdd={iniciarCadastro}
          onEdit={iniciarEdicao}
          onDelete={excluirClienteSelecionado}
          onView={iniciarDetalhamento}
        />
      )}

      {modo === 'form' && (
        <ClienteForm
          clienteSelecionado={clienteSelecionado}
          clientesExistentes={clientes}
          onSave={salvarCliente}
          onCancel={cancelar}
        />
      )}

      {modo === 'detalhar' && (
        <ClienteDetalhar
          cliente={clienteSelecionado}
          onVoltar={cancelar}
        />
      )}
    </>
  );
}