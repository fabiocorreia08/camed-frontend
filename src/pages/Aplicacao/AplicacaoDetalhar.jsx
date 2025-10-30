import './Aplicacao.css';

export default function AplicacaoDetalhar({ aplicacao, clientes, medicamentos, onVoltar }) {
  if (!aplicacao) return null;

  const cliente = clientes.find(c => c.id === aplicacao.clienteId);
  const medicamento = medicamentos.find(m => m.id === aplicacao.medicamentoId);

  return (
    <div className="aplicacao-detalhar-container">
      <h2>Detalhes da Aplicação</h2>

      <div className="aplicacao-detalhes">
        <p><strong>Cliente:</strong> {cliente ? cliente.nome : '—'}</p>
        <p><strong>Medicamento:</strong> {medicamento ? medicamento.nome : '—'}</p>
        <p><strong>Dose Aplicada (ml):</strong> {aplicacao.dose}</p>
        <p><strong>Valor Pago (R$):</strong> R$ {aplicacao.valorPago?.toFixed(2)}</p>
        <p><strong>Data Aplicação:</strong> {new Date(aplicacao.data).toLocaleDateString()}</p>        
        <p><strong>Qtd. Disponível após Aplicação (ml):</strong> {aplicacao.quantidadeDisponivelAposAplicacao}</p>        
      </div>

      <button className="voltar-btn" onClick={onVoltar}>← Voltar</button>
    </div>
  );
}