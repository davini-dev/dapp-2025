'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Cliente = {
  id: string;
  identificador: string;
  // Adicione outras propriedades conforme necessário
};

export default function ClientesList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch('/api/clientes');
      const data: Cliente[] = await response.json(); // Supondo que a resposta seja um array de clientes
      setClientes(data);
    };

    fetchClientes();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/clientes?id=${id}`, { method: 'DELETE' });
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <Link href="/clientes/novo">
        <a className="btn btn-primary">Adicionar Cliente</a>
      </Link>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            {cliente.identificador}
            <Link href={`/clientes/${cliente.id}/editar`}>
              <a className="btn btn-secondary">Editar</a>
            </Link>
            <button onClick={() => handleDelete(cliente.id)} className="btn btn-danger">Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
