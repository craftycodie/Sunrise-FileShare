import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../trpc";
import { sunriseAxios } from "./sunriseRouter";
import { jsonStringifySchema } from "@/src/zod";

const ScreenshotsSchema = jsonStringifySchema(z.array(z.object({}).passthrough()));

export type Screenshots = z.infer<typeof ScreenshotsSchema>;

export const screenshots = protectedProcedure.query(async ({ctx}) => {
    const response = await sunriseAxios.get(`/sunrise/player/${ctx.auth.user.xuid}/screenshots`);
    console.log(response.data);
    const data = ScreenshotsSchema.parse(response.data);
    return data;
});