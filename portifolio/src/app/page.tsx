// pages/index.tsx

"use client";
import { useEffect, useState } from "react";
import { TipoProva } from '@/types/types';
import Image from "next/image";
import Link from "next/link";
import richardybs from '@/img/yuumi.jpg';
import marcos from '@/img/marcos.jpg';
import izzi from '@/img/izzi.jpg';


export default function Home() {
  const [lista, setLista] = useState<TipoProva[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    const chamadaDaApi = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/base-route");
        const dados = await response.json();
        setLista(dados);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    chamadaDaApi();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".card")) {
        setSelectedCard(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const calcularMedia = (nome: string, tipo: string) => {
    const provasFiltradas = lista.filter((prova) => prova.name === nome && prova.tipo === tipo);
    const somaNotas = provasFiltradas.reduce((soma, prova) => soma + prova.note, 0);
    return provasFiltradas.length > 0 ? (somaNotas / provasFiltradas.length).toFixed(1) : "-";
  };

  const handleCardClick = (name: string) => {
    setSelectedCard(selectedCard === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-purple">
      {/* Main Content */}
      <main className="mainzuda">
        {/* Card 1 */}
        <div className="conteiner-main">
        <div
          className="bg-da-caixa-aluno"
          onClick={() => handleCardClick("Marcos Vinicius")}
        >
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
            <Link href="https://github.com/marcos3777"> <Image src={marcos} alt="Profile" className="w-full h-full object-cover rounded-full"/></Link>
          </div>
          <h2 className="nome-aluno">Marcos V.</h2>
          <table className="mx-auto bg-gray-300 mb-4">
            <tbody>
              {/* --- */}

              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                <button className="butao" onClick={() => window.location.href = "/checkpoint/marcos"}>CP</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Marcos Vinicius", "checkpoint")}</td>
              </tr>
              {/* --- */}

              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                <button className="butao" onClick={() => window.location.href = "/prova/sp"}>SP</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Marcos Vinicius", "Sprint")}</td>
              </tr>
              {/* --- */}

              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                <button className="butao" onClick={() => window.location.href = "/prova/globalsolution"}>GS</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Marcos Vinicius", "global")}</td>
              </tr>
              {/* --- */}

            </tbody>
          </table>
        </div>

        {/* Card 2 */}
        <div
          className="bg-da-caixa-aluno"
          onClick={() => handleCardClick("Richardy B.")}
        >
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
          <Link href="https://github.com/richardybs"> <Image src={richardybs} alt="Profile" className="w-full h-full object-cover rounded-full"/> </Link>
          </div>
          <h2 className="nome-aluno">Richardy B.</h2>
          <table className="mx-auto bg-gray-300 mb-4">
            <tbody>

              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                  <button className="butao" onClick={() => window.location.href = "/checkpoint/richardy"}>CP</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Richardy B.", "checkpoint")}</td>
              </tr>
              {/* --- */}

              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                  <button className="butao" onClick={() => window.location.href = "/prova/sp"}>SP</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Richardy B.", "Sprint")}</td>
              </tr>
              {/* --- */}
              
              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                  <button className="butao" onClick={() => window.location.href = "/prova/globalsolution"}>GS</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Richardy B.", "global")}</td>
              </tr>
              {/* --- */}
              
            </tbody>
          </table>
        </div>

        {/* Card 3 */}
        <div
          className="bg-da-caixa-aluno"
          onClick={() => handleCardClick("Pedro Bergara")}
        >
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
          <Image src={richardybs} alt="Profile" className="w-full h-full object-cover rounded-full"/>
          </div>
          <h2 className="nome-aluno">Pedro Bergara</h2>
          <table className="mx-auto bg-gray-300 mb-4">
            <tbody>

              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                <button className="butao" onClick={() => window.location.href = "/prova/cp"}>CP</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Pedro Bergara", "checkpoint")}</td>
              </tr>
              {/* --- */}

              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                <button className="butao" onClick={() => window.location.href = "/prova/sp"}>SP</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Pedro Bergara", "Sprint")}</td>
              </tr>
              {/* --- */}

              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                <button className="butao" onClick={() => window.location.href = "/prova/globalsolution"}>GS</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Pedro Bergara", "global")}</td>
              </tr>
              {/* --- */}

            </tbody>
          </table>
        </div>

        {/* Card 4 */}
        <div className="bg-da-caixa-aluno" onClick={() => handleCardClick("Henrique Izzi")}>
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
            <Image src={izzi} alt="Profile" className="w-full h-full object-cover rounded-full"/>
          </div>
          <h2 className="nome-aluno">Henrique Izzi</h2>
          <table className="mx-auto bg-gray-300 mb-4">
            <tbody>
              
              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                <button className="butao" onClick={() => window.location.href = "/prova/cp"}>CP</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Henrique Izzi", "checkpoint")}</td>
              </tr>
              {/* --- */}
              
              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                  <button className="butao" onClick={() => window.location.href = "/prova/sp"}>SP</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Henrique Izzi", "Sprint")}</td>
              </tr>
              {/* --- */}

              {/* --- */}
              <tr className="caixa-aluno">
                <td className="box-border-aluno">
                  <button className="butao" onClick={() => window.location.href = "/prova/globalsolution"}>GS</button>
                </td>
                <td className="box-border-aluno">{calcularMedia("Henrique Izzi", "global")}</td>
              </tr>
              {/* --- */}

            </tbody>
          </table>
        </div>
        </div>
      </main>
    </div>
  );
}
