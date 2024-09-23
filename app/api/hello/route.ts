import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string
}
 
export function GET(
    req: NextApiRequest,
  ) {
    return Response.json({ message: 'Hello from Next.js!' })
  }

  