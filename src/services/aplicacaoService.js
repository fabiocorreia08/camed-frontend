import api from './api';

const API_URL = '/api/aplicacoes';

export const buscarAplicacoes = async () => {
  try {
    const response = await api.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Erro ao buscar aplicações:', error);
    return [];
  }
};

export const cadastrarAplicacao = (aplicacao) => {
  return api.post(API_URL, aplicacao);
};

export const atualizarAplicacao = (aplicacao) => {
  return api.put(`${API_URL}/${aplicacao.id}`, aplicacao);
};

export const excluirAplicacao = (id) => {
  return api.delete(`${API_URL}/${id}`);
};
