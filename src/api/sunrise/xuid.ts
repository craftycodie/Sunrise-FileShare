import { z } from "zod";
import { publicProcedure } from "../trpc";
import { sunriseAxios } from "./sunriseRouter";

const XuidSchema = z.string().length(16);

export const getXuid = publicProcedure.input(
    z.object({ gamertag: z.string().min(1) })
).query(async (opts) => {
    const response = await sunriseAxios.get("/sunrise/xuid", {params: {
        gamertag: opts.input.gamertag,
    }});
    const data = XuidSchema.parse(response.data);
    return data;
});