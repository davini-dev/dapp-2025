// app/api/items/route.js
// Davini

const QUESTDB_URL = "https://questdb-874733105499.us-central1.run.app/exec"; // URL da API SQL do QuestDB

// Função auxiliar para enviar consultas SQL para o QuestDB
async function executeQuery(query) {
  const response = await fetch(
    `${QUESTDB_URL}?query=${encodeURIComponent(query)}`,
  );
  if (!response.ok) {
    throw new Error("Falha ao executar a consulta no QuestDB");
  }
  return await response.json();
}

export async function GET() {
  try {
    const data = await executeQuery("SELECT * FROM items");
    return new Response(JSON.stringify(data.dataset), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { name, description } = await req.json();
    const query = `INSERT INTO items (name, description) VALUES ('${name}', '${description}')`;
    await executeQuery(query);
    return new Response(
      JSON.stringify({ message: "Item inserido com sucesso" }),
      { status: 201 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  // Em QuestDB, você pode recriar o item com novos dados, pois não há suporte direto para UPDATE.
  try {
    const { id, name, description } = await req.json();
    const query = `INSERT INTO items (id, name, description) VALUES (${id}, '${name}', '${description}')`;
    await executeQuery(query);
    return new Response(
      JSON.stringify({ message: "Item atualizado com sucesso" }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  // Não há DELETE direto em QuestDB, você precisaria recriar a tabela ou ignorar o item no frontend
  try {
    const { id } = await req.json();
    const query = `ALTER TABLE items DROP PARTITION WHERE id = ${id}`; // Simulação de exclusão
    await executeQuery(query);
    return new Response(
      JSON.stringify({ message: "Item excluído com sucesso" }),
      { status: 204 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
