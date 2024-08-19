import { Axios } from "axios";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { matchmakingPlaylists } from "./matchmakingPlaylists";
import { serviceRecord, serviceRecords } from "./serviceRecord";
import { playerScreenshots, screenshots } from "./screenshots";
import { env } from "@/src/env";
import { getXuid } from "./xuid";

export const sunriseRouter = createTRPCRouter({
  loggedIn: publicProcedure.query(async (opts) => {
    return opts.ctx.auth?.user.xuid ? "yes" : "no";
  }),
  matchmakingPlaylists,
  serviceRecord,
  serviceRecords,
  playerScreenshots,
  screenshots,
  getXuid,
});

export const sunriseAxios = new Axios({
    baseURL: env.SUNRISE_API_BASE_URL,
})