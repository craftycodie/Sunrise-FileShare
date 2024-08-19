import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../trpc";
import { sunriseAxios } from "./sunriseRouter";
import { jsonStringifySchema } from "@/src/zod";

const ServiceRecordSchema = jsonStringifySchema(z.object({
    id: z.string(),
    playerName: z.string(),
    appearanceFlags: z.number(),
    primaryColor: z.number(),
    secondaryColor: z.number(),
    tertiaryColor: z.number(),
    model: z.number(),
    foregroundEmblem: z.number(),
    backgroundEmblem: z.number(),
    emblemFlags: z.number(),
    emblemPrimaryColor: z.number(),
    emblemSecondaryColor: z.number(),
    emblemBackgroundColor: z.number(),
    spartanHelmet: z.number(),
    spartanLeftShounder: z.number(),
    spartanRightShoulder: z.number(),
    spartanBody: z.number(),
    eliteHelmet: z.number(),
    eliteLeftShoulder: z.number(),
    eliteRightShoulder: z.number(),
    eliteBody: z.number(),
    serviceTag: z.string(),
    campaignProgress: z.number(),
    highestSkill: z.number(),
    totalEXP: z.number(),
    unknownInsignia: z.number(),
    rank: z.number(),
    grade: z.number().transform((val) => val + 1),
    unknownInsignia2: z.number(),
}));

export type ServiceRecord = z.infer<typeof ServiceRecordSchema>;

export const serviceRecord = protectedProcedure.query(async ({ctx}) => {
    const response = await sunriseAxios.get(`/sunrise/player/${ctx.auth.user.xuid}/servicerecord`);
    console.log(response.data);
    const data = ServiceRecordSchema.parse(response.data);
    return data;
});