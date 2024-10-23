// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page() {
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

  const [selectedName, setSelectedName] = useState('');
  const [selectedProva, setSelectedProva] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');
  const [semestre1Data, setSemestre1Data] = useState<Data[]>([]);
  const [semestre2Data, setSemestre2Data] = useState<Data[]>([]);

  const participants = [
    {
      name: 'Marcos Vinicius',
      image: '/images/participants/marcos-vinicius.jpg',
    },
    {
      name: 'Richard',
      image: '/images/participants/richard.jpg',
    },
    {
      name: 'Heinrique',
      image: '/images/participants/heinrique.jpg',
    },
    {
      name: 'Pedro',
      image: '/images/participants/pedro.jpg',
    },
  ];

  

  const nomes = ['Marcos Vinicius', 'Richardy Borges ', 'Henrique Izzi', 'Pedro Bergara']; //Nomes para dropdown para colocar igual no json
  const provas = ['Checkpoint', 'Sprint', 'GlobalSolution'];
  const materias = [
    'ARTIFICIAL INTELLIGENCE AND CHATBOT',
    'DOMAIN DRIVEN DESIGN USING JAVA',
    'BUILDING RELATIONAL DATABASE',
    'FRONT-END DESIGN ENGINEERING',
    'COMPUTATIONAL THINKING USING PYTHON',
    'SOFTWARE ENGINEERING AND BUSINESS MODEL',
  ];

  const fetchData = async () => {
    const response = await fetch('/api/base-route');
    const data: Data[] = await response.json();

    const semestre1 = data.filter(
      (item) =>
        item.name === selectedName &&
        item.tipo === selectedProva.toLowerCase() &&
        item.materia === selectedMateria &&
        item.semestre === '1'
    );
    const semestre2 = data.filter(
      (item) =>
        item.name === selectedName &&
        item.tipo === selectedProva.toLowerCase() &&
        item.materia === selectedMateria &&
        item.semestre === '2'
    );

    setSemestre1Data(semestre1);
    setSemestre2Data(semestre2);
  };

  useEffect(() => {
    if (selectedName && selectedProva && selectedMateria) {
      fetchData();
    }
  }, [selectedName, selectedProva, selectedMateria]);

  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen">
      {/* Cabeçalho com Dropdowns */}
      <div className="flex justify-between w-full p-4 bg-gray-400">
        <select
          className="p-2 border rounded"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value="">Nome</option>
          {nomes.map((nome) => (
            <option key={nome} value={nome}>
              {nome}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={selectedProva}
          onChange={(e) => setSelectedProva(e.target.value)}
        >
          <option value="">Provas</option>
          {provas.map((prova) => (
            <option key={prova} value={prova}>
              {prova}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={selectedMateria}
          onChange={(e) => setSelectedMateria(e.target.value)}
        >
          <option value="">Matéria</option>
          {materias.map((materia) => (
            <option key={materia} value={materia}>
              {materia}
            </option>
          ))}
        </select>
            {/* Botão Cadastrar */}
            <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            window.location.href = '/cadastrar';
          }}
        >
          Cadastrar
        </button>
      </div>
      

      {/* Renderização Condicional */}
      {selectedName && selectedProva && selectedMateria ? (
        // Conteúdo exibido após as seleções serem feitas
        <div className="flex w-full justify-around p-8">
          {/* Semestre 1 */}
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h2 className="text-center font-bold text-lg">Semestre 1</h2>
            {semestre1Data.length > 0 ? (
              semestre1Data.map((item) => (
                <div key={item.id} className="border p-4 m-2 relative">
                  <Link
                    href={`/edit/${item.id}`}
                    className="absolute top-2 right-2 text-blue-500 hover:underline text-sm"
                  >
                    Editar
                  </Link>
                  <h3 className="font-bold">{item.title}</h3>
                  <p>{item.date}</p>
                  <p>Feedback: {item.feedback}</p>
                  <p>Nota: {item.note}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum dado disponível para o Semestre 1.</p>
            )}
          </div>

          {/* Semestre 2 */}
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h2 className="text-center font-bold text-lg">Semestre 2</h2>
            {semestre2Data.length > 0 ? (
              semestre2Data.map((item) => (
                <div key={item.id} className="border p-4 m-2 relative">
                  <Link
                    href={`/edit/${item.id}`}
                    className="absolute top-2 right-2 text-blue-500 hover:underline text-sm"
                  >
                    Editar
                  </Link>
                  <h3 className="font-bold">{item.title}</h3>
                  <p>{item.date}</p>
                  <p>Feedback: {item.feedback}</p>
                  <p>Nota: {item.note}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum dado disponível para o Semestre 2.</p>
            )}
          </div>
        </div>
      ) : (
        // Conteúdo caso nada seja selecionado 
        <div className="flex flex-col items-center mt-16 text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Sistema de Notas</h1>
          <p className="text-lg text-gray-700 mb-8">
            Para visualizar os dados das provas, por favor selecione o <strong>Nome</strong>, <strong>Prova</strong> e <strong>Matéria</strong> nos menus acima.
          </p>
          <img  //remover tag img e adicionar Image do next (isso se encontrar alguma imagem legal)
            src="/images/welcome.svg"
            alt="Bem-vindo"
            className="w-1/2 max-w-md mb-8"
          />
          <p className="text-gray-600">
            Aplicação ainda em desenvolvimento. 
          </p>
        </div>
      )}
    </div>
  );
}
