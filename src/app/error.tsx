'use client';

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Este é um React Error Boundary para o componente Home</h2>
      <p>Mensagem de Erro: {error.message}</p>
      <button onClick={() => reset()}>Tente Novamente</button>
    </div>
  );
}
