import './Cliente.css';

export default function ClienteDetalhar({ cliente, onVoltar }) {
  if (!cliente) return null;

  return (
    <div className="cliente-detalhar-container">
      <h2>📋 Detalhes do Cliente</h2>

      <div className="cliente-detalhes">
        <p><strong>👤 Nome:</strong> {cliente.nome}</p>
        <p><strong>📞 Telefone:</strong> {cliente.telefone}</p>
        <p><strong>🎂 Idade:</strong> {cliente.idade} anos</p>
        <p><strong>📏 Altura:</strong> {cliente.altura} m</p>
        <p><strong>⚖️ Peso:</strong> {cliente.peso} kg</p>
        <p><strong>🗓️ Data de Cadastro:</strong> {cliente.dataCadastro}</p>
      </div>

      <button className="voltar-btn" onClick={onVoltar}>← Voltar</button>
    </div>
  );
}