export default function NotFound() {
  return (
    <div className="not-found-page flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 to-red-800 text-white text-center p-8">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-light mb-6">Página não encontrada...</h2>
      <p className="text-lg font-light">
        O recurso que você estava tentando acessar não está mais disponível.
      </p>
    </div>
  );
}
