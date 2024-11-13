import { NextResponse } from 'next/server';
import { ApiClient } from '@/components/api-client';
//'@com../../../lib/api-client';

export async function GET() {
  const api = new ApiClient();
  const response = await api.clientesGet();
  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const api = new ApiClient();
  const data = await request.json();
  const response = await api.clientesPost(data);
  return NextResponse.json(response);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const api = new ApiClient();
  await api.clientesIdDelete(id);
  return NextResponse.json({ message: 'Cliente excluído com sucesso' });
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = await request.json();
  const api = new ApiClient();
  const response = await api.clientesIdPatch(id, data);
  return NextResponse.json(response);
}
