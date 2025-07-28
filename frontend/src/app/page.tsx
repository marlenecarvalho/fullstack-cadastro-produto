'use client';
import { useState, useEffect } from "react";

// Componente principal da página
export default function Home() {
  // Lista de produtos recebida do backend
  const [produtos, setProdutos] = useState<any[]>([]);
  // Estado para erros de requisição
  const [erro, setErro] = useState<string | null>(null);
  // Estado para o produto atual sendo criado ou editado
  const [produto, setProduto] = useState<any>({
    nome: "",
    descricao: "",
    preco: ""
  });
  // Estado para controlar se está editando um produto (null = criando)
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // Ao carregar a página, busca os produtos
  useEffect(() => {
    obterProdutos();
  }, []);

  // Função para buscar produtos do backend
  async function obterProdutos() {
    try {
      const resp = await fetch("http://localhost:3001/produto");
      if (!resp.ok) throw new Error(`Erro ${resp.status}: ${resp.statusText}`);
      const dados = await resp.json();
      setProdutos(dados);
    } catch (err: any) {
      setErro(err.message || "Erro ao buscar produtos");
    }
  }

  // Cria ou edita um produto
  async function salvarProduto() {
    try {
      const url = editandoId
        ? `http://localhost:3001/produto/${editandoId}`
        : "http://localhost:3001/produto";
      const metodo = editandoId ? "PUT" : "POST";

      const resp = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });

      if (!resp.ok) throw new Error("Erro ao salvar produto");

      // Limpa formulário e estado de edição
      setProduto({ nome: "", descricao: "", preco: "" });
      setEditandoId(null);
      obterProdutos();
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar produto");
    }
  }

  // Exclui um produto
  async function excluirProduto(id: number) {
    try {
      await fetch(`http://localhost:3001/produto/${id}`, { method: "DELETE" });
      obterProdutos();
    } catch (err: any) {
      setErro(err.message || "Erro ao excluir produto");
    }
  }

  // Prepara formulário para editar produto
  function editarProduto(produto: any) {
    setProduto(produto);
    setEditandoId(produto.id);
  }

  // Renderiza o formulário de produto
  function renderizarFormProduto() {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-zinc-100 rounded-lg shadow-md max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">
          {editandoId ? "Editar Produto" : "Cadastro de Produto"}
        </h2>

        <label className="w-full mb-2 font-semibold">Nome</label>
        <input
          type="text"
          className="bg-white p-2 rounded w-full border mb-4"
          value={produto.nome}
          onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
          placeholder="Nome do Produto"
        />

        <label className="w-full mb-2 font-semibold">Descrição</label>
        <input
          type="text"
          className="bg-white p-2 rounded w-full border mb-4"
          value={produto.descricao}
          onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
          placeholder="Descrição"
        />

        <label className="w-full mb-2 font-semibold">Preço</label>
        <input
          type="number"
          className="bg-white p-2 rounded w-full border mb-4"
          value={produto.preco}
          onChange={(e) =>
            setProduto({ ...produto, preco: parseFloat(e.target.value) })
          }
          placeholder="Preço"
        />

        <button
          onClick={salvarProduto}
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-bold py-2 px-4 rounded"
        >
          {editandoId ? "Atualizar Produto" : "Criar Produto"}
        </button>

        {erro && <p className="text-red-500 mt-4">{erro}</p>}
      </div>
    );
  }

  // Renderiza os produtos cadastrados
  function renderizarProduto() {
    return (
      <div className="p-4 max-w-md mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-800">
          Lista de Produtos
        </h1>

        {erro && <p className="text-red-500 text-center">Erro: {erro}</p>}

        {produtos.length === 0 && !erro && (
          <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
        )}

        {produtos.map((produto: any) => (
          <div key={produto.id} className="mb-4 border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold text-purple-800">{produto.nome}</h2>
            <p className="text-gray-700">Descrição: {produto.descricao}</p>
            <p className="text-gray-700">Preço: R$ {Number(produto.preco).toFixed(2)}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => editarProduto(produto)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => excluirProduto(produto.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render final da página
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      {renderizarFormProduto()}
      {renderizarProduto()}
    </div>
  );
}
