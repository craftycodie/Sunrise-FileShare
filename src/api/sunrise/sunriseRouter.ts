import { Axios } from "axios";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { matchmakingPlaylists } from "./matchmakingPlaylists";

export const sunriseRouter = createTRPCRouter({
  loggedIn: protectedProcedure.query(async (opts) => {
    return opts.ctx.auth.user.xuid ? "yes" : "no";
  }),
  matchmakingPlaylists,
});

export const sunriseAxios = new Axios({
    baseURL: "http://174.136.231.17:8000/"
})