import { initTRPC } from "@trpc/server";

import { Context } from "./trpc/context";

const t = initTRPC.context<Context>().create({

});

export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;
export const mergeRouters = t.mergeRouters;

export const router = t.router;
export const procedure = t.procedure;