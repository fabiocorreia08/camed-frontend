import axios from 'axios';

const API_URL = 'http://localhost:8080/api/aplicacoes'; // ajuste conforme sua API

export const buscarAplicacoes = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Erro ao buscar aplicações:', error);
    return [];
  }
};


export const cadastrarAplicacao = (aplicacao) => {
  return axios.post(API_URL, aplicacao);
};

export const atualizarAplicacao = (aplicacao) => {
  return axios.put(`${API_URL}/${aplicacao.id}`, aplicacao);
};

export const excluirAplicacao = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
