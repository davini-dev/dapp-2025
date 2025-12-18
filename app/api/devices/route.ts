import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // connect to your smart contract
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query"); // query is "hello" for /api/search?query=hello

  return Response.json({ message: "Hello from Next.js! - " + query });
}
