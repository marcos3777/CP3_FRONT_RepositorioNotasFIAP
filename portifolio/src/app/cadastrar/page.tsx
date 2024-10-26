"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastrarPage() {
  const router = useRouter();

  interface Data {
    id: number;
    name: string;
    tipo: string;
    materia: string;
    title: string;
    date: string;
    feedback: string;
    note: number;
    semestre: string;
  }

  const [formData, setFormData] = useState<Partial<Data>>({
    name: '',
    tipo: '',
    materia: '',
    title: '',
    date: '',
    feedback: '',
    note: 0,
    semestre: '',
  });

  const nomes = ['Marcos Vinicius', 'Richardy Borges', 'Henrique Izzi', 'Pedro Bergara', 'Arthur Ramos dos Santos'];
  const provas = ['Checkpoint', 'Sprint', 'GlobalSolution'];
  const materias = [
    'ARTIFICIAL INTELLIGENCE AND CHATBOT',
    'DOMAIN DRIVEN DESIGN USING JAVA',
    'BUILDING RELATIONAL DATABASE',
    'FRONT-END DESIGN ENGINEERING',
    'COMPUTATIONAL THINKING USING PYTHON',
    'SOFTWARE ENGINEERING AND BUSINESS MODEL',
  ];
  const semestres = ['1', '2'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Chamada à API para verificar e cadastrar a prova
    try {
      const response = await fetch('/api/base-route/cad-prova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Prova cadastrada com sucesso!');
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar a prova:', error);
      alert('Erro ao cadastrar a prova.');
    }
  };

  return (
    <div className="conteiner-home">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Prova</h1>
      <form className="w-full max-w-md bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="mb-4">
          <label className="block text-gray-700">Nome:</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          >
            <option value="">Selecione um nome</option>
            {nomes.map((nome) => (
              <option key={nome} value={nome}>
                {nome}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Prova */}
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Prova:</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            required
          >
            <option value="">Selecione o tipo de prova</option>
            {provas.map((prova) => (
              <option key={prova} value={prova.toLowerCase()}>
                {prova}
              </option>
            ))}
          </select>
        </div>

        {/* Matéria */}
        <div className="mb-4">
          <label className="block text-gray-700">Matéria:</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.materia}
            onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
            required
          >
            <option value="">Selecione a matéria</option>
            {materias.map((materia) => (
              <option key={materia} value={materia}>
                {materia}
              </option>
            ))}
          </select>
        </div>

        {/* Semestre */}
        <div className="mb-4">
          <label className="block text-gray-700">Semestre:</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.semestre}
            onChange={(e) => setFormData({ ...formData, semestre: e.target.value })}
            required
          >
            <option value="">Selecione o semestre</option>
            {semestres.map((semestre) => (
              <option key={semestre} value={semestre}>
                {semestre}
              </option>
            ))}
          </select>
        </div>

        {/* Nota */}
        <div className="mb-4">
          <label className="block text-gray-700">Nota:</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            className="w-full p-2 border rounded"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: parseFloat(e.target.value) })}
            required
          />
        </div>

        {/* Título */}
        <div className="mb-4">
          <label className="block text-gray-700">Título:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        {/* Data */}
        <div className="mb-4">
          <label className="block text-gray-700">Data:</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        {/* Feedback */}
        <div className="mb-4">
          <label className="block text-gray-700">Feedback:</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          />
        </div>

        {/* Botão Submeter */}
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Cadastrar Prova
        </button>
      </form>
    </div>
  );
}
