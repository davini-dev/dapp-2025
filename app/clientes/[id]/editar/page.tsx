'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

type Cliente = {
  id: string;
  identificador: string;
  // Adicione outras propriedades conforme necessário
};

export default function EditarCliente() {
  const [identificador, setIdentificador] = useState('');
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        const response = await fetch(`/api/clientes?id=${id}`);
        const data: Cliente = await response.json();
        setIdentificador(data.identificador);
      };

      fetchCliente();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/clientes?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identificador }),
    });
    router.push('/clientes');
  };

  return (
    <div>
      <h1>Editar Cliente</h1>
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
