import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { type NextRequest } from "next/server";

const PRIVATE_KEY =
  "3e20da3ca9d1faa0aa53dda2c471603dfbe3ef504afca81014314cdf32553762";

// Configurar a rede IoTeX Testnet
const provider = new ethers.providers.JsonRpcProvider(
  "https://babel-api.testnet.iotex.io/",
);
//const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Inicializar o SDK com o signers
const sdk = new ThirdwebSDK(signer, {
  clientId: "86b5178a92b9655851d0a0b8746151a1",
});

// Endereço do contrato já implantado
const contractAddress = "0xeDBD543f37e603Fe656B0ECab8a9A6a24C9b78D8"; // Substitua com o endereço do contrato

async function getContract() {
  return await sdk.getContract(contractAddress);
}

export async function GET(request: NextRequest) {
  const contract = await getContract();

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query"); // query is "hello" for /api/search?query=hello

  return Response.json({ message: "Hello from Next.js! - " + query });
}
