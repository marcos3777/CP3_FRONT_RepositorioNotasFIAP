// pages/checkpoint/[name]/[materia]/[id]/page.tsx

"use client";
import { TipoProva } from '@/types/types';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditarCheckpoint({ params }: { params: { id: number } }) {
  const navigate = useRouter();
  const { name, materia, id } = useParams();

  const [prova, setProva] = useState<TipoProva>({
    id: 0,
    name: '',
    tipo: 'checkpoint',
    materia: '',
    title: '',
    date: '',
    feedback: '',
    note: 0,
    semestre: 0,
  });

  useEffect(() => {
    const chamadaDaApi = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/base-route/${id}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar os dados da prova');
        }
        const dados = await response.json();
        setProva(dados);
      } catch (error) {
        console.error('Erro ao buscar a prova:', error);
      }
    };
    chamadaDaApi();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProva({ ...prova, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/base-route/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prova),
      });

      if (response.ok) {
        alert('Prova alterada com sucesso');
        setProva({
          id: 0,
          name: '',
          tipo: 'checkpoint',
          materia: '',
          title: '',
          date: '',
          feedback: '',
          note: 0,
          semestre: 0,
        });
        navigate.push(`/checkpoint/${name}/${materia}`);
      }
    } catch (error) {
      console.error('Falha ao realizar a alteração: ', error);
    }
  };

  return (
    <div>
      <h1>Editar Checkpoint</h1>

      <div>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label>Título</label>
            <input
              type="text"
              id="idTitle"
              name="title"
              value={prova.title}
              onChange={handleChange}
              placeholder="Título da prova"
              required
            />
          </div>
          <div>
            <label>Data</label>
            <input
              type="text"
              id="idDate"
              name="date"
              value={prova.date}
              onChange={handleChange}
              placeholder="Data da prova"
              required
            />
          </div>
          <div>
            <label>Nota</label>
            <input
              type="number"
              id="idNote"
              name="note"
              value={prova.note}
              onChange={handleChange}
              placeholder="Nota da prova"
              required
              min={0}
            />
          </div>
          <div>
            <label>Feedback</label>
            <input
              type="text"
              id="idFeedback"
              name="feedback"
              value={prova.feedback}
              onChange={handleChange}
              placeholder="Feedback da prova"
              required
            />
          </div>
          <div>
            <button type="submit">Alterar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
