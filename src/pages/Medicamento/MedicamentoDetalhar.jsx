import './Medicamento.css';

export default function MedicamentoDetalhar({ medicamento, onVoltar }) {
  if (!medicamento) return null;

  return (
    <div className="medicamento-detalhar-container">
      <h2>📋 Detalhes do Medicamento</h2>

      <div className="medicamento-detalhes">
        <p><strong>💊 Nome:</strong> {medicamento.nome}</p>
        <p><strong>🔖 Identificador:</strong> {medicamento.identificador}</p>
        <p><strong>💰 Preço:</strong> R$ {medicamento.preco?.toFixed(2)}</p>
        <p><strong>📦 Qtd. Inicial:</strong> {medicamento.quantidadeInicial} ml</p>
        <p><strong>📊 Qtd. Disponível:</strong> {medicamento.quantidadeDisponivel} ml</p>
      </div>

      <button className="voltar-btn" onClick={onVoltar}>← Voltar</button>
    </div>
  );
}