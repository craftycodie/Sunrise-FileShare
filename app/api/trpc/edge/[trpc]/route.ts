import type { NextRequest } from "next/server";
import { getParsedToken } from "@/server/auth/jwt";
import { createTRPCContext } from "@/src/api/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { edgeRouter } from "@/src/api/edge";

export const runtime = "edge";

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
    auth: await getParsedToken({ req }),
    req,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc/edge",
    router: edgeRouter,
    req: req,
    createContext: () => createContext(req),
    onError: ({ error, path }) => {
      console.log("Error in tRPC handler (edge) on path", path);
      console.error(error);
    },
  });

export { handler as GET, handler as POST };