// pages/api/devices/route.ts

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from 'next';

const PRIVATE_KEY = '3e20da3ca9d1faa0aa53dda2c471603dfbe3ef504afca81014314cdf32553762'; 

// Configurar a rede IoTeX Testnet
const provider = new ethers.providers.JsonRpcProvider("https://4690.rpc.thirdweb.com");
//const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);

// Inicializar o SDK com o signers
const sdk = new ThirdwebSDK(signer,{clientId : '86b5178a92b9655851d0a0b8746151a1'});

// Endereço do contrato já implantado
const contractAddress = "0xeDBD543f37e603Fe656B0ECab8a9A6a24C9b78D8"; // Substitua com o endereço do contrato

async function getContract() {
  return await sdk.getContract(contractAddress);
}

// Função para lidar com diferentes rotas da API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const contract = await getContract();

  try {
    switch (req.method) {
      // Registrar Dispositivo (POST)
      case "POST":
        if (req.body.action === "register") {
          const { name, location, status } = req.body;
          const tx = await contract.call("registerDevice", [name, location, status]);
          return res.status(200).json({ message: "Device registered successfully", tx });
        }
        
        // Atualizar Dispositivo (PUT)
        if (req.body.action === "update") {
          const { id, name, location, status } = req.body;
          const tx = await contract.call("updateDevice", [id, name, location, status]);
          return res.status(200).json({ message: `Device ${id} updated successfully`, tx });
        }

        // Deletar Dispositivo (DELETE)
        if (req.body.action === "delete") {
          const { id } = req.body;
          const tx = await contract.call("deleteDevice", [id]);
          return res.status(200).json({ message: `Device ${id} deleted successfully`, tx });
        }

        return res.status(400).json({ error: "Invalid action for POST/PUT/DELETE" });

      // Obter Dispositivo (GET) por ID
      case "GET":
        if (req.query.action === "teste") {
            return res.status(200).json({ vai : "gay"});          
        }
        
        if (req.query.action === "getDevice") {
          const { id } = req.query;
          const device = await contract.call("getDevice", [id]);
          return res.status(200).json({ device });
        }

        // Listar todos os dispositivos (GET)
        if (req.query.action === "getAllDevices") {
          const devices = await contract.call("getAllDevices");
          return res.status(200).json({ devices });
        }

        return res.status(400).json({ error: "Invalid action for GET" });

      // Método não permitido
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}