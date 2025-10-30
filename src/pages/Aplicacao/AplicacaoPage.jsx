import React, { useState, useEffect } from 'react';
import AplicacaoList from './AplicacaoList';
import AplicacaoForm from './AplicacaoForm';
import AplicacaoDetalhar from './AplicacaoDetalhar';

import {
  buscarAplicacoes,
  cadastrarAplicacao,
  atualizarAplicacao,
  excluirAplicacao
} from '../../services/aplicacaoService';

import { buscarClientes } from '../../services/clienteService';
import { buscarMedicamentos } from '../../services/medicamentoService';

export default function AplicacaoPage() {
  const [aplicacoes, setAplicacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [aplicacaoSelecionada, setAplicacaoSelecionada] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [modoDetalhar, setModoDetalhar] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      try {
        const [aplicacoesData, clientesData, medicamentosData] = await Promise.all([
          buscarAplicacoes(),
          buscarClientes(),
          buscarMedicamentos()
        ]);
        setAplicacoes(aplicacoesData);
        setClientes(clientesData);
        setMedicamentos(medicamentosData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const handleAdd = () => {
    setAplicacaoSelecionada(null);
    setModoEdicao(true);
    setModoDetalhar(false);
  };

  const handleEdit = (aplicacao) => {
    setAplicacaoSelecionada(aplicacao);
    setModoEdicao(true);
    setModoDetalhar(false);
  };

  const handleView = (aplicacao) => {
    setAplicacaoSelecionada(aplicacao);
    setModoDetalhar(true);
    setModoEdicao(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir esta aplicação?')) {
      try {
        await excluirAplicacao(id);
        const atualizadas = await buscarAplicacoes();
        setAplicacoes(atualizadas);
      } catch (error) {
        console.error('Erro ao excluir aplicação:', error);
      }
    }
  };

  const handleSave = async (dados) => {
    try {
      if (dados.id) {
        await atualizarAplicacao(dados);
      } else {
        await cadastrarAplicacao(dados);
      }
      setModoEdicao(false);
      setAplicacaoSelecionada(null);
      const atualizadas = await buscarAplicacoes();
      setAplicacoes(atualizadas);
    } catch (error) {
      console.error('Erro ao salvar aplicação:', error);
    }
  };

  const handleCancel = () => {
    setModoEdicao(false);
    setModoDetalhar(false);
    setAplicacaoSelecionada(null);
  };

  if (carregando) {
    return <p style={{ textAlign: 'center' }}>Carregando dados...</p>;
  }

  return (
    <div className="aplicacao-page">
      {modoDetalhar ? (
        <AplicacaoDetalhar
          aplicacao={aplicacaoSelecionada}
          clientes={clientes}
          medicamentos={medicamentos}
          onVoltar={handleCancel}
        />
      ) : modoEdicao ? (
        <AplicacaoForm
          clientes={clientes}
          medicamentos={medicamentos}
          dadosIniciais={aplicacaoSelecionada}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <AplicacaoList
          aplicacoes={aplicacoes}
          clientes={clientes}
          medicamentos={medicamentos}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}
    </div>
  );
}