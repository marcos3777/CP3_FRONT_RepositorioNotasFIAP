// pages/index.tsx

"use client";
import { useEffect, useState } from "react";
import { TipoProva } from '@/types/types';

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
    <div className="min-h-screen bg-gray-400">
      {/* Main Content */}
      <main className="flex flex-wrap justify-center gap-10 p-10">
        {/* Card 1 */}
        <div
          className="bg-gray-500 p-6 rounded-lg text-center cursor-pointer card"
          onClick={() => handleCardClick("Marcos Vinicius")}
        >
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
            <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-xl font-bold mb-2">Marcos V.</h2>
          <table className="mx-auto bg-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="px-4 py-2 border">CP:</td>
                <td className="px-4 py-2 border">{calcularMedia("Marcos Vinicius", "checkpoint")}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">SP:</td>
                <td className="px-4 py-2 border">{calcularMedia("Marcos Vinicius", "Sprint")}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">GS:</td>
                <td className="px-4 py-2 border">{calcularMedia("Marcos Vinicius", "global")}</td>
              </tr>
            </tbody>
          </table>
          {selectedCard === "Marcos Vinicius" && (
            <div className="mt-4 space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/cp"}>CP</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/sp"}>SP</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/globalsolution"}>GS</button>
            </div>
          )}
        </div>

        {/* Card 2 */}
        <div
          className="bg-gray-500 p-6 rounded-lg text-center cursor-pointer card"
          onClick={() => handleCardClick("Richardy B.")}
        >
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
            <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-xl font-bold mb-2">Richardy B.</h2>
          <table className="mx-auto bg-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="px-4 py-2 border">CP:</td>
                <td className="px-4 py-2 border">{calcularMedia("Richardy B.", "checkpoint")}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">SP:</td>
                <td className="px-4 py-2 border">{calcularMedia("Richardy B.", "Sprint")}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">GS:</td>
                <td className="px-4 py-2 border">{calcularMedia("Richardy B.", "global")}</td>
              </tr>
            </tbody>
          </table>
          {selectedCard === "Richardy B." && (
            <div className="mt-4 space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/cp"}>CP</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/sp"}>SP</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/globalsolution"}>GS</button>
            </div>
          )}
        </div>

        {/* Card 3 */}
        <div
          className="bg-gray-500 p-6 rounded-lg text-center cursor-pointer card"
          onClick={() => handleCardClick("Pedro Bergara")}
        >
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
            <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-xl font-bold mb-2">Pedro Bergara</h2>
          <table className="mx-auto bg-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="px-4 py-2 border">CP:</td>
                <td className="px-4 py-2 border">{calcularMedia("Pedro Bergara", "checkpoint")}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">SP:</td>
                <td className="px-4 py-2 border">{calcularMedia("Pedro Bergara", "Sprint")}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">GS:</td>
                <td className="px-4 py-2 border">{calcularMedia("Pedro Bergara", "global")}</td>
              </tr>
            </tbody>
          </table>
          {selectedCard === "Pedro Bergara" && (
            <div className="mt-4 space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/cp"}>CP</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/sp"}>SP</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/globalsolution"}>GS</button>
            </div>
          )}
        </div>

        {/* Card 4 */}
        <div
          className="bg-gray-500 p-6 rounded-lg text-center cursor-pointer card"
          onClick={() => handleCardClick("Henrique Izzi")}
        >
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
            <img src="/profile-placeholder.svg" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-xl font-bold mb-2">Henrique Izzi</h2>
          <table className="mx-auto bg-gray-300 mb-4">
            <tbody>
              <tr>
                <td className="px-4 py-2 border">CP:</td>
                <td className="px-4 py-2 border">{calcularMedia("Henrique Izzi", "checkpoint")}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">SP:</td>
                <td className="px-4 py-2 border">{calcularMedia("Henrique Izzi", "Sprint")}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">GS:</td>
                <td className="px-4 py-2 border">{calcularMedia("Henrique Izzi", "global")}</td>
              </tr>
            </tbody>
          </table>
          {selectedCard === "Henrique Izzi" && (
            <div className="mt-4 space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/cp"}>CP</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/sp"}>SP</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = "/prova/globalsolution"}>GS</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
