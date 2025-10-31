// src/services/clienteService.js
import api from './api';

const API_URL = '/api/clientes';

export const buscarClientes = () => api.get(API_URL);
export const buscarClientePorId = (id) => api.get(`${API_URL}/${id}`);
export const cadastrarCliente = (cliente) => api.post(API_URL, cliente);
export const atualizarCliente = (cliente) => api.put(`${API_URL}/${cliente.id}`, cliente);
export const excluirCliente = (id) => api.delete(`${API_URL}/${id}`);