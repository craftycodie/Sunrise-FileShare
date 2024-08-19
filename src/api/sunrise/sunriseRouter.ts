import { Axios } from "axios";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { matchmakingPlaylists } from "./matchmakingPlaylists";
import { serviceRecord } from "./serviceRecord";
import { screenshots } from "./screenshots";
import { env } from "@/src/env";

export const sunriseRouter = createTRPCRouter({
  loggedIn: publicProcedure.query(async (opts) => {
    return opts.ctx.auth?.user.xuid ? "yes" : "no";
  }),
  matchmakingPlaylists,
  serviceRecord,
  screenshots,
});

export const sunriseAxios = new Axios({
    baseURL: env.SUNRISE_API_BASE_URL,
})