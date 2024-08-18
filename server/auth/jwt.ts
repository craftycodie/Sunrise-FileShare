import { getToken, JWT } from "next-auth/jwt";
import { z } from "zod";

const JWTSchema = z.object({
    user: z.object({
        xuid: z.string(),
        gamertag: z.string(),
        email: z.string(),
        role: z.union([z.literal("user"), z.literal('admin')]).default("user"),
    }),
    accessToken: z.string(),
    refreshToken: z.string(),
});

export const getParsedToken = async (
    ...params: Parameters<typeof getToken>
  ): Promise<JWT | null> => {
    const token = await getToken(...params);
    const parsed = JWTSchema.safeParse(token);
    if (!parsed.success) return null;
    return parsed.data;
  };
  