import z from "zod";

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const processSchema = z.object({
  id: z.number().min(1),
  userId: z.string(),
  company: z.string().min(2),
  position: z.string().min(2),
  steps: jsonSchema,
  isFailed: z.number(),
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


export type Process = z.infer<typeof processSchema>;

export type Step = z.infer<typeof stepSchema>;

export type ProcessValues = z.infer<typeof processValuesSchema>;
