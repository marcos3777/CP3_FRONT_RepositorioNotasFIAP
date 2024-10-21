"use client";
import { TipoProva } from '@/types/types';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditarCheckpoint() {
  const navigate = useRouter();
  const { name, materia, id: paramId } = useParams();

  const [prova, setProva] = useState<TipoProva | null>(null);

  useEffect(() => {
    const chamadaDaApi = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/base-route/${paramId}`);
        if (!response.ok) {
          console.error('Falha ao buscar os dados da prova. Status:', response.status);
          return;
        }
        const dados = await response.json();
        console.log('Dados recebidos:', dados); // Verificar os dados recebidos
        setProva(dados); // Não é necessário o spread operator aqui
      } catch (error) {
        console.error('Erro ao buscar a prova:', error);
      }
    };
    chamadaDaApi();
  }, [paramId]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (prova) {
      const { name, value } = e.target;
      setProva({ ...prova, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!prova) {
      console.error('Prova não está carregada');
      return;
    }
  
    console.log('Prova a ser enviada:', prova); // Verificar o objeto prova
  
    try {
      const response = await fetch(`http://localhost:3000/api/base-route/${paramId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prova),
      });
  
      if (response.ok) {
        alert('Prova alterada com sucesso');
        navigate.push(`/checkpoint/${name}/${materia}`);
      } else {
        console.error('Falha ao realizar a alteração. Status:', response.status);
      }
    } catch (error) {
      console.error('Falha ao realizar a alteração: ', error);
    }
  };
  

  return (
    <div>
      <h1>Editar Checkpoint</h1>

      <div>
        {prova ? (
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
        ) : (
          <p>Carregando dados da prova...</p>
        )}
      </div>
    </div>
  );
}
