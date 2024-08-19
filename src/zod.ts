import { z, ZodSchema } from "zod";

export const jsonStringifySchema = (schema: ZodSchema<any>) => {
    return z.preprocess((val) => typeof val === 'string' ? JSON.parse(val) : val, schema);
}