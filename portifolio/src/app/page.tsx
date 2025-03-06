// Page.tsx

"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdModeEdit, MdDelete, MdArrowDropDown, MdAdd, MdArrowBack } from "react-icons/md";
import imgMarcos from "@/public/marcosimage.jpg";
import imgRichardy from "@/public/richardyimage.jpg";
import imgHenrique from "@/public/izziimage.jpg";
import imgArthur from "@/public/arthurimage.jpg";
import imgPedro from "@/public/pedroimage.jpg";

interface CustomDropdownProps {
  options: string[];
  label: string;
  value: string;
  onSelect: (value: string) => void;
}

const CustomDropdown = ({ options, label, value, onSelect }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (option: string) => {
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div ref={dropdownRef} className="dropdownnomes">
      {/* Label */}
      <p
        className="opcoesnomes flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || label}
        <MdArrowDropDown className="ml-2" />
      </p>

      {/* Options */}
      {isOpen && (
        <div className="coresposicoesopcoes">
          {options.map((option) => (
            <div
              key={option}
              className="opcoeshover"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
  const [isLoading, setIsLoading] = useState(false);

  const participants = [
    {
      name: 'Marcos Vinicius',
      image: imgMarcos,
    },
    {
      name: 'Richardy Borges',
      image: imgRichardy,
    },
    {
      name: 'Henrique Izzi',
      image: imgHenrique,
    },
    {
      name: 'Pedro Bergara',
      image: imgPedro, 
    },
    {
      name: 'Arthur Ramos dos Santos',
      image: imgArthur, 
    },
  ];

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

  const fetchData = async () => {
    if (!selectedName || !selectedProva || !selectedMateria) return;
    
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedName && selectedProva && selectedMateria) {
      fetchData();
    }
  }, [selectedName, selectedProva, selectedMateria]);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('Tem certeza que deseja deletar este item?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/base-route/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchData();
      } else {
        console.error('Failed to delete the item');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const handleBack = () => {
    setSelectedName('');
    setSelectedProva('');
    setSelectedMateria('');
    setSemestre1Data([]);
    setSemestre2Data([]);
  };

  const participant = participants.find((p) => p.name === selectedName);

  return (
    <div className="conteiner-home">
      {(!selectedName || !selectedProva || !selectedMateria) && (
        <>
          {/* Dropdowns */}
          <div className="container-botao">
            <div className="relative">
              <select
                className="butao appearance-none"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
              >
                <option value="">Selecione um Nome</option>
                {nomes.map((nome) => (
                  <option key={nome} value={nome}>
                    {nome}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                <MdArrowDropDown size={20} />
              </div>
            </div>

            <div className="relative">
              <select
                className="butao appearance-none"
                value={selectedProva}
                onChange={(e) => setSelectedProva(e.target.value)}
              >
                <option value="">Selecione uma Prova</option>
                {provas.map((prova) => (
                  <option key={prova} value={prova}>
                    {prova}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                <MdArrowDropDown size={20} />
              </div>
            </div>

            <div className="relative">
              <select
                className="butao appearance-none"
                value={selectedMateria}
                onChange={(e) => setSelectedMateria(e.target.value)}
              >
                <option value="">Selecione uma Matéria</option>
                {materias.map((materia) => (
                  <option key={materia} value={materia}>
                    {materia}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                <MdArrowDropDown size={20} />
              </div>
            </div>
            
            {/* Botão Cadastrar */}
            <Link href="/cadastrar" className="butao-cad flex items-center justify-center">
              <MdAdd className="mr-2" size={20} />
              Cadastrar Nota
            </Link>
          </div>

          {/* Conteudo tela inicial */}
          <div className="conteiner-welcome">
            <h1 className="welcome-text">Bem-vindo ao Sistema de Notas</h1>
            <p className="item-p1">
              Para visualizar os dados das provas, por favor selecione o{' '}
              <strong>Nome</strong>, <strong>Prova</strong> e{' '}
              <strong>Matéria</strong> nos menus acima.
            </p>
            <p className="item-p2">Aplicação desenvolvida pelos alunos da FIAP.</p>
            
            {/* Participantes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {participants.map((participant) => (
                <div key={participant.name} className="bg-gray-800/50 p-4 rounded-lg shadow-md border border-gray-700 flex flex-col items-center hover:border-red-600 transition-colors duration-300">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-600 mb-3">
                    <Image 
                      src={participant.image} 
                      alt={participant.name} 
                      width={80} 
                      height={80} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-white font-medium text-lg">{participant.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">Aluno FIAP</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Conteudo depois q tudo foi selecionado */}
      {selectedName && selectedProva && selectedMateria && (
        <>
          {/* Header */}
          <div className="header">
            <div className="image-container">
              {participant ? (
                <Image
                  src={participant.image}
                  alt={participant.name}
                  width={96}
                  height={96}
                  className="participant-image"
                />
              ) : (
                <div className="participant-placeholder">
                  <p>{selectedName.charAt(0)}</p>
                </div>
              )}
            </div>

            <div className="labels">
              <h2>{selectedName}</h2>
              <p>
                {selectedProva} - {selectedMateria}
              </p>
            </div>

            <div className="button-group">
              <button onClick={handleBack} className="butao-cad flex items-center">
                <MdArrowBack className="mr-2" />
                Voltar
              </button>
              <Link href="/cadastrar" className="butao-cad flex items-center">
                <MdAdd className="mr-2" />
                Cadastrar
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="container-principal">
              {/* Semestre 1 */}
              <div className="conteudo-semestr">
                <h2>Semestre 1</h2>
                {semestre1Data.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    Nenhum dado encontrado para o primeiro semestre.
                  </div>
                ) : (
                  semestre1Data.map((item) => (
                    <div key={item.id} className="caixa-semestr">
                      <h3 className="titulo-item-semestr">{item.title}</h3>
                      <p>Data: {item.date}</p>
                      <p>Feedback: {item.feedback}</p>
                      <h4>Nota: {item.note}</h4>
                      <Link href={`/edit/${item.id}`}>
                        <MdModeEdit className="edit" />
                      </Link>
                      <MdDelete
                        className="delete"
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Semestre 2 */}
              <div className="conteudo-semestr">
                <h2>Semestre 2</h2>
                {semestre2Data.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    Nenhum dado encontrado para o segundo semestre.
                  </div>
                ) : (
                  semestre2Data.map((item) => (
                    <div key={item.id} className="caixa-semestr">
                      <h3 className="titulo-item-semestr">{item.title}</h3>
                      <p>Data: {item.date}</p>
                      <p>Feedback: {item.feedback}</p>
                      <h4>Nota: {item.note}</h4>
                      <Link href={`/edit/${item.id}`}>
                        <MdModeEdit className="edit" />
                      </Link>
                      <MdDelete
                        className="delete"
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
