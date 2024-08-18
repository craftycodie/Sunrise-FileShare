import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getParsedToken } from "../auth/jwt";

export const createContext = async (request: NextApiRequest) => {
  const session = await getParsedToken({req: request});
  const ctx = {
    session,
  }

  return ctx;
};

export type Context = typeof createContext;