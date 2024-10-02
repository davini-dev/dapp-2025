import { NextRequest } from "next/server";
import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { useReadContract, MediaRenderer } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { getBalance } from "thirdweb/extensions/erc20";


const clientId = "86b5178a92b9655851d0a0b8746151a1"; 

export async function GET(request: NextRequest) {

    const chain = defineChain(4690);

    // initialize the client
    const client = createThirdwebClient({ clientId });

    // connect to your smart contract
    const contract = getContract({ client, chain: chain, address: "0xeDBD543f37e603Fe656B0ECab8a9A6a24C9b78D8" });

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') // query is "hello" for /api/search?query=hello
  
    return Response.json({ message: 'Hello from Next.js! - '+ query })
  
  }
