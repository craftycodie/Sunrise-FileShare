import { getSession } from "next-auth/react";

export const createContext = async () => {
  const session = await getSession();
  const ctx = {
    session,
  }

  return ctx;
};

export type Context = typeof createContext;