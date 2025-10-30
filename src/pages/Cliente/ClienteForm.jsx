import React, { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";

// Função utilitária para limpar números
const limparNumero = (valor) => valor.replace(/\D/g, "");

// Verifica se o CPF já foi cadastrado
const cpfDuplicado = (cpf, clientesExistentes, clienteSelecionado) => {
  const cpfLimpo = limparNumero(cpf);
  return clientesExistentes.some(
    (c) =>
      limparNumero(c.cpf) === cpfLimpo &&
      (!clienteSelecionado || c.id !== clienteSelecionado.id)
  );
};

export default function ClienteForm({
  clienteSelecionado,
  clientesExistentes,
  onSave,
  onCancel,
}) {
  const [cliente, setCliente] = useState({
    id: null,
    nome: "",
    cpf: "",
    telefone: "",
    idade: "",
    altura: "",
    peso: "",
  });

  const [erroCpf, setErroCpf] = useState("");

  // Carrega dados do cliente selecionado (edição)
  useEffect(() => {
    if (clienteSelecionado) {
      setCliente(clienteSelecionado);
    } else {
      setCliente({
        id: null,
        nome: "",
        cpf: "",
        telefone: "",
        idade: "",
        altura: "",
        peso: "",
      });
    }
    setErroCpf("");
  }, [clienteSelecionado]);

  // Atualiza campos comuns
  const handleChange = (e) => {
    const { name, value } = e.target;
    const valorFormatado = name === "nome" ? value.toUpperCase() : value;
    setCliente((prev) => ({ ...prev, [name]: valorFormatado }));
  };

  // Atualiza campos com máscara (CPF, telefone)
  const handleMaskedChange = (name, value) => {
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  // Submete o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação de CPF duplicado
    if (cpfDuplicado(cliente.cpf, clientesExistentes, clienteSelecionado)) {
      setErroCpf("Este CPF já está cadastrado.");
      return;
    }

    const clienteFormatado = {
      ...cliente,
      cpf: limparNumero(cliente.cpf),
      telefone: limparNumero(cliente.telefone),
      dataCadastro:
        clienteSelecionado?.dataCadastro || new Date().toISOString().split("T")[0],
    };

    onSave(clienteFormatado);
  };

  return (
    <div className="medicamento-form-container">
      <h2>{clienteSelecionado ? "Editar Cliente" : "Novo Cliente"}</h2>

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={cliente.nome}
          onChange={handleChange}
          required
        />

        {/* CPF */}
        <label htmlFor="cpf">CPF</label>
        <IMaskInput
          id="cpf"
          name="cpf"
          mask="000.000.000-00"
          value={cliente.cpf}
          onAccept={(value) => handleMaskedChange("cpf", value)}
          placeholder="000.000.000-00"
          required
        />
        {erroCpf && <span className="form-error">{erroCpf}</span>}

        {/* Telefone */}
        <label htmlFor="telefone">Telefone</label>
        <IMaskInput
          id="telefone"
          name="telefone"
          mask="(00) 00000-0000"
          value={cliente.telefone}
          onAccept={(value) => handleMaskedChange("telefone", value)}
          placeholder="(00) 00000-0000"
          required
        />

        {/* Idade */}
        <label htmlFor="idade">Idade</label>
        <input
          id="idade"
          name="idade"
          type="number"
          min="0"
          value={cliente.idade}
          onChange={handleChange}
          placeholder="Ex: 30"
        />

        {/* Altura */}
        <label htmlFor="altura">Altura (m)</label>
        <input
          id="altura"
          name="altura"
          type="number"
          step="0.01"
          value={cliente.altura}
          onChange={handleChange}
          placeholder="Ex: 1.75"
        />

        {/* Peso */}
        <label htmlFor="peso">Peso (kg)</label>
        <input
          id="peso"
          name="peso"
          type="number"
          step="0.1"
          value={cliente.peso}
          onChange={handleChange}
          placeholder="Ex: 70.5"
        />

        {/* Ações */}
        <div className="form-botoes">          
          <button type="submit" className="novo-btn" disabled={!!erroCpf}>
            💾 {clienteSelecionado ? "Salvar Alterações" : "Cadastrar"}
          </button>
          <button type="button" className="novo-btn" onClick={onCancel}>↩️ Cancelar</button>
        </div>
      </form>
    </div>
  );
}