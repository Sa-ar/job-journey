import z from "zod";

export const jsonSchema = z.string().refine((value) => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
});

export const stepSchema = z.object({
  id: z.union([z.string().min(1), z.number().min(1)]),
  name: z.string().min(2),
  isDone: z.boolean(),
});

export const processValuesSchema = z.object({
  position: z.string().min(2),
  company: z.string().min(2),
  steps: z.array(stepSchema).min(1),
});

export const errorSchema = z.object({
  message: z.string(),
});

export const rawProcessSchema = z.object({
  id: z.number().min(1),
  userId: z.string(),
  company: z.string().min(2),
  position: z.string().min(2),
  steps: jsonSchema,
  isFailed: z.number().gte(0).lte(1),
});

export const processSchema = z.object({
  id: z.number().min(1),
  userId: z.string(),
  company: z.string().min(2),
  position: z.string().min(2),
  steps: z.array(stepSchema),
  isFailed: z.boolean(),
});


export type Step = z.infer<typeof stepSchema>;

export type ProcessValues = z.infer<typeof processValuesSchema>;

export type Error = z.infer<typeof errorSchema>;

export type RawProcess = z.infer<typeof rawProcessSchema>;

export type Process = z.infer<typeof processSchema>;


export function isError(value: unknown): value is Error {
  return errorSchema.safeParse(value).success;
}
