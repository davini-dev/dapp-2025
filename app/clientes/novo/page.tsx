'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NovoCliente() {
  const [identificador, setIdentificador] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identificador }),
    });
    router.push('/clientes');
  };

  return (
    <div>
      <h1>Adicionar Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
          placeholder="Identificador"
          required
        />
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}
