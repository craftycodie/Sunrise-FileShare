import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../trpc";
import { sunriseAxios } from "./sunriseRouter";
import { jsonStringifySchema } from "@/src/zod";

const ScreenshotsSchema = jsonStringifySchema(z.array(z.object({}).passthrough()));

export type Screenshots = z.infer<typeof ScreenshotsSchema>;

export const playerScreenshots = publicProcedure.input(
    z.object({ xuid: z.string().length(16) })
).query(async ({input}) => {
    const response = await sunriseAxios.get(`/sunrise/player/${input.xuid}/screenshots`);
    const data = ScreenshotsSchema.parse(response.data);
    return data;
});

export const screenshots = publicProcedure.query(async ({ctx}) => {
    const response = await sunriseAxios.get(`/sunrise/screenshots`, {params: {
        pageSize: 15,
        pageNumber: 1,
    }});
    const data = ScreenshotsSchema.parse(response.data);
    return data;
});