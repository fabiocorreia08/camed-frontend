import api from './api';

const API_URL = '/api/clientes';

// Buscar todos os clientes
export const buscarClientes = async () => {
  try {
    const response = await api.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return [];
  }
};


// Cadastrar novo cliente
export const cadastrarCliente = async (cliente) => {
  try {
    const response = await api.post(API_URL, cliente);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    throw error;
  }
};

// Atualizar cliente existente
export const atualizarCliente = async (cliente) => {
  try {
    const response = await api.put(`${API_URL}/${cliente.id}`, cliente);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
};

// Excluir cliente por ID
export const excluirCliente = async (id) => {
  try {
    await api.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw error;
  }
};