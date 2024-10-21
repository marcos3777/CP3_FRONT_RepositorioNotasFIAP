// pages/checkpoint/[name]/[materia]/page.tsx

"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TipoProva } from '@/types/types';
import Link from 'next/link';

export default function CheckpointDetailsPage() {
  const { name, materia } = useParams();
  const [semestre1Data, setSemestre1Data] = useState<TipoProva[]>([]);
  const [semestre2Data, setSemestre2Data] = useState<TipoProva[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/base-route');
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('Data fetched is not an array:', data);
          return;
        }

        const filteredData = data.filter((item: TipoProva) => {
          console.log('Item name:', item.name);
          console.log('Item materia:', item.materia);
          console.log('Item tipo:', item.tipo);
          console.log('Expected name:', name);
          console.log('Expected materia:', materia);
          return (
            typeof name === 'string' && item.name.toLowerCase().startsWith(name.split('-')[0].toLowerCase()) &&
            item.tipo.toLowerCase() === 'checkpoint' &&
            typeof materia === 'string' && item.materia.toLowerCase().replace(/\s+/g, '-').toLowerCase() === materia.toLowerCase()
          );
        });

        const semestre1 = filteredData.filter((item) => item.semestre === '1');
        const semestre2 = filteredData.filter((item) => item.semestre === '2');

        setSemestre1Data(semestre1);
        setSemestre2Data(semestre2);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };
    fetchData();
  }, [name, materia]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-cyan-400 p-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white">
          {typeof name === 'string' ? name.toUpperCase() : ''}
        </h1>
        <p className="text-2xl font-semibold text-white mt-2">
          Checkpoint - {typeof materia === 'string' ? materia.toUpperCase() : ''}
        </p>
      </header>
      <main className="flex flex-wrap justify-around gap-8">
        {/* Semestre 1 */}
        <div className="bg-gray-100 rounded-lg p-6 shadow-md w-[45%]">
          <h2 className="text-3xl font-semibold mb-6 text-center">Semestre 1</h2>
          {semestre1Data.length > 0 ? (
            semestre1Data.map((item, index) => (
              <div key={index} className="mb-6 p-4 border-b border-gray-400">
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-1">{item.date}</p>
                <p className="text-gray-700 mb-2">Feedback: {item.feedback}</p>
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Nota {item.note}</p>
                  <div className="flex space-x-4">
                    <Link href={`/checkpoint/${name}/${materia}/${item.id}`} className="text-blue-500 underline">Edit</Link>
                    <button className="text-blue-500 underline">Add</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum dado disponível para o Semestre 1.</p>
          )}
        </div>

        {/* Semestre 2 */}
        <div className="bg-gray-200 rounded-lg p-6 shadow-md w-[45%]">
          <h2 className="text-3xl font-semibold mb-6 text-center">Semestre 2</h2>
          {semestre2Data.length > 0 ? (
            semestre2Data.map((item, index) => (
              <div key={index} className="mb-6 p-4 border-b border-gray-400">
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-1">{item.date}</p>
                <p className="text-gray-700 mb-2">Feedback: {item.feedback}</p>
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Nota {item.note}</p>
                  <div className="flex space-x-4">
                  <Link href={`/checkpoint/${name}/${materia}/${item.id}`} className="text-blue-500 underline">Edit</Link>
                    <button className="text-blue-500 underline">Add</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum dado disponível para o Semestre 2.</p>
          )}
        </div>
      </main>
    </div>
  );
}
