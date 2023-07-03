import z from "zod";

export const processSchema = z.object({
  id: z.number(),
  userId: z.string(),
  company: z.string(),
  position: z.string(),
  steps: z.string(),
  isFailed: z.number(),
});

export const stepSchema = z.object({
  name: z.string(),
  description: z.string(),
  isDone: z.boolean(),
});

export const processValuesSchema = z.object({
  position: z.string(),
  company: z.string(),
  steps: z.array(stepSchema),
});

export const InputProcessSchema = z.object({
  position: z.string(),
  company: z.string(),
  steps: z.array(stepSchema),
});

export const RequestProcessSchema = z.object({
  position: z.string(),
  company: z.string(),
  steps: z.array(stepSchema),
});

export type Process = z.infer<typeof processSchema>;

export type InputProcess = z.infer<typeof InputProcessSchema>;

export type Step = z.infer<typeof stepSchema>;

export type ProcessValues = z.infer<typeof processValuesSchema>;
