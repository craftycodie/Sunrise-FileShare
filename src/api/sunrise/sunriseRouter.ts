import { createTRPCRouter, protectedProcedure } from "../trpc";

export const sunriseRouter = createTRPCRouter({
  loggedIn: protectedProcedure.query(async (opts) => {
    return opts.ctx.auth.user.xuid ? "yes" : "no";
  }),
});