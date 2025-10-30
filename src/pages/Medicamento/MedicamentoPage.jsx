import React, { useEffect, useState } from 'react';
import MedicamentoList from './MedicamentoList';
import MedicamentoForm from './MedicamentoForm';
import MedicamentoDetalhar from './MedicamentoDetalhar';
import {
  buscarMedicamentos,
  cadastrarMedicamento,
  atualizarMedicamento,
  excluirMedicamento,
} from '../../services/medicamentoService';

export default function MedicamentoPage() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
  const [modo, setModo] = useState('lista'); // 'lista', 'form', 'detalhar'

  useEffect(() => {
    carregarMedicamentos();
  }, []);

  const carregarMedicamentos = async () => {
    try {
      const lista = await buscarMedicamentos();
      setMedicamentos(lista);
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
    }
  };

  const iniciarCadastro = () => {
    setMedicamentoSelecionado(null);
    setModo('form');
  };

  const iniciarEdicao = (medicamento) => {
    setMedicamentoSelecionado(medicamento);
    setModo('form');
  };

  const iniciarDetalhamento = (medicamento) => {
    setMedicamentoSelecionado(medicamento);
    setModo('detalhar');
  };

  const excluirMedicamentoSelecionado = async (id) => {
    try {
      await excluirMedicamento(id);
      await carregarMedicamentos();
    } catch (error) {
      console.error('Erro ao excluir medicamento:', error);
    }
  };

  const salvarMedicamento = async (medicamento) => {
    try {
      if (medicamentoSelecionado) {
        const medicamentoAtualizado = {
          ...medicamento,
          quantidadeDisponivel: medicamentoSelecionado.quantidadeDisponivel,
        };
        await atualizarMedicamento(medicamentoAtualizado);
      } else {
        await cadastrarMedicamento(medicamento);
      }
      await carregarMedicamentos();
      setModo('lista');
    } catch (error) {
      console.error('Erro ao salvar medicamento:', error);
    }
  };

  const cancelar = () => {
    setMedicamentoSelecionado(null);
    setModo('lista');
  };

  return (
    <>
      {modo === 'lista' && (
        <MedicamentoList
          medicamentos={medicamentos}
          onAdd={iniciarCadastro}
          onEdit={iniciarEdicao}
          onDelete={excluirMedicamentoSelecionado}
          onView={iniciarDetalhamento}
        />
      )}

      {modo === 'form' && (
        <MedicamentoForm
          medicamentoSelecionado={medicamentoSelecionado}
          medicamentosExistentes={medicamentos}
          onSave={salvarMedicamento}
          onCancel={cancelar}
        />
      )}

      {modo === 'detalhar' && (
        <MedicamentoDetalhar
          medicamento={medicamentoSelecionado}
          onVoltar={cancelar}
        />
      )}
    </>
  );
}