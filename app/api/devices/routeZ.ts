import { ethers } from "ethers";
import { type NextRequest } from "next/server";

const PRIVATE_KEY =
  "3e20da3ca9d1faa0aa53dda2c471603dfbe3ef504afca81014314cdf32553762";

// Configurar a rede IoTeX Testnet
const provider = new ethers.providers.JsonRpcProvider(
  "https://babel-api.testnet.iotex.io/",
);
//const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
new ethers.Wallet(PRIVATE_KEY, provider);

// Inicializar o SDK com o signers

// Endereço do contrato já implantado

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query"); // query is "hello" for /api/search?query=hello

  return Response.json({ message: "Hello from Next.js! - " + query });
}
