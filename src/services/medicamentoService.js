import api from './api';

const API_URL = '/api/medicamentos';

export const buscarMedicamentos = async () => {
  try {
    const response = await api.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
    return [];
  }
};

export const cadastrarMedicamento = async (medicamento) => {
  try {
    const response = await api.post(API_URL, medicamento);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar medicamento:', error);
    throw error;
  }
};

export const atualizarMedicamento = async (medicamento) => {
  try {
    const response = await api.put(`${API_URL}/${medicamento.id}`, medicamento);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar medicamento:', error);
    throw error;
  }
};

export const excluirMedicamento = async (id) => {
  try {
    await api.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao excluir medicamento:', error);
    throw error;
  }
};