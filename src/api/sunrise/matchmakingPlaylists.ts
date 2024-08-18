import { z } from "zod";
import { publicProcedure } from "../trpc";
import { sunriseAxios } from "./sunriseRouter";

const PlaylistsSchema = z.object({});

export const matchmakingPlaylists = publicProcedure.query(async () => {
    const response = await sunriseAxios.get("/sunrise/online/playlists");
    console.log({response});
    const data = PlaylistsSchema.parse(response.data);
    return data;
});