// pages/checkpoint/[name]/page.tsx

"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CheckpointMateriaPage() {
  const { name } = useParams();
  const [nome, setNome] = useState<string>('');

  useEffect(() => {
    if (name) {
      setNome(name as string);
    }
  }, [name]);

  const materias = [
    'ARTIFICIAL INTELLIGENCE & CHATBOT',
    'DOMAIN DRIVEN DESIGN USING JAVA',
    'BUILDING RELATIONAL DATABASE',
    'FRONT-END DESIGN ENGINEERING',
    'COMPUTATIONAL THINKING USING PYTHON',
    'SOFTWARE ENGINEERING AND BUSINESS MODEL'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 to-blue-600 p-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white">{nome.toUpperCase()}</h1>
        <p className="text-2xl font-semibold text-white mt-2">Checkpoint</p>
      </header>
      <main className="flex flex-wrap justify-center gap-8">
        {materias.map((materia) => (
          <Link key={materia} href={`/checkpoint/${encodeURIComponent(materia.toLowerCase().replace(/\s+/g, '-'))}`} passHref>
            <div className="bg-white px-6 py-4 rounded-lg shadow-md text-center cursor-pointer w-72 hover:bg-gray-200 transition-all">
              <p className="text-lg font-bold">{materia}</p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
