import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../trpc";
import { sunriseAxios } from "./sunriseRouter";
import { jsonStringifySchema } from "@/src/zod";

const FileHeaderSchema = z.object({
    buildNumber: z.number(),
    mapVersion: z.number(),
    uniqueId: z.string(),
    filename: z.string(),
    description: z.string(),
    author: z.string(),
    filetype: z.number(),
    authorXuidIsOnline: z.boolean(),
    authorXuid: z.string(),
    size: z.number(),
    date: z.string(),
    lengthSeconds: z.number(),
    campaignId: z.number(),
    mapId: z.number(),
    gameEngineType: z.number(),
    campaignDifficulty: z.number(),
    hopperId: z.number(),
    gameId: z.number(),
    campaignInsertionPoint: z.number(),
    campaignSurvivalEnabled: z.boolean(),
  });
  
  const FileShareSlotSchema = z.object({
    id: z.string(),
    uniqueId: z.string(),
    slotNumber: z.number(),
    header: FileHeaderSchema,
  });
  
  const FileShareSchema = jsonStringifySchema(z.object({
    id: z.string(),
    ownerId: z.string(),
    visibleSlots: z.number(),
    quotaBytes: z.number(),
    quotaSlots: z.number(),
    subscriptionHash: z.number(),
    slots: z.array(FileShareSlotSchema),
  }));

export type FileShare = z.infer<typeof FileShareSchema>;

export const fileShare = publicProcedure.input(
    z.object({ xuid: z.string().length(16) })
).query(async ({input}) => {
    const response = await sunriseAxios.get(`/sunrise/player/${input.xuid}/fileshare`);
    const data = FileShareSchema.parse(response.data);
    return data;
});
